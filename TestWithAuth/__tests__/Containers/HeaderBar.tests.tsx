/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import HeaderBar_codebehind, {
  HeaderBarState,
} from '../../src/Containers/HeaderBar/HeaderBar.codebehind';
import HeaderBar from '../../src/Containers/HeaderBar/HeaderBar';
import {store} from '../../src/App';

it('HeaderBar - Renders Default State', () => {
  // a) Arrange
  // instantiate codebehind class
  const HeaderBarTestClass = new HeaderBar_codebehind();
  // get codebehind default state
  const defaultState = HeaderBarTestClass.CurrentState;

  // b) Act
  // verify the component renders with default state
  const {getByTestId} = render(
    <Provider store={store}>
      <HeaderBar />
    </Provider>,
  );

  // c) Assert
  expect(getByTestId('HeaderBarContainer')).not.toBeNull();
});

//********************************************************
// ** Codebehind function: AddCount

// 1) ensure the codebehind function works as expected
it('HeaderBar - AddCount - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HeaderBarTestClass = new HeaderBar_codebehind();
  // get codebehind default state
  const defaultState = HeaderBarTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const HeaderBarMockProps = {HeaderBar: defaultState} as HeaderBarState;

  // b) Act
  const ManipulatedState = await HeaderBar_codebehind.AddCount(
    HeaderBarMockProps,
  );

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck + 1);
});

// 2) AddCount End-To-End test
it('HeaderBar - AddCount - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const HeaderBarTestClass = new HeaderBar_codebehind();
  // get codebehind default state
  const defaultState = HeaderBarTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;

  // b) Act
  const rendered = render(
    <Provider store={store}>
      <HeaderBar />
    </Provider>,
  );
  const btn = rendered.getByTestId('btn_AddCountHeader');
  // simulate the UI event to dispatch
  await fireEvent(btn, 'press');

  // c) Assert
  expect(store.getState().HeaderBar.Count).toEqual(valToCheck + 1);
});
//
// End AddCount tests
//********************************************************
//!!nextcodebehindtesthere
