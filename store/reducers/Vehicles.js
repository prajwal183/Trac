
import { SET_VEHICLES } from '../actions/vehicle';

const initialState = {
    availableList:[]
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_VEHICLES:
          return {
            availableList: action.vehlist,
        
          };
        
      }
      return state;
};