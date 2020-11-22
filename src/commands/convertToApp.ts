import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'convertToApp',
  run: async toolbox => {
    const { parameters, print, template } = toolbox
    const name = parameters.first

    print.info('Installing the starter app templates')

      await template.generate({
        template: '/starter/nav-reducer.ts.ejs',
        // target: `${name}/nav-reducer.ts`,
        target: `nav-reducer.ts`,
        props: { name }
      })

      // generate the app.tsx last to wire together all of the codebehind files 
      await template.generate({
        template: '/starter/app.tsx.ejs',
        target: `app.tsx`,
        props: { name }
      })



    print.success('Successfully installed the starter app template');
  },
}

module.exports = command
