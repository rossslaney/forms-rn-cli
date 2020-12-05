import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

//@ts-ignore
import CardView from 'react-native-cardview';
import Home_codebehind, {HomeState} from './Home.codebehind';
import actualDimensions from '../../util/dimensions';
import StorybookUIRoot from '../../../storybook';
import {MSALResult} from 'react-native-msal';
import HeaderBar from '../../Containers/HeaderBar/HeaderBar';

export const Home: React.FC<HomeState> = (props: HomeState) => {
  return (
    <View testID="HomeScreen" style={styles.container}>
      <HeaderBar style={{position: 'absolute'}} />
      <Text style={styles.versionNum}>{props.VersionNumber}</Text>
      <View style={styles.title}>
        <Text style={styles.title}>Screen : {props.Home.ScreenName}</Text>
      </View>
      <View>
        <TouchableOpacity
          testID={'btn_AddCount'}
          onPress={() => {
            props.AddCount(props);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>AddCount: {props.Home.Count}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={'btn_SignIn'}
          onPress={() => {
            props.SignInADB2C(props);
          }}
          style={styles.signInBtn}>
          <Text style={styles.buttonText}>sign in ADB2C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={'btn_SignOut'}
          onPress={() => {
            props.HandleSignOutPress(props);
          }}
          style={styles.signOutBtn}>
          <Text style={styles.buttonText}>sign out ADB2C</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID={'btn_GetData'}
          onPress={() => {
            props.GetDataExample(props);
          }}
          style={styles.getDataBtn}>
          <Text style={styles.buttonText}>get data w ADB2C access token</Text>
        </TouchableOpacity>
        <Text style={styles.userText}>
          User:{' '}
          {props.Auth.MSAL != undefined
            ? props.Auth.MSAL.account != undefined
              ? // @ts-ignore
                props.Auth.MSAL.account.claims.emails[0]
              : 'na'
            : 'na'}
        </Text>
      </View>
      <Text style={styles.bottomText}>
        Home Screen initiated with Forms RN Scaffolding CLI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  signInBtn: {
    width: actualDimensions.width / 1.1,
    height: actualDimensions.height / 20,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    backgroundColor: '#779ECB',
    justifyContent: 'center',
    alignItems: 'center',
    margin: actualDimensions.width / 25,
    borderRadius: 20,
  },
  signOutBtn: {
    width: actualDimensions.width / 1.1,
    height: actualDimensions.height / 20,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    backgroundColor: '#C23B22',
    justifyContent: 'center',
    alignItems: 'center',
    margin: actualDimensions.width / 25,
    borderRadius: 20,
  },
  getDataBtn: {
    width: actualDimensions.width / 1.1,
    height: actualDimensions.height / 20,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    backgroundColor: '#966fd6',
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
  userText: {
    position: 'absolute',
    bottom: -10,
    color: 'grey',
    alignSelf: 'center',
  },
  bottomText: {
    position: 'absolute',
    bottom: 10,
    color: 'grey',
    alignSelf: 'center',
  },
});

// export default the connected component
let codebehind = new Home_codebehind();
export default connect(
  codebehind.mapStateToProps,
  codebehind.mapDispatchToProps,
)(Home);
