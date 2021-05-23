import Instruction from '../../modals/Instructions';

export const SET_INSTRUCTIONS = 'SET_INSTRUCTIONS';

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
          new Instruction(
            resData.user[i].time,
            resData.user[i].message,
          
          )
        );
  
      }
      
      dispatch({ type: SET_INSTRUCTIONS, inslist: loadedList });
      console.log(loadedList);

    } catch (err) {
      throw err;
    }
   
  };
};