
import { GluegunToolbox } from 'gluegun'
  

module.exports = {
  name: 'add-screen',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template} = toolbox
    const name = parameters.first

    await template.generate({
      template: `screen.tsx.ejs`,
      target: `Screens/${name}/${name}.tsx`,
      props: { name }
    })

    await template.generate({
      template: `codebehind.ts.ejs`,
      target: `Screens/${name}/${name}.codebehind.ts`,
      props: { name }
    })

    print.info('Generated screen and codebehind file. @TODO update app.tsx to connect screen to SessionStore and NavTree')
  },
}
