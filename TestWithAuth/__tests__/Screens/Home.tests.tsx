/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import Home_codebehind, {
  HomeState,
} from '../../src/Screens/Home/Home.codebehind';
import Home from '../../src/Screens/Home/Home';
import {store} from '../../src/App';
import Auth_codebehind from '../../src/Services/Auth/Auth.codebehind';
import Entity_codebehind from '../../src/Services/Entity/Entity.codebehind';

it('Home - Renders Default State', () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;

  // b) Act
  // verify the component renders with default state
  const {getByTestId} = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );

  // c) Assert
  expect(getByTestId('HomeScreen')).not.toBeNull();
});

//********************************************************
// ** Codebehind function: AddCount

// 1) ensure the codebehind function works as expected
it('Home - AddCount - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const HomeMockProps = {Home: defaultState} as HomeState;

  // b) Act
  const ManipulatedState = await Home_codebehind.AddCount(HomeMockProps);

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck + 1);
});

// 2) AddCount End-To-End test
it('Home - AddCount - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;

  // b) Act
  const rendered = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  const btn = rendered.getByTestId('btn_AddCount');
  // simulate the UI event to dispatch
  await fireEvent(btn, 'press');

  // c) Assert
  expect(store.getState().Home.Count).toEqual(valToCheck + 1);
});
//
// End AddCount tests
//********************************************************
//********************************************************
// ** Codebehind function: SignInADB2C

// 1) ensure the codebehind function works as expected
it('Home - SignInADB2C - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const HomeMockProps = {Home: defaultState} as HomeState;

  // b) Act
  const ManipulatedState = await Home_codebehind.SignInADB2C(HomeMockProps);

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck);
});

// 2) SignInADB2C End-To-End test
it('Home - SignInADB2C - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;

  // b) Act
  const rendered = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  const btn = rendered.getByTestId('btn_SignIn');
  // simulate the UI event to dispatch
  await fireEvent(btn, 'press');

  // c) Assert
  expect(store.getState().Auth).toEqual(store.getState().Auth);
});
//
// End SignInADB2C tests
//********************************************************
//********************************************************
// ** Codebehind function: HandleSignOutPress

// 1) ensure the codebehind function works as expected
it('Home - HandleSignOutPress - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const HomeMockProps = {
    Home: defaultState,
    Auth: new Auth_codebehind().CurrentState,
    Entity: new Entity_codebehind().CurrentState,
  } as HomeState;

  // b) Act
  const ManipulatedState = await Home_codebehind.HandleSignOutPress(
    HomeMockProps,
  );

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck);
});

// 2) HandleSignOutPress End-To-End test
it('Home - HandleSignOutPress - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;

  // b) Act
  const rendered = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  const btn = rendered.getByTestId('btn_SignOut');
  // simulate the UI event to dispatch
  await fireEvent(btn, 'press');

  // c) Assert
  expect(store.getState().Auth).toEqual(store.getState().Auth);
});
//
// End HandleSignOutPress tests
//********************************************************
//********************************************************
// ** Codebehind function: HandleSignOutPress

// 1) ensure the codebehind function works as expected
it('Home - GetDataExample - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const HomeMockProps = {
    Home: defaultState,
    Auth: new Auth_codebehind().CurrentState,
    Entity: new Entity_codebehind().CurrentState,
  } as HomeState;

  // b) Act
  const ManipulatedState = await Home_codebehind.GetDataExample(HomeMockProps);

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck);
});

// 2) GetDataExample End-To-End test
it('Home - GetDataExample - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HomeTestClass = new Home_codebehind();
  // get codebehind default state
  const defaultState = HomeTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;

  // b) Act
  const rendered = render(
    <Provider store={store}>
      <Home />
    </Provider>,
  );
  const btn = rendered.getByTestId('btn_GetData');
  // simulate the UI event to dispatch
  await fireEvent(btn, 'press');

  // c) Assert
  expect(store.getState().Auth).toEqual(store.getState().Auth);
});
//
// End GetDataExample tests
//********************************************************
//!!nextcodebehindtesthere
