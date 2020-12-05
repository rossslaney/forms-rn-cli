
import { GluegunCommand } from 'gluegun'
import { IgniteRNInstallResult } from '../types'


const command: GluegunCommand = {
  name: 'init',
  run: async toolbox => {
    const { parameters, print, system, reactNative, filesystem, template } = toolbox
    const name = parameters.first

    // attempt to install React Native or die trying
    const rnInstall: IgniteRNInstallResult = await reactNative.install({  name   })
    if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)
        
    filesystem.copy(filesystem.cwd() + `/forms-rn-cli/TestWithAuth`, `${name}`, {
      overwrite: (srcInspectData, destInspectData) => {
        return  true;
      }
    });

    await template.generate({
      template: 'app.json.ejs',
      target: `app.json`,
      props: { name }
    })

    // 2 run npm install and pod install  
    const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    var cmd = `cd ${name} && npm install`; 
    print.info(`command: ${cmd}`)
   system.exec(cmd, { stdio: stdioMode })

    cmd = `cd ${name} && cd ios && pod install`
    print.info(`command: ${cmd}`)
   system.exec(cmd, { stdio: stdioMode })

    print.success('Successfully installed the starter app template');
  },
}

module.exports = command
