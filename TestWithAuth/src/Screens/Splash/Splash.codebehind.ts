import { IScreenController } from '../../util/types';
import {ActionConst, Actions} from 'react-native-router-flux';
import { Splash_Update, Splash_Update_Action } from '../../util/actionTypes';
//!!nextfileimport

export interface SplashState {
  // # give your component properties here
  VersionNumber: string;
  ScreenName: string;
  Count: number;
  //!!nextproperty

  // # code-gen below here
  AddCount(props: SplashState):void;
  //!!nextinterfacefunction

  // connections to store
  Splash: SplashState; // provided by the store 
  //!!nextinterfaceconnection
}

export default class Splash_codebehind implements IScreenController {
    
  // # assign a default state 
  public CurrentState: SplashState = {
    VersionNumber: '0.0.1',
    ScreenName: 'Splash',
    Count: 0,
    //!!nextdefaultstateproperty

    // SessionStore slice  provided by Store 
    Splash: undefined as any, 
    //!!nextconnectiondef

    AddCount : Splash_codebehind.AddCount,
    //!!nextstatefunction
  }

  // ### put your codebehind-functions here - static functions implement business logic
  public static async AddCount(state: SplashState, dispatch?: any): Promise<SplashState> {
    let NewState:SplashState = state.Splash as SplashState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    NewState.Count += 1;

    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Splash_Update_Action = { type: Splash_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  //!!nextfunction
  
  /*******************************  %100 code-gen below here   *******************************/
  // listen to Update_Splash dispatches
  public reducer = (state = this.CurrentState, action: any = {type: {}, payload: {}}) => {
      switch (action.type) {
        case Splash_Update:
          return {...action.payload};
        default:
          return state;
      }
    };

    // make functions available to the front-end
    public mapDispatchToProps = (dispatch: any) => {
      return {
        AddCount: async (state: SplashState) => {await Splash_codebehind.AddCount(state, dispatch)},
        //!!nextdispatchprop 
      }
    }

    // ### connect to the SessionStore here (as little as possible for performance)
    public mapStateToProps = (SessionStore: any, ownProps: any) => {
        return {
          Splash: SessionStore.Splash,
            //!!nextsessionstoreconnection
        }
    }
}