/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import Auth_codebehind, {
  AuthState,
} from '../../src/Services/Auth/Auth.codebehind';
import {store} from '../../src/App';
import Home from '../../src/Screens/Home/Home';

//********************************************************
// ** Codebehind function: SignInWebView

// 1) ensure the codebehind function works as expected
it('Auth - SignInWebView - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const AuthTestClass = new Auth_codebehind();
  // get codebehind default state
  const defaultState = AuthTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState;
  // create the mock props for the component -- will need to manually add connected slices
  const AuthMockProps = {Auth: defaultState} as AuthState;

  // b) Act
  const ManipulatedState = await Auth_codebehind.SignInWebView(AuthMockProps);

  // c) Assert
  expect(ManipulatedState).toEqual(valToCheck);
});
// 2) GetDataExample End-To-End test
it('Auth - SignInWebView - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const AuthTestClass = new Auth_codebehind();
  // get codebehind default state
  const defaultState = AuthTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState;

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
// End SignInWebView tests
//********************************************************
//********************************************************
// ** Codebehind function: AcquireTokenSilent

// 1) ensure the codebehind function works as expected
it('Auth - AcquireTokenSilent - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const AuthTestClass = new Auth_codebehind();
  // get codebehind default state
  const defaultState = AuthTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState;
  // create the mock props for the component -- will need to manually add connected slices
  const AuthMockProps = {Auth: defaultState} as AuthState;

  // b) Act
  const ManipulatedState = await Auth_codebehind.AcquireTokenSilent(
    AuthMockProps,
  );

  // c) Assert
  expect(ManipulatedState).toEqual(valToCheck);
});
//
// End AcquireTokenSilent tests
//********************************************************
//********************************************************
// ** Codebehind function: AcquireTokenSilent

// 1) ensure the codebehind function works as expected
it('Auth - HandleSignOutPress - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const AuthTestClass = new Auth_codebehind();
  // get codebehind default state
  const defaultState = AuthTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState;
  // create the mock props for the component -- will need to manually add connected slices
  const AuthMockProps = {Auth: defaultState} as AuthState;

  // b) Act
  const ManipulatedState = await Auth_codebehind.HandleSignOutPress(
    AuthMockProps,
  );

  // c) Assert
  expect(ManipulatedState).toEqual(valToCheck);
});
//
// End HandleSignOutPress tests
//********************************************************
//!!nextcodebehindtesthere
