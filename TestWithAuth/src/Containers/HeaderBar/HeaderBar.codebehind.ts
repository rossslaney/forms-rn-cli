import { IScreenController } from '../../util/types';
import {ActionConst, Actions} from 'react-native-router-flux';
import { HeaderBar_Update, HeaderBar_Update_Action } from '../../util/actionTypes';
//!!nextfileimport

export interface HeaderBarState {
  // # give your component properties here
  VersionNumber: string;
  ScreenName: string;
  Count: number;
  //!!nextproperty

  // # code-gen below here
  AddCount(props: HeaderBarState):void;
  //!!nextinterfacefunction

  // connections to store
  HeaderBar: HeaderBarState; // provided by the store 
  //!!nextinterfaceconnection
}

export default class HeaderBar_codebehind implements IScreenController {
    
  // # assign a default state 
  public CurrentState: HeaderBarState = {
    VersionNumber: '0.0.1',
    ScreenName: 'HeaderBar',
    Count: 0,
    //!!nextdefaultstateproperty

    // SessionStore slice  provided by Store 
    HeaderBar: undefined as any, 
    //!!nextconnectiondef

    AddCount : HeaderBar_codebehind.AddCount,
    //!!nextstatefunction
  }

  // ### put your codebehind-functions here - static functions implement business logic
  public static async AddCount(state: HeaderBarState, dispatch?: any): Promise<HeaderBarState> {
    let NewState:HeaderBarState = state.HeaderBar as HeaderBarState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    NewState.Count += 1;

    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:HeaderBar_Update_Action = { type: HeaderBar_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  //!!nextfunction
  
  /*******************************  %100 code-gen below here   *******************************/
  // listen to Update_HeaderBar dispatches
  public reducer = (state = this.CurrentState, action: any = {type: {}, payload: {}}) => {
      switch (action.type) {
        case HeaderBar_Update:
          return {...action.payload};
        default:
          return state;
      }
    };

    // make functions available to the front-end
    public mapDispatchToProps = (dispatch: any) => {
      return {
        AddCount: async (state: HeaderBarState) => {await HeaderBar_codebehind.AddCount(state, dispatch)},
        //!!nextdispatchprop 
      }
    }

    // ### connect to the SessionStore here (as little as possible for performance)
    public mapStateToProps = (SessionStore: any, ownProps: any) => {
        return {
          HeaderBar: SessionStore.HeaderBar,
            //!!nextsessionstoreconnection
        }
    }
}