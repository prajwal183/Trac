export const SET_DATA = 'SET_DATA';

export const fetchData = (uid) => {
    return async dispatch => {
      // any async code you want!
      try {
        const response = await fetch(
          `https://trac-app-33528.firebaseio.com/firewall/${uid}.json`
        );
  
        if (!response.ok) {
          throw new Error('Unable to authenticate your device check your network connection!');
        }
    
        const resData = await response.json(); 
        console.log(resData);
        //console.log(resData.user[1].status);
    
        const loadedList = [resData.state];
    
    
        
        dispatch({ type: SET_DATA, adminData: loadedList });
        console.log(loadedList);
  
      } catch (err) {
        throw err;
      }
     
    };
  };
