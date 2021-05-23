
import { SET_INSTRUCTIONS } from '../actions/instructions';

const initialState = {
    availableList:[]
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_INSTRUCTIONS:
          return {
            availableList: action.inslist,
        
          };
        
      }
      return state;
};