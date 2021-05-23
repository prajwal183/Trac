import { SET_DATA } from '../actions/start';

const initialState = {
    credData:[]
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_DATA:
          return {
            credData: action.adminData,
        
          };
        
      }
      return state;
};