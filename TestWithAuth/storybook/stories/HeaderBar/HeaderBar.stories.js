import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import {store} from '../../../src/App';
import CenterView from '../CenterView';
import {Provider, connect} from 'react-redux';
import HeaderBar_codebehind, {
  HeaderBarState,
} from '../../../src/Containers/HeaderBar/HeaderBar.codebehind';
import {HeaderBar} from '../../../src/Containers/HeaderBar/HeaderBar';

storiesOf('HeaderBar', module)
  //@ts-ignore
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default state', () => {
    // instantiate codebehind class
    const HeaderBarTestClass = new HeaderBar_codebehind();
    // get codebehind default state
    const defaultState = HeaderBarTestClass.CurrentState;

    // manipulate the component state

    // create the mock props for the component -- will need to manually add connected slices
    let HeaderBarMockProps = {
      ...defaultState,
      HeaderBar: defaultState,
    }// as HeaderBarState;

    return HeaderBar(HeaderBarMockProps);
  });
