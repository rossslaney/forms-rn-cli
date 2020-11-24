
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');

const AddContainerImportToApp = async (name: string) => {
  const results = replace.sync({
    files: 'app.tsx',
    from: '//!!nextimport',
    to: "import " + name + " from './Containers/" + name + "/" + name + "';\n" + 
    "import " + name + "_codebehind from './Containers/" + name + "/" + name + ".codebehind';\n" +
    "//!!nextimport", 
    countMatches: true,
  });
  console.log('replace import Container: ', results);
}

const AddSceneToApp = async (name: string) => {
  const navReslt = replace.sync({
    files: 'app.tsx',
    from: '{/*!!nextsceneimport*/}',
    to: "<Scene key='" + name + "' component={" + name +"} hideNavBar /> \n\t\t" + 
    "{/*!!nextsceneimport*/}", 
    countMatches: true,
  });
  console.log('add scene to navtree: ', navReslt);
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
  name: 'add-container',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template} = toolbox
    const name = parameters.first

    await template.generate({
      template: `container.tsx.ejs`,
      target: `Containers/${name}/${name}.tsx`,
      props: { name }
    })

    await template.generate({
      template: `codebehind.ts.ejs`,
      target: `Containers/${name}/${name}.codebehind.ts`,
      props: { name }
    })

    // 1) add the import of the newly generated files
    AddContainerImportToApp(name);
    // 2) if 'Screen' then add to the NavTree
    AddSceneToApp(name);
    // 3) add the codebehind controller line and add to the appReducer and mapStateToProps
    AddControllerToApp(name);
    AddReducerToApp(name);
    AddPropToApp(name);
    print.info('Generated Container and codebehind file. ')
  },
}
