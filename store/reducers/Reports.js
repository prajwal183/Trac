
import { SET_REPORTS } from '../actions/reports';

const initialState = {
    availableList:[]
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_REPORTS:
          return {
            availableList: action.replist,
        
          };
        
      }
      return state;
};