import { IScreenController } from '../../util/types';
import {ActionConst, Actions} from 'react-native-router-flux';
import { Home_Update, Home_Update_Action } from '../../util/actionTypes';
import Auth_codebehind, { AuthState } from '../../Services/Auth/Auth.codebehind';
import Entity_codebehind, { EntityState } from '../../Services/Entity/Entity.codebehind';
//!!nextfileimport

export interface HomeState {
  // # give your component properties here
  VersionNumber: string;
  ScreenName: string;
  Count: number;
  //!!nextproperty

  // # code-gen below here
  AddCount(props: HomeState):void;
  SignInADB2C(props: HomeState):void;
  HandleSignOutPress(props: HomeState):void;
  GetDataExample(props: HomeState):void;
  //!!nextinterfacefunction

  // connections to store
  Home: HomeState; // provided by the store 
  Auth: AuthState;
  Entity: EntityState;
  // Auth?: AuthState; //e.g.
  //!!nextinterfaceconnection
}

export default class Home_codebehind implements IScreenController {
    
  // # assign a default state 
  public CurrentState: HomeState = {
    VersionNumber: '0.0.1',
    ScreenName: 'Home',
    Count: 0,
    //!!nextdefaultstateproperty

    // SessionStore slice  provided by Store 
    Home: undefined as any, 
    Auth: undefined as any,
    Entity: undefined as any,
    //!!nextconnectiondef

    AddCount : Home_codebehind.AddCount,
    SignInADB2C : Home_codebehind.SignInADB2C,
    HandleSignOutPress: Home_codebehind.HandleSignOutPress,
    GetDataExample: Home_codebehind.GetDataExample,
    //!!nextstatefunction
  }

  // ### put your codebehind-functions here - static functions implement business logic
  public static async AddCount(state: HomeState, dispatch?: any): Promise<HomeState> {
    let NewState:HomeState = state.Home as HomeState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    NewState.Count += 1;

    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Home_Update_Action = { type: Home_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  public static async SignInADB2C(state: HomeState, dispatch?: any): Promise<HomeState> {
    let NewState:HomeState = state.Home as HomeState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    try{
      await Auth_codebehind.SignInWebView(state as any, dispatch);
    }catch(e){
      // first try to acquire token silently in case the user was already logged in 
      try{
        await Auth_codebehind.AcquireTokenSilent(state as any, dispatch);
      }catch(silentSignInE){
        // dispatch an action to show an error message on the splash screen
        // console.error(silentSignInE)
      }
    }
    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Home_Update_Action = { type: Home_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  public static async HandleSignOutPress(state: HomeState, dispatch?: any): Promise<HomeState> {
    let NewState:HomeState = state.Home as HomeState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores ** 

    await Auth_codebehind.HandleSignOutPress(state as any, dispatch);
    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Home_Update_Action = { type: Home_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  public static async GetDataExample(state: HomeState, dispatch?: any): Promise<HomeState> {
    let NewState:HomeState = state.Home as HomeState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores ** 


    // @TODO use the entity service to get data and save the data entities
    var getTokenState = await Auth_codebehind.AcquireTokenSilent(state as any, dispatch);

    var data = await Entity_codebehind.AddCount(state as any, dispatch);

    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Home_Update_Action = { type: Home_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  //!!nextfunction
  
  /*******************************  %100 code-gen below here   *******************************/
  // listen to Update_Home dispatches
  public reducer = (state = this.CurrentState, action: any = {type: {}, payload: {}}) => {
      switch (action.type) {
        case Home_Update:
          return {...action.payload};
        default:
          return state;
      }
    };

    // make functions available to the front-end
    public mapDispatchToProps = (dispatch: any) => {
      return {
        AddCount: async (state: HomeState) => {await Home_codebehind.AddCount(state, dispatch)},
        SignInADB2C: async (state: HomeState) => {await Home_codebehind.SignInADB2C(state, dispatch)}, 
        HandleSignOutPress: async (state: HomeState) => {await Home_codebehind.HandleSignOutPress(state, dispatch)}, 
        GetDataExample: async (state: HomeState) => {await Home_codebehind.GetDataExample(state, dispatch)}, 
        //!!nextdispatchprop 
      }
    }

    // ### connect to the SessionStore here (as little as possible for performance)
    public mapStateToProps = (SessionStore: any, ownProps: any) => {
        return {
          Home: SessionStore.Home,
          Auth: SessionStore.Auth,
          Entity: SessionStore.Entity,
            //!!nextsessionstoreconnection
        }
    }
}