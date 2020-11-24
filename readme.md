# forms-rn-cli

A scaffolding CLI for React-Redux applications in React Native. Inspired by ASP.NET Web Forms - Each 'Screen' or 'Container' has a 'codebehind' file where you define the function available to that front-end component as well as what connections that component will have to the SessionStore.

## Create a New FormsRN Project

> forms-rn-cli init [ProjectName]  
> cd [ProjectName]  
> forms-rn-cli convertToApp [ProjectName]
> cd ios && pod install && cd .. && npx react-native link
> npx react-native start --reset-cache  
> npx react-native run-ios

The starter app will come with the following pre-configured:

> AuthService -> 'Service' demo to authenticate requests for data with AD B2C (just plug your own ADB2C settings into authsettings.json)  
> EntityService -> 'Service' demo to request data entities from an API (sample API is set up and free to use)  
> SplashScreen -> 'Screen' demo of a typical splash screen an entry point for your new FormsRN App.  
> MoreInfoScreen -> 'Screen' demo to show non-restricted navigation from the Splash 'Screen'.  
> HomeScreen -> 'Screen' demo requires an authenticated user to access this 'Screen' / demonstrates the codebehind connection to EntityService in SessionStore and displays the demo data entities.  
> ScreenHeaderContainer -> 'Container' demo used to show a dynamic header on each 'Screen'  
> DataCard -> 'DumbComponent' demo used to show a simple visual component

## Add a 'Screen'

Add a new 'Screen' and associated codebehind file connected to the SessionStore in App.tsx.

> forms-rn-cli add-screen [NameOfScreen]

Use the Navigation instructions below to place the 'Screen' in your NavTree.

## Add a 'Container'

Add a new 'Container' and associated codebehind file connected to the SessionStore in App.tsx.

> forms-rn-cli add-container [NameOfContainer]

Place the 'Container' anywhere in your application markup <[NameOfContainer] />

## Add a 'DumbComponent'

Add a new 'DumbComponent' - these are not connected to the SessionStore

> forms-rn-cli add-component [NameOfDumbComponent]

Place the 'DumbComponent' anywhere in your application markup <[NameOfDumbComponent] />

## Add a 'Service'

Add a new 'Service' - these are connected to the Session Store and have functions that can be called from other codebehind files but do not have a visual component.

> forms-rn-cli add-service [NameOfService]

Call the service from codebehind: var newEntityControllerState = await EntityController.Fetch_Entities(a,b,c,dispatch)

## Create a 'CodeBehind Function'

Make a function available from the codebehind to the front-end:

> forms-rn-cli create-codebehind-function [NameOfCodeBehindFile][nameoffunction]

To use the new function:

> onPress={() => {nameOfFunction(props)}}

example usage:

> forms-rn-cli create-codebehind-function ./Screens/Home/Home.codebehind.ts SubtractCount Home

## Create a 'CodeBehind Connection'

Connect the codebehind to the State Tree. To ensure performance it is best practice to keep connections to the fewest needed for the component to work.

> forms-rn-cli create-codebehind-connection [NameOfCodeBehindFile][nameofcodebehindfiletoconnectto]  
> e.g. : forms-rn-cli create-codebehind-connection ./Screens/Home/Home.codebehind.ts Entity ../../services/entity/entity.codebehind  
> Use the new connection (Home.tsx) : console.log('entity test: ', props.Entity);

## Using the ReduxRouter Navigation

Add the scene to the nav tree in App.tsx  
Actions.ScreenName() or Actions.push('ScreenName') is available from any codebehind file.

## Terminology

'NavTree' -> Set up in App.tsx this is the mechanism that Redux-Router uses to create the page tree and manage the Navigation in app.

'SessionStore' -> This is the redux store. Since we are inspired by ASP.NET Web Forms - you can think of this as the app 'Session' which can store data and be stored from various pages in the app.
