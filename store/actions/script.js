export const SET_SCRIPTS = 'SET_SCRIPTS';

export const setscripts = (scriptData) => {
    return async dispatch => {
    
        try{
        dispatch({ type: SET_SCRIPTS, adminData: scriptData });
        ;
  
      } catch (err) {
        throw err;
      }
     
    };
  };
