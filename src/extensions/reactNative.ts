import { trim } from 'ramda'
import exitCodes from '../lib/exit-codes'
import { IgniteToolbox, IgniteRNInstallResult } from '../types'



const REACT_NATIVE_VERSION = '0.63.0'
// Example: const rnInstall = await reactNative.install({ name, version: '0.42.0' })

/*
 * Attach this extension to the toolbox.
 */
function attach(toolbox: IgniteToolbox) {
  // fist-full o features
  const { parameters, print, system } = toolbox

  /**
   * Installs React Native.
   */
  async function install(
    opts: { name?: string; version?: string; template?: string; skipJest?: boolean; useNpm?: boolean } = {},
  ): Promise<IgniteRNInstallResult> {
    //  grab the name & version
    const name = opts.name || parameters.first
    let reactNativeVersion = opts.version || parameters.options['react-native-version']
    if (!reactNativeVersion) {
      print.warning(`   please use version property in project's boilerplate file to set a react native version`)
      print.warning(`   falling back to react native version: ${REACT_NATIVE_VERSION}`)
      reactNativeVersion = REACT_NATIVE_VERSION
    }
    const reactNativeTemplate = opts.template || parameters.options['react-native-template']

    const perfStart = new Date().getTime()

    // react-native init
    const cmd = trim(`npx react-native init ${name} --template react-native-template-typescript`)
    const withTemplate = reactNativeTemplate ? ` with ${print.colors.cyan(reactNativeTemplate)} template` : ''
    const spinner = print.spin(
      `adding ${print.colors.cyan('React Native ' + reactNativeVersion)}${withTemplate} ${print.colors.muted(
        '(30 seconds-ish)',
      )}`,
    )
    if (parameters.options.debug) spinner.stop()

    // ok, let's do this
    // react-native init takes about 20s to execute
    const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    try {
      print.info('initializing react native project')
      print.info(`command: ${cmd}`)
      await system.exec(cmd, { stdio: stdioMode })
      print.info('done initializing react native project')
    } catch (e) {
      spinner.fail(`failed to add ${print.colors.cyan('React Native ' + reactNativeVersion)}${withTemplate}`)
      if (reactNativeTemplate) {
        // TODO: we can totally check, just stopping here until while https://github.com/facebook/react-native/pull/12548 settles in.
        const fullTemplateName = `react-native-template-${reactNativeTemplate}`
        spinner.fail(`Does ${print.colors.cyan(fullTemplateName)} exist on npm?`)
      }
      return {
        exitCode: exitCodes.REACT_NATIVE_INSTALL,
        version: reactNativeVersion,
        template: reactNativeTemplate,
      }
    }

    const perfDuration = parseInt(((new Date().getTime() - perfStart) / 10).toString(), 10) / 100

    // good news everyone!
    const successMessage = `added ${print.colors.cyan(
      'React Native ' + reactNativeVersion,
    )}${withTemplate} in ${perfDuration}s`
    spinner.succeed(successMessage)
    return {
      exitCode: exitCodes.OK,
      version: reactNativeVersion,
      template: reactNativeTemplate,
    }
  }

  toolbox.reactNative = { install }
}

module.exports = attach