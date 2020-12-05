import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text, View} from 'react-native';
import CenterView from '../CenterView';
import {
  RoundButton,
  RoundButtonState,
} from '../../../src/Components/RoundButton';

storiesOf('RoundButton', module)
  //@ts-ignore
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default state', () => {
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

    return RoundButton(RoundButtonProps);
  });
