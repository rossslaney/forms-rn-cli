import React from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers,
  AnyAction,
  Store,
} from 'redux';
import {Provider, connect} from 'react-redux';
import {Scene, Actions, Router, Drawer, Tabs} from 'react-native-router-flux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import {SafeAreaView, Settings, Text, View} from 'react-native';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import Config from 'react-native-config';
const APP_MODE = Config.APP_MODE;
const APP_ENV = Config.APP_ENV;
// #### import the screens,containers, services and codebehind files here
import Home from './Screens/Home/Home';
import Home_codebehind from './Screens/Home/Home.codebehind';
import Auth_codebehind from './Services/Auth/Auth.codebehind';
import Storybook from '../storybook';
import HeaderBar from './Containers/HeaderBar/HeaderBar';
import HeaderBar_codebehind from './Containers/HeaderBar/HeaderBar.codebehind';
import Splash from './Screens/Splash/Splash';
import Splash_codebehind from './Screens/Splash/Splash.codebehind';
import Entity_codebehind from './Services/Entity/Entity.codebehind';
//!!nextimport

declare const global: {HermesInternal: null | {}};

var AppNavigator: any = {};
/* istanbul ignore next */
if (APP_MODE == 'storybook') {
  AppNavigator = Actions.create(
    <Scene key="root" hideNavBar swipeEnabled={false} gestureEnabled={false}>
      <Scene key="Home" component={Storybook} hideNavBar />
    </Scene>,
  );
} else {
  // #### add the 'Screen''s here to the NavTree
  AppNavigator = Actions.create(
    <Scene key="root" hideNavBar swipeEnabled={false} gestureEnabled={false}>
      <Scene key="Home" component={Home} hideNavBar />
      <Scene key="Splash" component={Splash} hideNavBar />
      {/*!!nextsceneimport*/}
    </Scene>,
  );
}

// default nav reducer
const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Home'),
);
const navReducer = (state = initialState, action: any) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);
  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

// persist config
// https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
const config: any = {
  key: 'Persisted',
  // whitelist: ['Entity'], // define the slices to save here
  storage: AsyncStorage,
  timeout: null,
};

// #### Add the codebehind files here
let Home_controller = new Home_codebehind();
let Auth_controller = new Auth_codebehind();
let HeaderBar_controller = new HeaderBar_codebehind();
let Splash_controller = new Splash_codebehind();
let Entity_controller = new Entity_codebehind();
//!!nextcontroller

const appReducer = persistCombineReducers(config, {
  nav: navReducer,
  Home: Home_controller.reducer,
  Auth: Auth_controller.reducer,
  HeaderBar: HeaderBar_controller.reducer,
  Splash: Splash_controller.reducer,
  Entity: Entity_controller.reducer,
  //!!nextreducer
});
const mapStateToProps = (state: any) => {
  /* istanbul ignore next */
  return {
    state: state.nav,
    Home: Home_controller.reducer,
    Auth: Auth_controller.reducer,
    HeaderBar: HeaderBar_controller.reducer,
    Splash: Splash_controller.reducer,
    Entity: Entity_controller.reducer,
    //!!nextprop
  };
};

const middleware = createReactNavigationReduxMiddleware(
  'root',
  (state: any) => state.nav,
);
const ReduxNavigator = reduxifyNavigator(AppNavigator, 'root');

const ReduxRouter: any = connect(mapStateToProps)(Router as any);

// we need two diff. store objects - one is for Jest w/o logger
let storeObj = {} as Store<any, AnyAction>;
if (process.env.JEST_WORKER_ID == undefined) {
  /* istanbul ignore next */
  storeObj = createStore(
    appReducer,
    applyMiddleware(middleware, thunkMiddleware, logger),
  );
} else {
  // in Jest test - make logger go away
  storeObj = createStore(
    appReducer,
    applyMiddleware(middleware, thunkMiddleware),
  );
}
// export store for use in tests
export const store = storeObj;

// dont use persistor in Test
if (process.env.JEST_WORKER_ID == undefined) {
  /* istanbul ignore next */
  const persistor = persistStore(store, null, () => {
    store.getState(); // if you want to get restoredState
  });
  // !***  uncomment will clear the local storage -- needs to be commented in PROD to persist
  /* istanbul ignore next */
  persistor.purge();
  // !***
}

/* istanbul ignore next */
const Application = () => {
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Provider store={store}>
        <ReduxRouter navigator={ReduxNavigator} />
      </Provider>
    </SafeAreaView>
  );
};

const App = Application;
// eventually add codepush...
// const App = codePush(Application);
export default App;
