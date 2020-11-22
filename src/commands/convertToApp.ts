
import { GluegunCommand } from 'gluegun'
import { IgniteRNInstallResult } from '../types'


const command: GluegunCommand = {
  name: 'convertToApp',
  run: async toolbox => {
    const { parameters, print, reactNative, template, system } = toolbox
    const name = parameters.first

    print.info('Installing the starter app templates')
    await template.generate({
        template: '/starter/app.tsx.ejs',
        target: `${name}/app.tsx`,
        props: { name }
      })

      

    print.success('Successfully installed the starter app template');
  },
}

module.exports = command
