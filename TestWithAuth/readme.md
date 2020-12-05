## Start app server for local dev

ENVFILE=.env.development node node_modules/react-native/local-cli/cli.js start

## Start app for iOS local dev

ENVFILE=.env.development npx react-native run-ios --simulator="iPhone 8"

## Start storybook server

npx start-storybook -p 7007

## Start storybook device

ENVFILE=.env.storybook npx react-native run-ios --simulator="iPhone 11"

## Start app for staging

ENVFILE=.env.development npx react-native run-ios

## Start app for production

ENVFILE=.env.production npx react-native run-ios

## Run Tests and Code Coverage:

npm test
