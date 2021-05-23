import React, { useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Linking, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import ShareButton from '../components/ShareButton';

import Card from '../components/Card';
import LogButton from '../components/LogButton';

const InsdetailsScreen = props =>{

    const [isOpening, setIsopening] = useState(false);

    const Time = props.navigation.getParam('timeparam');
    const selectedProduct = useSelector(state => state.insState.availableList.find(ins => ins.time === Time));
    const scripts = useSelector(state => state.scriptState.scripts);

    const openWhatsApp = () => {
  
        const msg = `*Administrator*-\n*Time*-${selectedProduct.time}\n
        *Report*-${selectedProduct.message}\n
        `

        
            let url =
              "whatsapp://send?text=" +
            msg;
            Linking.openURL(url)
              .then(data => {
                console.log("WhatsApp Opened successfully " + data);
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");
              });
            };
    
            const deleteEmployee = () =>{
              
    
              if(scripts.designation =='admin'){
              setIsopening(true);
              //POST json
              const dataToSend = {action:'idel', id:selectedProduct.time };
            
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
                  alert(responseText);
                  props.navigation.pop();
                  setIsopening(false);
                  console.log(responseText);
                })
                //If response is not in json then in error
                .catch(error => {
                  alert('Something went wrong try again');
                  console.error(error);
                });}
                else {
                  alert('Only Administrator can delete Instructions')
                }
             };
  
    return (
   
        <View style={styles.screen}>
           
          <View style={styles.icon}>
            <Image
              source={require('../assets/images/notebook.png')} style={styles.image} />
  
          </View>
          <ScrollView style={styles.screen}>
          <Card style={styles.card}>
          <View style={styles.bio}>
              <View style = {styles.id}>
            <Text style={styles.biotext}>
              Instruction by :
            </Text>
          
    
            <Text style={styles.TextHeaders}>
              Administrator
            </Text>
            </View>
  
            <View style = {styles.name1}>
            <Text style={styles.biotext}>
              Time :
            </Text>
          
    
            <Text style={styles.TextHeaders1}>
              {selectedProduct.time}
            </Text>
  
  
            </View>
  
            </View>
  
  
         
            <Text style={styles.biotext}>
             Instruction :
            </Text>
            <Text style={styles.loc}>
             {selectedProduct.message}
            </Text>
  
           
            {isOpening ? <ActivityIndicator size='small' color={Colors.pinkButtonColor}
            /> :<View></View>}
          </Card>
          </ScrollView>
  
          <ShareButton
                  iconName="share-variant"
                  icon="whatsapp"
                  style={styles.sharebutton}
                  onPress ={() =>openWhatsApp()}
              ></ShareButton>
  
  {isOpening ? <View></View>:  <ShareButton
                  iconName="share-variant1"
                  icon="delete"
                  style={styles.sharebutton1}
                  onPress ={() =>deleteEmployee()}
              ></ShareButton>}
              
  
        </View>
  
    )
  
};

InsdetailsScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Instruction details',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: 'white',
  
    };
  };

  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: Colors.primaryColor
    },
    icon: {
      alignSelf: 'center',
      marginTop: 10,
      borderWidth: 5,
      borderRadius: 15,
      borderColor: 'white',
      backgroundColor: 'white'
  
    },
    text: {
      fontFamily: 'roboto',
      fontSize: 15
    },
    card: {
      width: '90%',
      alignSelf: 'center',
      marginTop: 5,
      padding: 30,
    },
    button: {
      backgroundColor: Colors.pinkButtonColor,
      borderRadius: 5,
      height: 50,
      marginTop: 20,
  
  
    },
    image: {
      width: 30,
      height: 30,
      alignSelf: 'center',
      margin: '2%'
    },
    bio:{
      flexDirection:'row'
    
    },
    biotext:{
      marginTop:3,
      fontFamily:'roboto',
      fontSize:12,
      color:'black'
    },
    id:{
      flex: 1.5
    },
    name1:{
      flex:2
    },
    loc:{
      fontSize:13,
      fontFamily:'roboto700',
      color:'black'
  
    },
    TextHeaders:{
      fontSize: 16,
      fontFamily: 'roboto700',
      color:'black'
    },
    TextHeaders1:{
      fontSize: 15,
      fontFamily: 'roboto700',
      color:'red'
    },
    latlong:{
      fontFamily:'roboto700',
      fontSize:13,
      color:'#3742fa'
    },
    sharebutton: {
      position:'absolute',
      height: 56,
      width: 56,
      backgroundColor: "rgba(56,203,59,1)",
      elevation: 8,
      right:20,
      bottom:10
     
  
  },
  sharebutton1: {
    position:'absolute',
      height: 56,
      width: 56,
      backgroundColor: "red",
      elevation: 8,
      left:20,
      bottom:10
  
  },
  add:{
    fontSize:12,
    fontFamily:'roboto700',
    color:'#7f8fa6',
  
  }
  
  });

  export default InsdetailsScreen;