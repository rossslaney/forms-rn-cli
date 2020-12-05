/**
 * @format
 */
import { IScreenController } from '../../util/types';
import {ActionConst, Actions} from 'react-native-router-flux';
import { Auth_Update, Auth_Update_Action } from '../../util/actionTypes';
import B2CClient, { B2CConfiguration } from '../../util/b2cClient';
import React from 'react';
import { MSALResult, MSALWebviewParams } from 'react-native-msal/lib/typescript/src/types';
import { b2cConfig, b2cScopes as scopes } from '../../util/msalConfig';
//!!nextfileimport

export interface AuthState {
  // # give your component properties here
  VersionNumber: string;
  ScreenName: string;
  Count: number;
  MSAL: MSALResult;
  //!!nextproperty

  // # code-gen below here
  SignInWebView(props: AuthState):void;
  AcquireTokenSilent(props: AuthState):void;
  HandleSignOutPress(props: AuthState):void;
  //!!nextinterfacefunction

  // connections to store
  Auth: AuthState; // provided by the store 
  // Auth?: AuthState; // e.g.
  //!!nextinterfaceconnection
}

// this helps the msal lib for ADB2C
const webviewParameters: MSALWebviewParams = {};

export default class Auth_codebehind implements IScreenController {
    
  static  b2cClient = new B2CClient(b2cConfig);
  // # assign a default state 
  public CurrentState: AuthState = {
    VersionNumber: '0.0.1',
    ScreenName: 'Auth',
    Count: 0,
    MSAL: {} as MSALResult,
    //!!nextdefaultstateproperty

    // SessionStore slice  provided by Store 
    Auth: undefined as any,
    //!!nextconnectiondef

    SignInWebView : Auth_codebehind.SignInWebView,
		AcquireTokenSilent : Auth_codebehind.AcquireTokenSilent,
		HandleSignOutPress : Auth_codebehind.HandleSignOutPress,
    //!!nextstatefunction
  }

  // ### put your codebehind-functions here - static functions implement business logic
  public static async SignInWebView(state: AuthState, dispatch?: any): Promise<AuthState> {
    let NewState:AuthState = state.Auth as AuthState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    // perform updates to the NewState object here (e.g. NewState.Count += 1; )
    const res = await Auth_codebehind.b2cClient.signIn({ scopes, webviewParameters });
    NewState.MSAL = res;     
    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Auth_Update_Action = { type: Auth_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;  
  }
  
  public static async AcquireTokenSilent(state: AuthState, dispatch?: any): Promise<AuthState> {
    let NewState:AuthState = state.Auth as AuthState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    // ** 
    const res = await Auth_codebehind.b2cClient.acquireTokenSilent({ scopes });
    NewState.MSAL = res;     
    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Auth_Update_Action = { type: Auth_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;   
    }
  
  public static async HandleSignOutPress(state: AuthState, dispatch?: any): Promise<AuthState> {
    let NewState:AuthState = state.Auth as AuthState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    // ** 
    const res = await Auth_codebehind.b2cClient.signOut();
    NewState.MSAL = {} as MSALResult;
    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Auth_Update_Action = { type: Auth_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;    
  }
  //!!nextfunction


  /*******************************  %100 code-gen below here   *******************************/
  // listen to Update_Auth dispatches
  public reducer = (state = this.CurrentState, action: any = {type: {}, payload: {}}) => {
      switch (action.type) {
        case Auth_Update:
          return {...action.payload};
        default:
          return state;
      }
    };

    // make functions available to the front-end
    public mapDispatchToProps = (dispatch: any) => {
      // services dont dispatch - use with public functions in class
    }

    // ### connect to the SessionStore here (as little as possible for performance)
    public mapStateToProps = (SessionStore: any, ownProps: any) => {
      // services dont dispatch - use with public functions in class
    }
}