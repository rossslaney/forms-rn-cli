
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');

const AddSessionStoreConnectionToCodeBehindFile = async (codebehindPath: string, SessionStoreSlice: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextsessionstoreconnection',
    to: SessionStoreSlice + ": SessionStore." + SessionStoreSlice + ",\n\t\t\t\t\t" +
    "//!!nextsessionstoreconnection", 
    countMatches: true,
  });
  console.log('AddConnectionToCodeBehindFile: ', results);
}

const add_nextinterfaceconnection = async (codebehindPath: string, SessionStoreSlice: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextinterfaceconnection',
    to: SessionStoreSlice + "?:" + SessionStoreSlice + "State" + ";\n\t\t\t" +
    "//!!nextinterfaceconnection", 
    countMatches: true,
  });
  console.log('AddConnectionToCodeBehindFile: ', results);
}

const add_nextfileimport = async (codebehindPath: string, SessionStoreSlice: string, SessionStoreSliceCodeBehindPath: string) => {
  const results = replace.sync({
    files: codebehindPath,
    from: '//!!nextfileimport',
    to: "import { " + SessionStoreSlice +"State } from '" + SessionStoreSliceCodeBehindPath + "'; " + ";\n" +
    "//!!nextfileimport", 
    countMatches: true,
  });
  console.log('AddConnectionToCodeBehindFile: ', results);
}

module.exports = {
  name: 'create-codebehind-connection',
  run: async (toolbox: GluegunToolbox) => {
    const {
      parameters,
      print: { info },
    } = toolbox

    AddSessionStoreConnectionToCodeBehindFile(parameters.first, parameters.second);
    add_nextinterfaceconnection(parameters.first, parameters.second);
    add_nextfileimport(parameters.first, parameters.second, parameters.third);
    info(`Added sessions store connection to slice`)
  },
}
