
import { GluegunToolbox } from 'gluegun'
const replace = require('replace-in-file');


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

module.exports = {
  name: 'add-component',
  run: async (toolbox: GluegunToolbox) => {
    const { parameters, print, template} = toolbox
    const name = parameters.first

    await template.generate({
      template: `component.tsx.ejs`,
      target: `src/Components/${name}.tsx`,
      props: { name }
    })

    // generate the tests file __tests__/Screens/name.tests.tsx from template
    await template.generate({
      template: 'component.tests.tsx.ejs',
      target: `__tests__/Components/${name}.tests.tsx`,
      props: { name }
    })

    // generate the storybook folder for this component from template
    await template.generate({
      template: '/story/component.stories.tsx.ejs',
      target: `storybook/stories/${name}/${name}.stories.tsx`,
      props: { name }
    })

    // add the story import to the storybook entry
    AddStorybookImportToEntry(name);


    print.info('Generated screen and codebehind, tests, and storybook boilerplate. ')
  },
}
