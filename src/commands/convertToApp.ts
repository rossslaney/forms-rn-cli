import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'convertToApp',
  run: async toolbox => {
    const { parameters, print, template} = toolbox
    const name = parameters.first
    print.info('Installing the starter app templates')
    await template.generate({
        template: 'package.json.ejs',
        target: `package.json`
    })

    await template.generate({
        template: '/starter/util/dimensions.ts.ejs',
        target: `util/dimensions.ts`,
        props: { name }
      })
 

    await template.generate({
        template: '/starter/Screens/Splash/Splash.tsx.ejs',
        target: `Screens/Splash/Splash.tsx`,
        props: { name }
      })
 
      await template.generate({
        template: '/starter/Screens/Splash/Splash.codebehind.ts.ejs',
        target: `Screens/Splash/Splash.codebehind.ts`,
        props: { name }
      })
    
    await template.generate({
        template: '/starter/app.tsx.ejs',
        target: `app.tsx`,
        props: { name }
      })

    await template.generate({
        template: '/starter/nav-reducer.ts.ejs',
        // target: `${name}/nav-reducer.ts`,
        target: `nav-reducer.ts`,
        props: { name }
      })

    await template.generate({
        template: '/starter/types.ts.ejs',
        // target: `${name}/nav-reducer.ts`,
        target: `types.ts`,
        props: { name }
      })

      // generate the app.tsx last to wire together all of the codebehind files 
    await template.generate({
        template: '/starter/app.tsx.ejs',
        target: `app.tsx`,
        props: { name }
      })

    // @TODO
    // uncomment once the templates are working correctly -- should probably just be a seperate command
    //   const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
    //   var cmd = 'npm install'; 
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd = 'cd ios && pod install && cd .. && npx react-native link'
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd = 'npm install --save react-navigation react-native-gesture-handler react-native-reanimated react-native-screens';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   // new

    //   cmd ='cd ios && pod install && cd ..';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd ='npx react-native unlink react-native-gesture-handler ';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd ='npm uninstall react-navigation';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd ='npm uninstall react-navigation-gesture-handler';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd ='npm install --save react-navigation';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd ='npm install --save react-native-gesture-handler ';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })
      
    //   cmd ='npx react-native link react-native-gesture-handler' ;
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    //   cmd ='cd ios && pod install && cd ..';
    //   print.info(`command: ${cmd}`)
    //   await system.exec(cmd, { stdio: stdioMode })

    print.success('Successfully installed the starter app template');
    print.success('Use npx react-native start --reset-cache');
  },
}

module.exports = command
