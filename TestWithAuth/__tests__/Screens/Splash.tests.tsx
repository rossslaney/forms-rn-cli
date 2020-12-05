/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import Splash_codebehind, {
  SplashState,
} from '../../src/Screens/Splash/Splash.codebehind';
import Splash from '../../src/Screens/Splash/Splash';
import {store} from '../../src/App';

it('Splash - Renders Default State', () => {
  // a) Arrange
  // instantiate codebehind class
  const SplashTestClass = new Splash_codebehind();
  // get codebehind default state
  const defaultState = SplashTestClass.CurrentState;

  // b) Act
  // verify the component renders with default state
  const {getByTestId} = render(
    <Provider store={store}>
      <Splash />
    </Provider>,
  );

  // c) Assert
  expect(getByTestId('SplashScreen')).not.toBeNull();
});

//********************************************************
// ** Codebehind function: AddCount

// 1) ensure the codebehind function works as expected
it('Splash - AddCount - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const SplashTestClass = new Splash_codebehind();
  // get codebehind default state
  const defaultState = SplashTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const SplashMockProps = {Splash: defaultState} as SplashState;

  // b) Act
  const ManipulatedState = await Splash_codebehind.AddCount(SplashMockProps);

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck + 1);
});

// 2) AddCount End-To-End test
it('Splash - AddCount - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const SplashTestClass = new Splash_codebehind();
  // get codebehind default state
  const defaultState = SplashTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;

  // b) Act
  const rendered = render(
    <Provider store={store}>
      <Splash />
    </Provider>,
  );
  const btn = rendered.getByTestId('btn_AddCount');
  // simulate the UI event to dispatch
  await fireEvent(btn, 'press');

  // c) Assert
  expect(store.getState().Splash.Count).toEqual(valToCheck + 1);
});
//
// End AddCount tests
//********************************************************
//!!nextcodebehindtesthere
