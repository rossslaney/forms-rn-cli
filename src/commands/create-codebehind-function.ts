
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');


const add_nextinterfacefunction = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextinterfacefunction',
    to: FunctionName + "(props: " + codebehindName + "State):void" + ";\n\t\t" +
    "//!!nextinterfacefunction", 
    countMatches: true,
  });
  console.log('add_nextinterfacefunction: ', results);
}


const add_nextfunction = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextfunction',
    to: "public static " + FunctionName + "(state: " + codebehindName + "State, dispatch?: any): void {"+ ";\n\t\t\t" +
          "let NewState = state." + codebehindName + ";"+ "\n\t\t\t\t" +
          "if(NewState != undefined){"+ "\n\t\t\t\t\t" +
          "// perform updates to the NewState object here (e.g. NewState.Count += 1; )"+ "\n\t\t\t\t\t" +
          "dispatch({type: '" + codebehindName + "_Update',payload: {NewSettings: NewState}})"+ "\n\t\t\t\t" +
          "}"+ "\n\t\t\t" +
          "}"+ "\n\t\t\t" +
        "//!!nextfunction", 
    countMatches: true,
  });
  console.log('add_nextfunction: ', results);
}


const add_nextdispatchprop = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextdispatchprop',
    to: FunctionName + ": (state: " + codebehindName + "State) => {" + codebehindName + "_codebehind." + FunctionName + "(state, dispatch)}," + "\n\t\t\t\t\t" +
    "//!!nextdispatchprop", 
    countMatches: true,
  });
  console.log('add_nextdispatchprop: ', results);
}

const add_nextstatefunction = async (codebehindPath: string, FunctionName: string, codebehindName: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextstatefunction',
    to: FunctionName + " : " + codebehindName + "_codebehind." + FunctionName + "," + "\n\t\t\t\t" +
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

    add_nextinterfacefunction(parameters.first, parameters.second, parameters.third);
    // add function
    add_nextfunction(parameters.first, parameters.second, parameters.third);
    // add dispatch
    add_nextdispatchprop(parameters.first, parameters.second, parameters.third);
    add_nextstatefunction(parameters.first, parameters.second, parameters.third);
    info(`Added sessions store connection to slice`)
  },
}
