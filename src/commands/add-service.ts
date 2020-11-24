
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');

const AddServiceImportToApp = async (name: string) => {
  const results = replace.sync({
    files: 'app.tsx',
    from: '//!!nextimport',
    to: "import " + name + "_codebehind from './Screens/" + name + "/" + name + ".codebehind';\n" +
    "//!!nextimport", 
    countMatches: true,
  });
  console.log('replace import screen: ', results);
}


const AddControllerToApp = async (name: string) => {
  const results = replace.sync({
    files: 'app.tsx',
    from: '//!!nextcontroller',
    to: "let " + name + "_controller = new " + name + "_codebehind();\n" + 
    "//!!nextcontroller", 
    countMatches: true,
  });
  console.log('add controller: ', results);
}

const AddReducerToApp = async (name: string) => {
  const results = replace.sync({
    files: 'app.tsx',
    from: '//!!nextreducer',
    to: name + ": " + name + "_controller.reducer,\n\t\t" + 
    "//!!nextreducer", 
    countMatches: true,
  });
  console.log('add reducer: ', results);
}

const AddPropToApp = async (name: string) => {
  const results = replace.sync({
    files: 'app.tsx',
    from: '//!!nextprop',
    to: name + ": " + name + "_controller.reducer,\n\t\t" + 
    "//!!nextprop", 
    countMatches: true,
  });
  console.log('add reducer: ', results);
}

module.exports = {
  name: 'add-service',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template} = toolbox
    const name = parameters.first

    await template.generate({
      template: `codebehind.ts.ejs`,
      target: `Screens/${name}/${name}.codebehind.ts`,
      props: { name }
    })

    // 1) add the import of the newly generated files
    AddServiceImportToApp(name);
    // 3) add the codebehind controller line and add to the appReducer and mapStateToProps
    AddControllerToApp(name);
    AddReducerToApp(name);
    AddPropToApp(name);
    print.info('Generated service and codebehind file.')
  },
}
