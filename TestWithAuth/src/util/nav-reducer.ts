

export const initialState = {};
  
  export default (state = initialState, action = {}) => {
    switch (action.type) {
      // RNRF NAV FUNCTIONS
      case 'Navigation/NAVIGATE':
        return {
          ...state,
          scene: action.routeName,
        };

      case 'persist/REHYDRATE':
        console.log('rehydrate auth here', action.payload);
        if (action.payload == undefined) {
          // do nothing - theres nothing in storage
          return state;
        } else {
          return {
            ...action.payload,
          };
        }
        console.log('state: ', state);
      
      default:
        return state;
    }
  };