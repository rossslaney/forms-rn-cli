import {action} from '@storybook/addon-actions';
import {text} from '@storybook/addon-knobs';
import {storiesOf} from '@storybook/react-native';
import React from 'react';
import {Text} from 'react-native';
import {store} from '../../../src/App';
import CenterView from '../CenterView';
import {Provider, connect} from 'react-redux';
import Splash_codebehind, {
  SplashState,
} from '../../../src/Screens/Splash/Splash.codebehind';
import {Splash} from '../../../src/Screens/Splash/Splash';

storiesOf('Splash', module)
  //@ts-ignore
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .add('default state', () => {
    // instantiate codebehind class
    const SplashTestClass = new Splash_codebehind();
    // get codebehind default state
    const defaultState = SplashTestClass.CurrentState;

    // manipulate the component state

    // create the mock props for the component -- will need to manually add connected slices
    let SplashMockProps = {
      ...defaultState,
      Splash: defaultState,
    }// as SplashState;

    return Splash(SplashMockProps);
  });
