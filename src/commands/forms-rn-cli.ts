
import { GluegunCommand } from 'gluegun'
import { IgniteRNInstallResult } from '../types'


const command: GluegunCommand = {
  name: 'init',
  run: async toolbox => {
    const { parameters, print, reactNative, system } = toolbox
    const name = parameters.first

    // attempt to install React Native or die trying
    const rnInstall: IgniteRNInstallResult = await reactNative.install({  name   })
    if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)  
    
    const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    var cmd = 'cd ' + name + ' && forms-rn-cli convertToApp ' + name; 
    print.info(`command: ${cmd}`)
    await system.exec(cmd, { stdio: stdioMode })

    print.success('Successfully initialized React Native project with typescript template');
    print.info('')
    print.warning('--> Follow direction in readme to build the application for the first time. The first React Native build can take upto 10 minutes.')
    print.info('')
    print.info('To run in iOS:')
    print.info(`  cd ${name}`)
    print.info('  npx react-native run-ios')
    print.info('')
    print.info('To run in Android:')
    print.info(`  cd ${name}`)
    print.info('  npx react-native run-android')
    print.info('')
    print.info('To see what forms-rn-cli can do for you:')
    print.info(`  cd ${name}`)
    print.info('  forms-rn-cli HELP')
    print.info('') 
  },
}

module.exports = command
