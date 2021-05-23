import Report from '../../modals/Report';

export const SET_REPORTS = 'SET_REPORTS';

export const fetchData = (url) => {
  return async dispatch => {
    // any async code you want!
    try {
      const response = await fetch(
        url
      );

      if (!response.ok) {
        throw new Error('Server Down!');
      }
  
      const resData = await response.json();
      console.log(resData);
  
      const loadedList = [];
  
      for (i=0;i<resData.user.length;i++) {
        loadedList.push(
          new Report(
            resData.user[i].userid,
            resData.user[i].time,
            resData.user[i].username,
            resData.user[i].message,
            resData.user[i].lat,
            resData.user[i].long,
            resData.user[i].address,
          
          
          )
        );
  
      }
      
      dispatch({ type: SET_REPORTS, replist: loadedList });
      console.log(loadedList);

    } catch (err) {
      throw err;
    }
   
  };
};