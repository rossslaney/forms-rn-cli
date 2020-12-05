# forms-rn-cli

A opinionated CLI for React-Redux applications in React Native that aims to take away the boilerplate from developing react-redux applications. Inspired by ASP.NET Web Forms - Each 'Screen' or 'Container' has a 'codebehind' file where you define the function available to that front-end component as well as what connections that component will have to the SessionStore.

—————————

## Create a New FormsRN Project

> forms-rn-cli init [ProjectName]  
> cd [ProjectName]  
> forms-rn-cli convertToApp [ProjectName]  
> cd ios && pod install && cd .. && npx react-native link  
> npx react-native start --reset-cache  
> npx react-native run-ios

### The starter app will come with the following pre-configured:

> AuthService -> 'Service' demo to authenticate requests for data with AD B2C (just plug your own ADB2C settings into authsettings.json)  
> HomeScreen -> 'Screen' demo with examples for dispatching actions to the store.  
> Splash -> 'Screen' demo with examples of authorizing a user.  
> ScreenHeaderContainer -> 'Container' demo used to show a dynamic header on each 'Screen'  
> RoundButton -> ‘Component demo used to show a simple visual component.

—————————

## Set up Azure B2C Auth:

> Create an Azure AD B2C application for iOS in the Azure Portal and register a redirect URI for your application. It should be in the following format: msauth.[BUNDLE_ID]://auth  
> The azure ADB2C application should return an email claim with the access token.  
> copy and adjust the app name from 'example' to your app name in AppDelegate.m file from example: https://raw.githubusercontent.com/stashenergy/react-native-msal/master/example/ios/example/AppDelegate.m  
> copy and adjust the app name from 'example' to your app name info.plist from example: https://raw.githubusercontent.com/stashenergy/react-native-msal/master/example/ios/example/Info.plist  
> update the b2cConfig and b2cScopes in msalConfig.ts  
> Open the ios/[projectname]/xcworkspace file, go to Signing & Capabilities, and add a Keychain Sharing capability. Add an entry to the Keychain Groups:  
> com.microsoft.adalcache

—————————

## Commands

### Add a 'Screen'

‘Screen’ and associated codebehind boilerplate generated and connected to the SessionStore in App.tsx.
Test and Storybook boilerplate will be generated as well.

> forms-rn-cli add-screen [NameOfScreen]

### Add a 'Container'

‘Container’ and associated codebehind boilerplate generated and connected to the SessionStore in App.tsx.
Test and Storybook boilerplate will be generated as well.

> forms-rn-cli add-container [NameOfContainer]

Place the 'Container' anywhere in your application markup <NameOfContainer />

### Add a ‘Component’

‘Component’ and associated codebehind boilerplate generated. Test and Storybook boilerplate will be generated as well.

> forms-rn-cli add-container [NameOfContainer]

Place the 'Container' anywhere in your application markup <NameOfContainer />

### Add a 'Service'

Add a new 'Service' - these are connected to the Session Store and have functions that can be called from other codebehind files but do not have a visual component. Test files are generated as well.

> forms-rn-cli add-service [NameOfService]

Call the service from codebehind:

> var newEntityControllerState = await EntityController.Fetch_Entities(a,b,c,dispatch)

### Create a 'CodeBehind Function'

Make a function available from the codebehind to the front-end:

> forms-rn-cli create-codebehind-function [PathToCodeBehindFile][nameoffunction] [NameOfCodeBehind]

To use the new function:

> onPress={() => {nameOfFunction(props)}}

example usage:

> forms-rn-cli create-codebehind-function ./Screens/Home/Home.codebehind.ts SubtractCount Home

### Create a 'CodeBehind Connection'

Connect the codebehind to the State Tree. To ensure performance it is best practice to keep connections to the fewest needed for the component to work.

> forms-rn-cli create-codebehind-connection [PathCodeBehindFile][nameofnewconnectioncodebehind] [PathToNewConnectionCodeBehind]
>
> e.g. : forms-rn-cli create-codebehind-connection ./Screens/Home/Home.codebehind.ts Entity ../../services/entity/entity.codebehind
>
> Use the new connection (Home.tsx) :
> console.log('entity test: ', props.Entity);

—————————

## Run Tests and Code Coverage:

npm test

—————————

## Run the App

### Start app server for local dev.

> ENVFILE=.env.development node node_modules/react-native/local-cli/cli.js start

### Start app for iOS local dev.

> ENVFILE=.env.development npx react-native run-ios --simulator="iPhone 8”.

### Start storybook server.

> npx start-storybook -p 7007.

### Start storybook device

ENVFILE=.env.storybook npx react-native run-ios --simulator="iPhone 11”

> (Make sure that react-native debugging is disabled on storybook device to enable dev simultaneously, reload the iOS dev device and you should be able to run both at the same time)

### Start Dev Servers and Devices

ext install fabiospampinato.vscode-terminals

> Terminals: Run
> Terminals: Kill // Kill all the terminals

### Start app for staging

> ENVFILE=.env.development npx react-native run-ios

### Start app for production.

> ENVFILE=.env.production npx react-native run-ios

—————————

## Using the ReduxRouter Navigation

Add the scene to the nav tree in App.tsx  
Actions.ScreenName() or Actions.push('ScreenName') is available from any codebehind file.

—————————

## Terminology

'NavTree' -> Set up in App.tsx this is the mechanism that Redux-Router uses to create the page tree and manage the Navigation in app.

'SessionStore' -> This is the redux store. Since we are inspired by ASP.NET Web Forms - you can think of this as the app 'Session' which can store data and be stored from various pages in the app.
