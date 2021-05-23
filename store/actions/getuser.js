
export const SET_USER = 'SET_USER';


export const setData = (id) => {
  return async dispatch => {
    // any async code you want!
      
      dispatch({ type: SET_USER, gotuser: id });
      


  };
};



