import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';

//@ts-ignore
import HeaderBar_codebehind, {HeaderBarState} from './HeaderBar.codebehind';
import actualDimensions from '../../util/dimensions';

export const HeaderBar: React.FC<HeaderBarState> = (props: HeaderBarState) => {
  return (
    <View testID="HeaderBarContainer" style={styles.container}>
      <Text style={styles.versionNum}>{props.VersionNumber}</Text>
      <View>
        <Text style={styles.title}>
          Container : {props.HeaderBar.ScreenName}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          testID={'btn_AddCountHeader'}
          onPress={() => {
            props.AddCount(props);
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>
            AddCount: {props.HeaderBar.Count}
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.bottomText}>
        HeaderBar Container initiated with Forms RN Scaffolding CLI
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: actualDimensions.width,
    borderWidth: 2,
    borderColor: '#ff6a00',
    padding: 2,
    backgroundColor: '#ffffef',
  },
  versionNum: {
    position: 'absolute',
    top: 5,
    right: 25,
  },
  title: {
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
    bottom: 2,
    color: 'grey',
    alignSelf: 'center',
    fontSize: 12,
  },
  button: {
    width: actualDimensions.width / 3,
    height: actualDimensions.height / 30,
    shadowOpacity: 0.3,
    alignSelf: 'center',
    backgroundColor: '#ff6a00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: '10%',
  },
  buttonText: {
    fontFamily: 'Gill Sans',
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});

// export default the connected component
let codebehind = new HeaderBar_codebehind();
export default connect(
  codebehind.mapStateToProps,
  codebehind.mapDispatchToProps,
)(HeaderBar);
