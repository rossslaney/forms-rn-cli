# forms-rn-cli CLI

A CLI for forms-rn-cli.

forms-rn-cli
Creates a new FormsRN Application
Installs dependencies for a React-Redux-ReduxRouter RN App
Updates the App.TSX file to create the demo screen and containers
-AuthService
-EntityService
-SplashScreen
-MoreInfoScreen
-ScreenHeaderContainer

add-component will create a 'dumb' TSX component that can be plugged into Screens or Containers
add-container will create a Container in Containers/[name]/[name].tsx
add-screen will create a Screen in Screens/[name]/[name]
add-service will create a Service that implements IController in Services/[name]/[name]
create-controller-codebehind-function will add a 'codebehind' function accessed from the front-end implementation via "this.props.[functionName](this.props)"
create-controller-connection-to-store will connect the Controller file state to another controller

## Customizing your CLI

Check out the documentation at https://github.com/infinitered/gluegun/tree/master/docs.

## Publishing to NPM

To package your CLI up for NPM, do this:

```shell
$ npm login
$ npm whoami
$ npm lint
$ npm test
(if typescript, run `npm run build` here)
$ npm publish
```

# License

MIT - see LICENSE
