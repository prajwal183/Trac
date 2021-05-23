import React, { useState } from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Button, Linking, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '../components/Card';
import LogButton from '../components/LogButton';
import ShareButton from '../components/ShareButton';

const VehDetailsScreen = props => {
  const [isOpening, setIsopening] = useState(false);
  const Vehicleno = props.navigation.getParam('vehicleno');
  const selectedProduct = useSelector(state => state.vehState.availableList.find(veh => veh.VehicleNo === Vehicleno))

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
  
    const msg = `*Vehicle No.*-${selectedProduct.VehicleNo}\n*Driver Name*-${selectedProduct.driverName}\n
    *Time*-${selectedProduct.time}\n*Latitude*-${selectedProduct.lat}\n*Longitude*-${selectedProduct.long}\n
    *Location*-${selectedProduct.address}`
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
            source={require('../assets/images/truck.png')} style={styles.image} />

        </View>
        
        <Card style={styles.card}>
        <View style={styles.bio}>
            <View style = {styles.id}>
          <Text style={styles.biotext}>
            Vehicle No. :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {selectedProduct.VehicleNo}
          </Text>
          </View>

          <View style = {styles.name1}>
          <Text style={styles.biotext}>
            Driver Name :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {selectedProduct.driverName}
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

          <Text style={styles.loc}>
            {selectedProduct.address}
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

      </View>
    
  )
}

VehDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Vehicle Details',
    headerStyle: {
      backgroundColor: Colors.VoiletbuttonColor
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
    backgroundColor: Colors.VoiletbuttonColor
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
    width: 40,
    height: 40,
    alignSelf: 'center',
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
  loc12:{
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
loc:{
  fontSize:13,
  fontFamily:'roboto700',
  color:'#7f8fa6'

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




});

export default VehDetailsScreen;