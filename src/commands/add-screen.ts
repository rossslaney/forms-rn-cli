
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');

const AddScreenImportToApp = async (name: string) => {
  const results = replace.sync({
    files: 'src/app.tsx',
    from: '//!!nextimport',
    to: "import " + name + " from './Screens/" + name + "/" + name + "';\n" + 
    "import " + name + "_codebehind from './Screens/" + name + "/" + name + ".codebehind';\n" +
    "//!!nextimport", 
    countMatches: true,
  });
  console.log('replace import screen: ', results);
}

const AddSceneToApp = async (name: string) => {
  const navReslt = replace.sync({
    files: 'src/app.tsx',
    from: '{/*!!nextsceneimport*/}',
    to: "<Scene key='" + name + "' component={" + name +"} hideNavBar /> \n\t\t" + 
    "{/*!!nextsceneimport*/}", 
    countMatches: true,
  });
  console.log('add scene to navtree: ', navReslt);
}

const AddControllerToApp = async (name: string) => {
  const results = replace.sync({
    files: 'src/app.tsx',
    from: '//!!nextcontroller',
    to: "let " + name + "_controller = new " + name + "_codebehind();\n" + 
    "//!!nextcontroller", 
    countMatches: true,
  });
  console.log('add controller: ', results);
}

const AddReducerToApp = async (name: string) => {
  const results = replace.sync({
    files: 'src/app.tsx',
    from: '//!!nextreducer',
    to: name + ": " + name + "_controller.reducer,\n\t\t" + 
    "//!!nextreducer", 
    countMatches: true,
  });
  console.log('add reducer: ', results);
}

const AddPropToApp = async (name: string) => {
  const results = replace.sync({
    files: 'src/app.tsx',
    from: '//!!nextprop',
    to: name + ": " + name + "_controller.reducer,\n\t\t" + 
    "//!!nextprop", 
    countMatches: true,
  });
  console.log('add prop: ', results);
}


const AddStorybookImportToEntry = async (name: string) => {
  const results = replace.sync({
    files: 'storybook/stories/index.js',
    from: '//!!nextstoryimport',
    to: "import './" + name + "/" + name + ".stories';\n" + 
    "//!!nextstoryimport", 
    countMatches: true,
  });
  console.log('add storybook: ', results);
}

const AddScreenStateImportToActionTypes = async (name: string) => {
  const results = replace.sync({
    files: 'src/util/actionTypes.ts',
    from: '//!!nextstateimport',
    to: "import { " + name + "State } from '../Screens/"+ name + "/" + name + ".codebehind';\n" + 
    "//!!nextstateimport", 
    countMatches: true,
  });
  console.log('AddStateImportToActionTypes: ', results);
}

const AddDefToActionTypes = async (name: string) => {
  const results = replace.sync({
    files: 'src/util/actionTypes.ts',
    from: '//!!nextdefinition',
    to: "export const " + name + "_Update = '" + name + "_Update';\n" + 
    "//!!nextdefinition", 
    countMatches: true,
  });
  console.log('AddDefToActionTypes: ', results);
}


const AddActionTypes = async (name: string) => {
  const results = replace.sync({
    files: 'src/util/actionTypes.ts',
    from: '//!!nextactiontype',
    to: "export interface " + name + "_Update_Action { type: typeof " + name +"_Update, payload: " + name + "State}\n" + 
    "//!!nextactiontype", 
    countMatches: true,
  });
  console.log('AddActionTypes: ', results);
}

export const AddScreenActionTypeToApp = async (name: string) => {
  AddScreenStateImportToActionTypes(name);
  AddDefToActionTypes(name);
  AddActionTypes(name);
} 

module.exports = {
  name: 'add-screen',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template} = toolbox
    const name = parameters.first

    await template.generate({
      template: `screen.tsx.ejs`,
      target: `src/Screens/${name}/${name}.tsx`,
      props: { name }
    })

    await template.generate({
      template: `codebehind.ts.ejs`,
      target: `src/Screens/${name}/${name}.codebehind.ts`,
      props: { name }
    })
    
    // add the Action definitions 
    AddScreenActionTypeToApp(name);
    AddScreenImportToApp(name);
    AddSceneToApp(name);
    AddControllerToApp(name);
    AddReducerToApp(name);
    AddPropToApp(name);

    // generate the tests file __tests__/Screens/name.tests.tsx from template
    await template.generate({
      template: 'screentests.tsx.ejs',
      target: `__tests__/Screens/${name}.tests.tsx`,
      props: { name }
    })

    // generate the storybook folder for this component from template
    await template.generate({
      template: '/story/screen.stories.js.ejs',
      target: `storybook/stories/${name}/${name}.stories.js`,
      props: { name }
    })

    // add the story import to the storybook entry
    AddStorybookImportToEntry(name);


    print.info('Generated screen and codebehind, tests, and storybook boilerplate. ')
  },
}
