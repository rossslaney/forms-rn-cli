import { IScreenController } from '../../util/types';
import {ActionConst, Actions} from 'react-native-router-flux';
import { Entity_Update, Entity_Update_Action } from '../../util/actionTypes';
//!!nextfileimport

export interface EntityState {
  // # give your component properties here
  VersionNumber: string;
  ScreenName: string;
  Count: number;
  //!!nextproperty

  // # code-gen below here
  AddCount(props: EntityState):void;
  //!!nextinterfacefunction

  // connections to store
  Entity: EntityState; // provided by the store 
  //!!nextinterfaceconnection
}

export default class Entity_codebehind implements IScreenController {
    
  // # assign a default state 
  public CurrentState: EntityState = {
    VersionNumber: '0.0.1',
    ScreenName: 'Entity',
    Count: 0,
    //!!nextdefaultstateproperty

    // SessionStore slice  provided by Store 
    Entity: undefined as any, 
    //!!nextconnectiondef

    AddCount : Entity_codebehind.AddCount,
    //!!nextstatefunction
  }

  // ### put your codebehind-functions here - static functions implement business logic
  public static async AddCount(state: EntityState, dispatch?: any): Promise<EntityState> {
    let NewState:EntityState = state.Entity as EntityState;
    // ** perform operations on the NewState here **
    // ** you can dispatch to any of the connected codebehind stores **  
    NewState.Count += 1;

    // ** 
    // dispatch to the store - if dispatch variable is provided (not provided in unit testing)
    if(dispatch != undefined){
      var action:Entity_Update_Action = { type: Entity_Update, payload: NewState}
      dispatch(action);
    }   
    return NewState;
  }
  //!!nextfunction
  
  /*******************************  %100 code-gen below here   *******************************/
  // listen to Update_Entity dispatches
  public reducer = (state = this.CurrentState, action: any = {type: {}, payload: {}}) => {
      switch (action.type) {
        case Entity_Update:
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