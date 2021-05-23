
import { SET_EMPLOYEES } from '../actions/employee';

const initialState = {
    availableList:[]
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_EMPLOYEES:
          return {
            availableList: action.emplist,
        
          };
        
      }
      return state;
};