import { SET_LOCATION } from '../actions/UserLocation';

const initialState = {
    fetchedLocation:[]
};

export default (state = initialState,action) => {
    switch (action.type) {
        case SET_LOCATION:
          return {
            fetchedLocation: action.locatedlist,
        
          };
        
      }
      return state;
};