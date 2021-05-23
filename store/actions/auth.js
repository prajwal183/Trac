import  AsyncStorage  from '@react-native-community/async-storage';
import * as scriptActions from '../actions/script';


export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
    return async dispatch => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA8QF5y_pwRhFjflME6qnotaT104MW9MwE',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'The entered email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'The Password entered is not valid!';
        }
        throw new Error(message);
      }
  
      const resData = await response.json();

      await dispatch (scriptActions.setscripts(resData.localId));

     
      dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
      saveDataToStorage(resData.idToken, resData.localId);
    };
  };
  

const saveDataToStorage = (token, userId) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token: token,
      userId: userId
    })
  );
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};