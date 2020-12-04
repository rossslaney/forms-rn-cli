import { GluegunCommand } from 'gluegun'


const command: GluegunCommand = {
  name: 'convertToApp',
  run: async toolbox => {
    const { parameters, print} = toolbox
    const name = parameters.first
    print.info('Installing the starter app templates ' + name);
    
    
    // 1) copy from ../templates/starter into /${name}


    // 2 run npm install and pod install  










    

    // scratch below

    // @TODO
    // uncomment once the templates are working correctly -- should probably just be a seperate command
      // const stdioMode = parameters.options.debug ? 'inherit' : 'ignore'
      // var cmd = 'npm install'; 
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd = 'cd ios && pod install && cd .. && npx react-native link'
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd = 'npm install --save react-navigation react-native-gesture-handler react-native-reanimated react-native-screens';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // // new

      // cmd ='cd ios && pod install && cd ..';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd ='npx react-native unlink react-native-gesture-handler ';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd ='npm uninstall react-navigation';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd ='npm uninstall react-navigation-gesture-handler';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd ='npm install --save react-navigation';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd ='npm install --save react-native-gesture-handler ';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })
      
      // cmd ='npx react-native link react-native-gesture-handler' ;
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

      // cmd ='cd ios && pod install && cd ..';
      // print.info(`command: ${cmd}`)
      // await system.exec(cmd, { stdio: stdioMode })

    print.success('Successfully installed the starter app template');
    print.success('Use npx react-native start --reset-cache');
  },
}

module.exports = command
