# forms-rn-cli

A scaffolding CLI for React-Redux applications in React Native. Inspired by ASP.NET Web Forms - We think that the mental model for programming front-end should be simple and event driven. Each 'Screen' or 'Container' has a 'codebehind' file where you define the function available to that front-end component as well as what connections that component will have to the state tree.

## Create a New FormsRN Project

> forms-rn-cli [projectname]

The starter app will come with the following pre-configured:

> AuthService
> EntityService
> SplashScreen
> MoreInfoScreen
> HomeScreen
> ScreenHeaderContainer

## Add a 'Screen'

## Add a 'Container'

## Add a 'DumbComponent'

## Add a 'Service'

## Create a 'CodeBehind Function'

Make a function available from the codebehind to the front-end:

> forms-rn-cli create-codebehind-function [NameOfCodeBehindFile][nameoffunction]

To use the new function:

> onPress={() => {nameOfFunction(props)}}

## Create a 'CodeBehind Connection'

Connect the codebehind to the State Tree. To ensure performance it is best practice to keep connections to the fewest needed for the component to work.

> forms-rn-cli create-codebehind-connection [NameOfCodeBehindFile][nameofcodebehindfiletoconnectto]

## Using the ReduxRouter Navigation

> Add the scene to the nav tree in App.tsx
> Actions.ScreenName() or Actions.push('ScreenName') is available from any codebehind file.
