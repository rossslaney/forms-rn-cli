import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

//@ts-ignore
import actualDimensions from '../util/dimensions';

export interface RoundButtonState {
  children: React.ReactNode;
  Count: number;
  OnPress: () => void;
}

export const RoundButton: React.FC<RoundButtonState> = (
  props: RoundButtonState,
) => {
  return (
    <View testID={'RoundButtonComponent'}>
      <TouchableOpacity onPress={props.OnPress} style={styles.RoundButtonStyle}>
        {props.children}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  RoundButtonStyle: {
    width: actualDimensions.width / 3,
    height: actualDimensions.height / 10,
    borderWidth: 5,
    borderColor: 'black',
    borderRadius: actualDimensions.width / 3,
    backgroundColor: '#ff6a00',
    margin: '15%',
    display: 'flex',
    justifyContent: 'center' /* align horizontal */,
    alignItems: 'center' /* align vertical */,
  },
});
