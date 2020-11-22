
import { GluegunCommand } from 'gluegun'
import { IgniteRNInstallResult } from '../types'


const command: GluegunCommand = {
  name: 'init',
  run: async toolbox => {
    const { parameters, print, reactNative, template, system } = toolbox
    const name = parameters.first

    // attempt to install React Native or die trying
    const rnInstall: IgniteRNInstallResult = await reactNative.install({  name   })
    if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)  
    // Wrap it up with our success message.

    print.success('Successfully initialized React Native project with typescript template');
    print.info('')

    print.info('Now we need to update the package.json')
    await template.generate({
        template: 'package.json.ejs',
        target: `${name}/package.json`
    })
    print.success('Successfully replaced the package.json file');


    print.info('Now we need to install the starter app templates')
    await template.generate({
        template: '/starter/app.tsx.ejs',
        target: `${name}/app.tsx`,
        props: { name }
      })
    print.success('Successfully installed the starter app templated');


    print.info('Install dependencies, cocoapods, and link....')
    await system.run(` cd ${name} npm install && cd ios && pod install && cd .. && npx react-native link`)
    print.success('Successfully installed the new package.json, cocoapods, and rn link');

    print.info('')
    print.info('🍽 Time to get building!')
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
