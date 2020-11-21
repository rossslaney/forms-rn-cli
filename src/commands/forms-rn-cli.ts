
import { GluegunCommand } from 'gluegun'
import { IgniteRNInstallResult } from '../types'


const command: GluegunCommand = {
  name: 'forms-rn-cli',
  run: async toolbox => {
    const { parameters, print, reactNative } = toolbox
    const name = parameters.first

    // attempt to install React Native or die trying
    const rnInstall: IgniteRNInstallResult = await reactNative.install({  name   })
    if (rnInstall.exitCode > 0) process.exit(rnInstall.exitCode)  
    // Wrap it up with our success message.
    print.info('')
    print.info('🍽 Time to get building!')
    print.info('')
    print.info('To run in iOS:')
    print.info('    Xcode -> File.xcworkspace -> Workspace Settings -> Build System -> Legacy Build System.    ')
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
