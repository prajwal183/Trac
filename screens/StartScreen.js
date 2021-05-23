import React, { useEffect, useState } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
 
  Image,
  Text, ScrollView, StatusBar
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';


import StartButton from '../components/startButton';
import Card from '../components/Card';
import * as startActions from '../store/actions/start';
import * as authActions from '../store/actions/auth';

const StartScreen = props => {

  const [note, setNote] = useState('Please wait while we authenticate your device....')
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loginState = useSelector(state => state.startState.credData);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadData = async () => {

      const userData = await AsyncStorage.getItem('userData');
      //console.log(userData);
      

      if(!userData){
        props.navigation.navigate("Auth1")
      }
      else{
        const transformedData = JSON.parse(userData);
      const { token, userId } = transformedData;
      setIsLoading(true);
      try {
        
        await dispatch(startActions.fetchData(userId));

      } catch (err) {
        setError(err.message);
        console.log(error);

      }
      setNote('Click Next to continue');
      setIsLoading(false);
    }
    };
    loadData();

  }, [dispatch]);

  const tryLogin = async () => {
    setIsLoading(true);
   
    //console.log(userData);
    if (loginState == 'LOGIN') {
   
    
        props.navigation.navigate('userlocation')
    
    }
    else if (loginState == 'LOGOUT') {
      await dispatch(authActions.logout());
      props.navigation.navigate('Auth1');

    }
    else {
      props.navigation.navigate('Error1')
    }

  }




  return (
    
    
      <View style={styles.screen}>
        <ScrollView>
        <StatusBar barStyle="dark-content" backgroundColor="white" />


        <Image
          source={require('../assets/logoi.png')} style={styles.image} />


    
      <Card style={styles.card}>
        <View style={styles.textbox}>
        <Text style={styles.details}>Powered By</Text>
        <Image
          source={require('../assets/flyer.png')} style={styles.image1} />
          
      
          
          <Text style={styles.note}>{note}</Text>
        </View>

      
      </Card>



      </ScrollView>
      {isLoading ? <View style={styles.indicator}><ActivityIndicator size='small' color='blue' /></View> : <StartButton style={styles.button} title='Next >>>' onPress={() => {
          tryLogin()

        }} />}

      </View>


   
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,

  },
  upperView: {
    flex: 1,
    backgroundColor: "white",

  },

  lowerView: {
    flex: 2,
    backgroundColor: "#5257F2",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 20

  },
  image: {
    height: 145,
    width: 250,
    alignSelf: 'center',
    marginTop: '8%'
  },
  image1: {
    height: 145,
    width: 280,
    alignSelf: 'center',
    marginTop: '8%'
  },
  title: {
    alignSelf: 'center',
    marginBottom: '2%',
    fontFamily: 'roboto700',
    color: '#1e3799',
    fontSize: 13
  },
  textbox: {
    marginTop: '2%',
    marginLeft: 2
  },
  details: {
    color: 'black',
    fontFamily:'roboto',
    fontSize:12
  },
  note: {
    alignSelf: 'center',
    color: 'black',
    fontFamily: 'roboto',
    fontSize: 10,
    margin: '5%'
  },
  button: {
    position:'absolute',
    height: 50,
    width: 100,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: 'red',
    right:20,
    bottom:30
  },
  card: {
    margin: '5%',
    borderRadius: 5,
    shadowOffset: {
      width: 3,
      height: 3
    },
    elevation: 8,
    shadowOpacity: 0.77,
    shadowRadius: 0,
    padding:2
  },
  indicator:{
    margin: '5%',
    height: 50,
    width: 100,
    alignSelf:'center'

  }




});

export default StartScreen;
