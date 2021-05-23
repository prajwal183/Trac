import React, {useState,useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, 
    TouchableWithoutFeedback,StatusBar, Keyboard, Image,Linking, Alert,ActivityIndicator} from 'react-native';
    import { useDispatch } from 'react-redux';
    import { HeaderButtons, Item} from 'react-navigation-header-buttons';

import Card from '../components/Card';
import IconTextbox from '../components/IconTextbox';
import LogButton from '../components/LogButton';
import ShareButton from '../components/ShareButton';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';

const AuthScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [email, setEmail] = useState('');
  const [password , setPassword] = useState('');
  useEffect(() => {
    if (error) {
      Alert.alert('Authentication Error!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const dispatch = useDispatch();

  const authHandler = async () => {
    if (email != '') {
   
      if (password != '') {
    
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(authActions.login(email,password));
      props.navigation.navigate('info');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      console.log(error);
    }
  } else {
    alert('Please Enter valid Password!');
  }
} else {
  alert('Please Enter valid Email!');
}
  
  };

    const openWhatsApp = () => {
  
        const msg = '*I have a trouble signing-in or I want to register my other company email in TRAC application* \n _Type Below_ \n';
        const mobile = '9611962259'
        
            let url =
              "whatsapp://send?text=" +
            msg+
              "&phone=91" +
              mobile;
            Linking.openURL(url)
              .then(data => {
                console.log("WhatsApp Opened successfully " + data);
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");
              });
            };
    return (
        <TouchableWithoutFeedback onPress={() =>{
            Keyboard.dismiss();}}
            >
           
        <View style= {styles.screen}>
            
           <StatusBar barStyle="light-content" backgroundColor={Colors.primaryColor} />
           <Image 
            source={require('../assets/images/mit.png')} style={styles.image} />
           
            <Text style={styles.description}>
                With a vision to make technology accessible to every enterprise
        </Text>
        <ScrollView style = {styles.scroller}>
    
           <Card style= {styles.card}>
           <Text style ={styles.logintext}>Sign-In into our systems to continue </Text>
           <IconTextbox
            iconStyleName="calendar"
            iconStyle="factory"
            inputStyle="Company email"
            style={styles.IconTextbox1} 
            autoCapitalize="none" 
            onChangeText={text=> setEmail(text)} 
            
          ></IconTextbox>
    
          <IconTextbox
            iconStyleName="calendar"
            iconStyle="home-lock"
            inputStyle="Password"
            style={styles.IconTextbox2} 
            secureTextEntry = {true} 
            onChangeText={text=> setPassword(text)}
          ></IconTextbox>
          
          {isLoading ? <ActivityIndicator size= 'large' color='blue' style={styles.LogButton2} />:<LogButton style={styles.LogButton1} title='Sign in' onPress={authHandler} />}
          
          <Text style ={styles.cardtext}>for sign-in issues click Whatsapp icon below!</Text>
          </Card>
        
          
               </ScrollView>
               <ShareButton
                iconName="share-variant"
                icon="whatsapp"
                style={styles.sharebutton}
                onPress ={() =>openWhatsApp()}
            ></ShareButton>
            <ShareButton
                iconName="share-variant"
                icon="web"
                style={styles.sharebutton1}
                onPress ={() =>{Linking.openURL('https://themit.in')}}
            ></ShareButton>
              </View>
              </TouchableWithoutFeedback>
       
          
        
    );
};

AuthScreen.navigationOptions = navData =>{
  return{
  headerTitle: 'Log in',
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white',
};
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.primaryColor,
        flex:1

    },
    IconTextbox1: {
        height: 57,
        width: '90%',
        margin:5
        
      },
      IconTextbox2: {
        height: 57,
        width: '90%',
        margin: 5
        
      },
      card:{
        margin:'5%',
        marginTop:'2%'
      },
      LogButton1:{
        backgroundColor: Colors.pinkButtonColor ,
        height: 57,
        width:'90%',
        margin: 5,
        alignSelf: 'center',
        marginVertical:10,
        elevation:8
      },
      image: {
        height: '20%',
        width: '80%',
        alignSelf: 'center',
        marginTop: '2%'
    },
    title: {
        fontSize: 20, 
        fontFamily: 'roboto700',
        alignSelf: 'center',
        color: 'white'
    },
    description: {
        fontSize: 10,
        fontFamily: 'roboto',
        alignSelf: 'center',
        color: 'white'
    },
    logintext: {
        fontSize: 15,
        fontFamily: 'roboto700',
        alignSelf: 'center',
        color: 'blue',
    },
    cardtext:{
        fontSize: 10,
        alignSelf:"center"
    },
    scroller:{
        backgroundColor:Colors.primaryColor,
        
    },
    sharebutton: {
      position:'absolute',
        height: 56,
        width: 56,
        backgroundColor: "rgba(56,203,59,1)",
        elevation: 8,
  
        right:10,
        bottom:20

    },
    sharebutton1: {
      position:'absolute',
        height: 56,
        width: 56,
        backgroundColor: "red",
        elevation: 8,
      
        right:70,
        bottom:20

    },
    LogButton2:{
      height: 57,
      width:'90%',
      margin: 5,
      alignSelf: 'center',
      marginVertical:10,
      elevation:8
    },
});

export default AuthScreen;