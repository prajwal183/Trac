
import { SET_USER } from '../actions/getuser';


const initialState = {
    user:'',
    
};
export default (state = initialState,action) => {
    switch (action.type) {
        case SET_USER:
          return {
            user: action.gotuser,
        
          };
          
        
      }
      return state;
};