import React, { useState,useEffect } from 'react';

import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import * as Notifications from 'expo-notifications';
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import { useKeepAwake } from 'expo-keep-awake';

const LOCATION_TRACKING = 'location-tracking';





import Navigator from './navigation/navigator';
import EmployeeReducer from './store/reducers/employee';
import VehicleReducer from './store/reducers/Vehicles';
import InstructionReducer from './store/reducers/Instructions';
import ReportReducer from './store/reducers/Reports';
import LocationReducer from './store/reducers/UserLocation';
import AuthReducer from './store/reducers/auth';
import idReducer from './store/reducers/getuser';

import startReducer from './store/reducers/start';
import scriptReducer from './store/reducers/script';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return { shouldShowAlert: true, shouldPlaySound: true };
  },
});


const rootReducer = combineReducers({
  empState: EmployeeReducer,
  vehState: VehicleReducer,
  insState: InstructionReducer,
  repState: ReportReducer,
  locState: LocationReducer,
  authState: AuthReducer,
  idState: idReducer,
  startState: startReducer,
  scriptState: scriptReducer

});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));


const fetchFonts = () => {
  return Font.loadAsync({
    'roboto700': require('./assets/fonts/roboto-700.ttf'),
    'roboto': require('./assets/fonts/roboto-regular.ttf')
  });
}

export default function App() {

  useKeepAwake();

  const [fontLoaded, setFontLoaded] = useState(false);
  const [uidData, setuidData] = useState('');
  const startLocationTracking = async () => {
    const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      if(!userData){
        console.log('no data')
      }
      else{
        const userscript = await AsyncStorage.getItem('userScripts');
        console.log(userscript);
        const transformedscripts = JSON.parse(userscript);
        console.log(transformedscripts.resData.designation);
        if(transformedscripts.resData.designation=='admin'){
console.log('admin');
        }
        else{
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;
        console.log(userId);
        setuidData(userId);
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 300000,
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: 'You are Live',
        notificationBody: 'Live Location enabled!',
      }
    });
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log('tracking started?', hasStarted);
      }
    }
  };

  useEffect(() => {
    const config = async () => {
      let res = await Permissions.askAsync(Permissions.LOCATION);
      if (res.status !== 'granted') {
        console.log('Permission to access location was denied');
      } else {
        console.log('Permission to access location granted');
      }
    };

    config();
  }, []);

  
        startLocationTracking();
      
      



  if (!fontLoaded) {
    return <AppLoading onError={()=>{console.log('error')}} startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
  }

  return (
    <Provider store={store}>
      <Navigator />
    </Provider>
  )
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.log('LOCATION_TRACKING task ERROR:', error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;

    console.log(
      `${new Date(Date.now()).toLocaleString()}: ${lat},${long}`
    );
    const userData = await AsyncStorage.getItem('userData');
    const transformedData = JSON.parse(userData);
    const { token, userId } = transformedData;

    const userscript = await AsyncStorage.getItem('userScripts');

    const transformedscripts = JSON.parse(userscript);
    console.log(transformedscripts);
    
    const dataToSend = {action:'live', userid: userId, lat: lat, long: long};

    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    //POST request
    fetch(transformedscripts.resData.trac, {
      method: 'POST', //Request Type
      body: formBody, //post body
      headers: {
        //Header Defination
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.text())
      //If response is in json then in success
      .then(responseText => {
      
        console.log(responseText);

      })
      //If response is not in json then in error
      .catch(error => {
        alert('Could not load location, Check network connection!');
        console.error(error);
      });

  }
});
