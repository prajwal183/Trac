import Vehicle from '../../modals/Vehicle';

export const SET_VEHICLES = 'SET_VEHICLES';

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
          new Vehicle(
            resData.user[i].userid,
            resData.user[i].vehno,
            resData.user[i].drivername,
            resData.user[i].time,
            resData.user[i].lat,
            resData.user[i].long,
            resData.user[i].address,
            resData.user[i].mob
          )
        );
  
      }
      
      dispatch({ type: SET_VEHICLES, vehlist: loadedList });
      console.log(loadedList);

    } catch (err) {
      throw err;
    }
   
  };
};