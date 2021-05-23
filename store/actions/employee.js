import Employee from '../../modals/employee';

export const SET_EMPLOYEES = 'SET_EMPLOYEES';

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
          new Employee(
            resData.user[i].userid,
            resData.user[i].empid,
            resData.user[i].empname,
            resData.user[i].time,
            resData.user[i].lat,
            resData.user[i].long,
            resData.user[i].address,
            resData.user[i].pushToken,
            resData.user[i].mob,
            resData.user[i].lastlat,
            resData.user[i].lastlong,
            resData.user[i].lasttime,

          )
        );
  
      }
      
      dispatch({ type: SET_EMPLOYEES, emplist: loadedList });
      console.log(loadedList);

    } catch (err) {
      throw err;
    }
   
  };
};