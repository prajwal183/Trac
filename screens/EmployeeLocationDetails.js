import React, { useState , useEffect} from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Button, Linking, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';



import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
//import {MaterialCommunityIcons} from '@expo/vector-icons';
import Card from '../components/Card';
import LogButton from '../components/LogButton';
import ShareButton from '../components/ShareButton';
import SpeedButton from '../components/speedButton';

const EmpDetailsScreen = props => {
  const [isOpening, setIsopening] = useState(false);
  const [geo,setGeo] = useState('');

  const empId = props.navigation.getParam('user');
  const selectedProduct = useSelector(state => state.empState.availableList.find(emp => emp.userid === empId))

  useEffect(()=>{
    
      const loadLocation = async () => {
    const reversecode = await Location.reverseGeocodeAsync({latitude:selectedProduct.lat,longitude:selectedProduct.long});
        
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
        setGeo(address);
    
     
    };
    loadLocation();
  },[])

  const openLocation = () => {
    setIsopening(true);

    let url = 'https://www.google.com/maps/search/?api=1&query=' + selectedProduct.lat + ',' + selectedProduct.long
    Linking.openURL(url)
      .then(data => {
        console.log("Maps google opened Sucessfully " + data);
        setIsopening(false);
      })
      .catch(() => {
        alert("Make sure google Maps installed on your device");
        setIsopening(false);
      });
    // openMap({latitude:40.778721 , longitude:-73.968188});
  };

  const openWhatsApp = () => {
  
    const msg = `*Employee Id*-${selectedProduct.empid}\n*Employee Name*-${selectedProduct.name}\n
    *Time*-${selectedProduct.time}\n*Latitude*-${selectedProduct.lat}\n*Longitude*-${selectedProduct.long}\n
    *Location*-${selectedProduct.address}
    `
    const mobile = '9611962259'
    
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

        const pressCall = () => {
          console.log(selectedProduct.mob)
          const url = 'tel:' + selectedProduct.mob 
          Linking.openURL(url)
        };

  return (
    <View style={styles.screen}>
   <ScrollView style={styles.screen}>
     
        <View style={styles.icon}>
          <Image
            source={require('../assets/images/user.png')} style={styles.image} />



        </View>
        
        <Card style={styles.card}>
        <View style={styles.bio}>
            <View style = {styles.id}>
          <Text style={styles.biotext}>
            Vehicle No. :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {selectedProduct.empid}
          </Text>
          </View>

          <View style = {styles.name1}>
          <Text style={styles.biotext}>
            Driver Name :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {selectedProduct.name}
          </Text>


          </View>

          </View>


       
          <Text style={styles.biotext}>
           Updated Time :
          </Text>
          <Text style={styles.TextHeaders1}>
           {selectedProduct.time}
          </Text>

          <Text style={styles.biotext}>
            Tracked Location :
          </Text>

          <Text style={styles.add}>
            {geo}
          </Text>
          
          <View style={styles.bio}>
            <View style = {styles.id}>
          <Text style={styles.biotext}>
            Latitude :
          </Text>
        
  
          <Text style={styles.latlong}>
            {selectedProduct.lat}
          </Text>
          </View>

          <View style = {styles.name1}>
          <Text style={styles.biotext}>
            Longitude :
          </Text>
        
  
          <Text style={styles.latlong}>
            {selectedProduct.long}
          </Text>


          </View>
         </View>
          
          {isOpening ? <ActivityIndicator size='small' color={Colors.pinkButtonColor}
          /> : <LogButton style={styles.button} title='Locate on Maps!'
            onPress={openLocation} />}
        </Card>

     
    </ScrollView>
    <ShareButton
                iconName="share-variant"
                icon="whatsapp"
                style={styles.sharebutton}
                onPress ={() =>openWhatsApp()}
            ></ShareButton>

<ShareButton
                iconName="share-variant1"
                icon="phone"
                style={styles.sharebutton1}
                onPress ={() =>pressCall()}
            ></ShareButton>
<SpeedButton
                iconName="share-variant1" 
                icon = "speedometer"
                style={styles.sharebutton2}
                onPress ={() =>props.navigation.navigate('speed', {user:selectedProduct.userid })}
            ></SpeedButton>

    </View>
  )
}

EmpDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Driver Details',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-locate' />
      </HeaderButtons>
    )
  };
};



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.primaryColor
  },
  icon: {
    alignSelf: 'center',
    marginTop: 10

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
    height: 40,
    width: 40,
    margin: '2%'
  },
  bio:{
    flexDirection:'row'
  
  },
  biotext:{
    marginTop:2,
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
    bottom:5

},
sharebutton1: {
  position:'absolute',
  height: 56,
  width: 56,
  backgroundColor: "blue",
  elevation: 8,
  right:20,
  bottom:65

},
sharebutton2: {
  position:'absolute',
  height: 90,
  width: 90,
  backgroundColor: "red",
  elevation: 8,
  left:20,
  bottom:25,
  borderRadius:50,
  

},
add:{
  fontSize:13,
  fontFamily:'roboto700',
  color:'#7f8fa6'
}


});


export default EmpDetailsScreen;