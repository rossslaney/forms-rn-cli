
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');

const AddContainerImportToApp = async (name: string) => {
  const results = replace.sync({
    files: 'src/app.tsx',
    from: '//!!nextimport',
    to: "import " + name + "_codebehind from './Services/" + name + "/" + name + ".codebehind';\n" +
    "//!!nextimport", 
    countMatches: true,
  });
  console.log('replace import Services: ', results);
}

const AddControllerToApp = async (name: string) => {
  const results = replace.sync({
    files: 'src/app.tsx',
    from: '//!!nextcontroller',
    to: "let " + name + "_controller = new " + name + "_codebehind();\n" + 
    "//!!nextcontroller", 
    countMatches: true,
  });
  console.log('add AddControllerToApp: ', results);
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

const AddServiceStateImportToActionTypes = async (name: string) => {
  const results = replace.sync({
    files: 'src/util/actionTypes.ts',
    from: '//!!nextstateimport',
    to: "import { " + name + "State } from '../Services/"+ name + "/" + name + ".codebehind';\n" + 
    "//!!nextstateimport", 
    countMatches: true,
  });
  console.log('AddServiceStateImportToActionTypes: ', results);
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

export const AddContainerActionTypeToApp = async (name: string) => {
  AddServiceStateImportToActionTypes(name);
  AddDefToActionTypes(name);
  AddActionTypes(name);
} 

module.exports = {
  name: 'add-service',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template} = toolbox
    const name = parameters.first

    await template.generate({
      template: `service.ts.ejs`,
      target: `src/Services/${name}/${name}.codebehind.ts`,
      props: { name }
    })
    
    // add the Action definitions 
    AddContainerActionTypeToApp(name);
    AddContainerImportToApp(name);
    AddControllerToApp(name);
    AddReducerToApp(name);
    AddPropToApp(name);

    // generate the tests file __tests__/Screens/name.tests.tsx from template
    await template.generate({
      template: 'servicetests.tsx.ejs',
      target: `__tests__/Services/${name}.tests.tsx`,
      props: { name }
    })


    print.info('Generated service codebehind and tests')
  },
}
