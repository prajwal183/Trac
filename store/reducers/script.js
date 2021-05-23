import { SET_SCRIPTS } from '../actions/script';

const initialState = {
    scripts:''
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_SCRIPTS:
          return {
            scripts: action.adminData,
        
          };
        
      }
      return state;
};