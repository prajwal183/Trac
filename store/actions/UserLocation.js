export const SET_LOCATION = 'SET_LOCATION';
import * as Location from 'expo-location';
import { LocationAccuracy } from 'expo-location';
import * as Permissions from 'expo-permissions';
import {Alert} from 'react-native'

export const fetchLocation = () => {
   

    return async dispatch => {
      // any async code you want!
        const verifyPermissions = async() => {
            const result = await Permissions.askAsync(Permissions.LOCATION);
            if (result.status !== 'granted') {
                Alert.alert(
                    'Insufficient permissions!',
                    'You need to grant Location permissions to use this app.',
                    [{text: 'Okay'}]
                );
                return false;
            }
        return true;
     };
      const hasPermission = await verifyPermissions();
      if (!hasPermission) {
         alert('did not get permissions')
          return;
      }
      try{

       const gotLocation =  await Location.getCurrentPositionAsync({timeout: 5000,accuracy:LocationAccuracy.Highest });
         console.log(gotLocation);
         
         const lat = gotLocation.coords.latitude;
         const long = gotLocation.coords.longitude;
         console.log(lat)
         console.log(long)
         
         const reversecode = await Location.reverseGeocodeAsync({latitude:lat,longitude:long});
        
         console.log(reversecode);
         function clean(obj) {
             for (var propName in obj){
                 if (obj[propName] ===null || obj[propName] === undefined){
                     delete obj[propName];
                 }
             }
         };

        clean(reversecode[0]);
         console.log(reversecode[0]);
        


        const newadd = [];
           for (let key in reversecode[0]){
                   newadd.push( reversecode[0][key])
           };

           const address = newadd.toString();
           console.log(address);
          const FetchedLocation = [];
          FetchedLocation.push(lat);
          FetchedLocation.push(long);
          FetchedLocation.push(address);
          console.log(FetchedLocation);
          

          dispatch({ type: SET_LOCATION, locatedlist: FetchedLocation });

      } catch (err) {
          Alert.alert('Could not fetch location!',
          'Please Restart App or grant permission',[{text:'Okay'}]);
      }
       };
     
    };