import React, { useEffect, useState, } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar, Image, ActionSheetIOS } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-community/async-storage';


import * as Permissions from 'expo-permissions';

import Colors from '../../constants/Colors';
import * as LocationActions from '../../store/actions/UserLocation';
import * as getActions from '../../store/actions/getuser';

import LogButton from '../../components/LogButton';
import * as scriptActions from '../../store/actions/script';






const UserLocationScreen = props => {

  const dispatch = useDispatch();
  const [data, setData] = useState('');
  const [uidData, setuidData] = useState('');


  const [isLoading, setIsLoading] = useState(false);
  const loc = useSelector(state => state.locState.fetchedLocation);

  const scripts = useSelector(state => state.scriptState.scripts);


  useEffect(() => {
    const loadLocation = async () => {
      
      try {
        await dispatch(LocationActions.fetchLocation());

      } catch (err) {

        alert('Could not update location,Check Network connection!');

      }
      const userData = await AsyncStorage.getItem('userData');
      console.log(userData);
      const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      setuidData(userId);
      //console.log(userId);
      





      const userata = await AsyncStorage.getItem('username');
      console.log(userata);
      const transformedata = JSON.parse(userata);
      const { empname } = transformedata;
      //console.log(empname);
      setData(empname);
      

      const userscript = await AsyncStorage.getItem('userScripts');
      console.log(userscript);
      const transformedscripts = JSON.parse(userscript);
      console.log(transformedscripts);
      await dispatch(scriptActions.setscripts(transformedscripts.resData));
      



      //console.log(empname);


     // console.log(data);


  



    };
    setIsLoading(true);
    loadLocation().then(()=>
    {
      setIsLoading(false);
    })
   

  }, [dispatch]);

  const submitHandler = async () => {

    setIsLoading(true);
    try {
      let data1 = [uidData, data]
      console.log(data1)
      await dispatch(getActions.setData(data1));

      //await dispatch(nameActions.setUser(data));
    }

    catch (err) {
      console.log('uid or data error')
    }

    let pushToken1;
    let statusObj = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    if (statusObj.status !== 'granted') {
      statusObj = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    }
    if (statusObj.status !== 'granted') {
      pushToken1 = null;
    } else {
      pushToken1 = (await Notifications.getExpoPushTokenAsync({experienceId:'@prajwal183/trac_batch01'})).data;

    }

    console.log('push')
    console.log(pushToken1);


    if(scripts.designation=='driver'){
        var actionType = 'vadd'
    }

    else{
      var actionType = 'eadd'
    }



    const dataToSend = {action:actionType, userid: uidData, lat: loc[0], long: loc[1], address: loc[2], pushToken: pushToken1 };

    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      const encodedKey = encodeURIComponent(key);
      const encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    //POST request
    fetch(scripts.trac, {
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
        props.navigation.navigate('drawer')
        console.log(responseText);

      })
      //If response is not in json then in error
      .catch(error => {
        alert('Could not load location, Check network connection!');
        console.error(error);
      });



  };


  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />
      <Image
        source={require('../../assets/images/placeholder.png')} style={styles.image} />
      {isLoading ? <View>
        <ActivityIndicator size='small' color='blue' />
        <Text style={styles.text}>Please wait! while we load your current Location</Text>
      </View> : <View><Text style={styles.text}>You are all set to go!</Text>
          <LogButton title='Next>>'
            style={styles.button}
            onPress={() => {
              submitHandler()
            }} />
        </View>}
    </View>
  )
};


UserLocationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Getting Location',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',

  };
};


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontFamily: 'roboto',
    fontSize: 10,
    alignSelf: 'center'
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: '#0652dd',
    elevation: 8,
    margin: 5
  },
  image: {
    height: 80,
    width: 80,
    margin: '5%'
  }

});


export default UserLocationScreen;