
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');


const add_nextinterfacefunction = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextinterfacefunction',
    to: FunctionName + "(props: " + codebehindName + "State):void" + ";\n\t" +
    "//!!nextinterfacefunction", 
    countMatches: true,
  });
  console.log('add_nextinterfacefunction: ', results);
}


const add_nextfunction = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextfunction',
    to: `public static async ${FunctionName}(state: ${codebehindName}State, dispatch?: any): Promise<${codebehindName}State> {\r\n    let NewState:${codebehindName}State = state.${codebehindName} as ${codebehindName}State;\r\n    \/\/ ** perform operations on the NewState here **\r\n    \/\/ ** you can dispatch to any of the connected codebehind stores **  \r\n    NewState.Count += 1;\r\n\r\n    \/\/ ** \r\n    \/\/ dispatch to the store - if dispatch variable is provided (not provided in unit testing)\r\n    if(dispatch != undefined){\r\n      var action:${codebehindName}_Update_Action = { type: ${codebehindName}_Update, payload: NewState}\r\n      dispatch(action);\r\n    }   \r\n    return NewState;\r }\r\n  \/\/!!nextfunction\r\n  `,
    countMatches: true,
  });
  console.log('add_nextfunction: ', results);
}

const add_nextcodebehindtesthere = async (codebehindPath: string, FunctionName: string, codebehindName: string, testFilePath: string) => {
  const results = replace.sync({
    files: testFilePath,
    from: '//!!nextcodebehindtesthere',
    to:  ` \/\/********************************************************\r\n\/\/ ** Codebehind function: ${FunctionName}\r\n\r\n\/\/ 1) ensure the codebehind function works as expected\r\nit(\'${codebehindName} - ${FunctionName} - Returns Expected Value\', async () => {\r\n  \/\/ a) Arrange\r\n  \/\/ instantiate codebehind class\r\n  const ${codebehindName}TestClass = new ${codebehindName}_codebehind();\r\n  \/\/ get codebehind default state\r\n  const defaultState = ${codebehindName}TestClass.CurrentState;\r\n  \/\/ store the value to check against in const\r\n  const valToCheck = defaultState.Count;\r\n  \/\/ create the mock props for the component -- will need to manually add connected slices\r\n  const ${codebehindName}MockProps = {${codebehindName}: defaultState} as ${codebehindName}State;\r\n\r\n  \/\/ b) Act\r\n  const ManipulatedState = await ${codebehindName}_codebehind.${FunctionName}(${codebehindName}MockProps);\r\n\r\n  \/\/ c) Assert\r\n  expect(ManipulatedState.Count).toEqual(valToCheck + 1);\r\n});\r\n\r\n\/\/ 2) ${FunctionName} End-To-End test\r\nit(\'${codebehindName} - ${FunctionName} - E2E\', async () => {\r\n  \/\/ a) Arrange\r\n  \/\/ instantiate codebehind class\r\n  const ${codebehindName}TestClass = new ${codebehindName}_codebehind();\r\n  \/\/ get codebehind default state\r\n  const defaultState = ${codebehindName}TestClass.CurrentState;\r\n  \/\/ store the value to check against in const\r\n  const valToCheck = defaultState.Count;\r\n\r\n  \/\/ b) Act\r\n  const rendered = render(\r\n    <Provider store={store}>\r\n      <${codebehindName} \/>\r\n    <\/Provider>,\r\n  );\r\n  const btn = rendered.getByTestId(\'btn_${FunctionName}\');\r\n  \/\/ simulate the UI event to dispatch\r\n  await fireEvent(btn, \'press\');\r\n\r\n  \/\/ c) Assert\r\n  expect(store.getState().${codebehindName}.Count).toEqual(valToCheck + 1);\r\n});\r\n\/\/\r\n\/\/ End ${FunctionName} tests\r\n\/\/********************************************************\r\n\/\/!!nextcodebehindtesthere\r\n  `,
    countMatches: true,
  });
  console.log('nextcodebehindtesthere: ', results);
}



const add_nextdispatchprop = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextdispatchprop',
    to: FunctionName + ": (state: " + codebehindName + "State) => {" + codebehindName + "_codebehind." + FunctionName + "(state, dispatch)}," + "\n\t\t\t\t" +
    "//!!nextdispatchprop", 
    countMatches: true,
  });
  console.log('add_nextdispatchprop: ', results);
}

const add_nextstatefunction = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextstatefunction',
    to: FunctionName + " : " + codebehindName + "_codebehind." + FunctionName + "," + "\n\t\t" +
    "//!!nextstatefunction", 
    countMatches: true,
  });
  console.log('add_nextstatefunction: ', results);
}


module.exports = {
  name: 'create-codebehind-function',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { info },
    } = toolbox
    console.log('param: ', parameters.argv[6])
    add_nextinterfacefunction(parameters.first, parameters.second, parameters.third);
    // add function
    add_nextfunction(parameters.first, parameters.second, parameters.third);
    // add dispatch
    add_nextdispatchprop(parameters.first, parameters.second, parameters.third);
    add_nextstatefunction(parameters.first, parameters.second, parameters.third);
    add_nextcodebehindtesthere(parameters.first, parameters.second, parameters.third, parameters.argv[6]);
    info(`Add function complete`)
  },
}
