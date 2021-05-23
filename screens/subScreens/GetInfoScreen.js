import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, StatusBar } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';



import Colors from '../../constants/Colors';
import * as EmpActions from '../../store/actions/employee';

import * as scriptActions from '../../store/actions/script';

import LogButton from '../../components/LogButton';

const GetInfoScreen = props => {
  const dispatch = useDispatch();
  const [uid, setuid] = useState('');
  const localId = useSelector(state => state.scriptState.scripts);

  const selectedProduct = useSelector(state => state.empState.availableList.find(emp => emp.userid === uid));

  const [isLoading, setIsLoading] = useState(false);




  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {

        const response = await fetch(`https://trac-app-33528.firebaseio.com/${localId}.json`

        );

        if (!response.ok) {
          throw new Error('Server Down!');
          alert('error')
        }

        const resData = await response.json();
        console.log(resData);

        await dispatch(scriptActions.setscripts(resData));
        await AsyncStorage.setItem(
          'userScripts', JSON.stringify({
            resData
          })
        );

        await dispatch(EmpActions.fetchData(resData.name));

        const userData = await AsyncStorage.getItem('userData');
        //console.log(userData);
        const transformedData = JSON.parse(userData);
        const { token, userId } = transformedData;
        setuid(userId);
        //console.log(userId);
        setIsLoading(false);

      } catch (err) {

        //console.log(err.message)
        alert('Could not connect to servers')
        setIsLoading(true)

      }






    };


    loadData();



  }, [dispatch]);

  const submitHandler = async () => {
    

    await AsyncStorage.setItem(
      'username',
      JSON.stringify({
        empname: selectedProduct.name,
      })
    );
    props.navigation.navigate('userlocation')



    

  };



  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />

      {isLoading ? <View>
        <ActivityIndicator size='small' color='blue' />
        <Text style={styles.text}>getting your user information...</Text>
      </View> : <View style={styles.second}>
          <Text style={styles.secondText}>Click Next to continue!</Text>
          <LogButton title='Next >>>' style={styles.button}
            onPress={() => { submitHandler() }} />
        </View>}



    </View>

  )
};


GetInfoScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Getting Info',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',

  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'roboto',
    fontSize: 10
  },
  welcome: {
    fontFamily: 'roboto',
    fontSize: 20
  },
  username: {
    fontSize: 30,
    fontFamily: 'roboto700',
    color: '#1e3799'
  },
  button: {
    width: 100,
    height: 50,
    backgroundColor: Colors.primaryColor,
    borderRadius: 15,
    alignSelf: 'center'
  },
  second: {
    padding: 5,

  },
  secondText: {
    fontFamily: 'roboto',
    fontSize: 15,
    alignSelf: 'center',
    margin: '5%'
  }
});

export default GetInfoScreen;