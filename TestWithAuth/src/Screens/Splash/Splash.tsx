import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

//@ts-ignore
import CardView from 'react-native-cardview';
import Splash_codebehind, {SplashState} from './Splash.codebehind';
import actualDimensions from '../../util/dimensions';
import StorybookUIRoot from '../../../storybook';

export const Splash: React.FC<SplashState> = (props: SplashState) => {
  return (
    <View testID="SplashScreen" style={styles.container}>
      <Text style={styles.versionNum}>{props.VersionNumber}</Text>
      <View>
        <Text style={styles.title}>Screen : {props.Splash.ScreenName}</Text>
      </View>
      <View>
        <TouchableOpacity
        testID={'btn_AddCount'}
        onPress={() => {
          props.AddCount(props);
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>AddCount: {props.Splash.Count}</Text>
      </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>
        Splash Screen initiated with Forms RN Scaffolding CLI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  versionNum: {
    position: 'absolute',
    top: 35,
    right: 25,
  },
  title: {
    paddingBottom: actualDimensions.height / 12,
    fontSize: actualDimensions.height / 60,
    fontWeight: 'bold',
    fontFamily: 'Gill Sans',
    color: '#ff6a00',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 3,
  },
  bottomText: {
    position: 'absolute',
    bottom: 10,
    color: 'grey',
    alignSelf: 'center',
  },
  button: {
    width: actualDimensions.width / 1.1,
    height: actualDimensions.height / 20,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    backgroundColor: '#ff6a00',
    justifyContent: 'center',
    alignItems: 'center',
    margin: actualDimensions.width / 25,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

// export default the connected component
let codebehind = new Splash_codebehind();
export default connect(
  codebehind.mapStateToProps,
  codebehind.mapDispatchToProps,
)(Splash);
