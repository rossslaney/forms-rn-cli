/**
 * @format
 */

import 'react-native';
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {RoundButton, RoundButtonState} from '../../src/Components/RoundButton';
import {Text, View} from 'react-native';

it('RoundButton - Renders Default State', () => {
  var RoundButtonProps: RoundButtonState = {
    OnPress: () => {
      console.log('onpress called from RoundButton');
    },
    children: (
      <Text
        style={{color: 'white', fontWeight: 'bold', fontFamily: 'Gill Sans'}}>
        BTN
      </Text>
    ),
    Count: 0,
  };

  var component = RoundButton(RoundButtonProps);

  // b) Act
  // verify the component renders with default state
  const {getByTestId} = render(<View>{component}</View>);

  // c) Assert
  expect(getByTestId('RoundButtonComponent')).not.toBeNull();
});
