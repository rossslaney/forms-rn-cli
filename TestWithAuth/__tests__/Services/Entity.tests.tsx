/**
 * @format
 */

import 'react-native';
import React from 'react';
import {Provider, connect} from 'react-redux';
import {render, fireEvent} from '@testing-library/react-native';
import Entity_codebehind, {
  EntityState,
} from '../../src/Services/Entity/Entity.codebehind';
import {store} from '../../src/App';
import Home from '../../src/Screens/Home/Home';
//********************************************************
// ** Codebehind function: AddCount

// 1) ensure the codebehind function works as expected
it('Entity - AddCount - Returns Expected Value', async () => {
  // a) Arrange
  // instantiate codebehind class
  const EntityTestClass = new Entity_codebehind();
  // get codebehind default state
  const defaultState = EntityTestClass.CurrentState;
  // store the value to check against in const
  const valToCheck = defaultState.Count;
  // create the mock props for the component -- will need to manually add connected slices
  const EntityMockProps = {Entity: defaultState} as EntityState;

  // b) Act
  const ManipulatedState = await Entity_codebehind.AddCount(EntityMockProps);

  // c) Assert
  expect(ManipulatedState.Count).toEqual(valToCheck + 1);
});
// 2) AddCount End-To-End test
it('Entity - AddCount - E2E', async () => {
  // a) Arrange
  // instantiate codebehind class
  const EntityTestClass = new Entity_codebehind();
  // get codebehind default state
  const defaultState = EntityTestClass.CurrentState;
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
  expect(store.getState().Entity).toEqual(store.getState().Entity);
});
//********************************************************
//!!nextcodebehindtesthere
