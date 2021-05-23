
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
// import all the components we are going to use
import { SafeAreaView, StyleSheet, TextInput, Text, View } from 'react-native';
import WebView from 'react-native-webview';

//Import library for Speedometer
import RNSpeedometer from 'react-native-speedometer';
import Colors from '../constants/Colors';

const SpeedometerScreen = props =>{
    const [meterValue, setMeterValue] = useState(20);
    const empId = props.navigation.getParam('user');
  const selectedProduct = useSelector(state => state.empState.availableList.find(emp => emp.userid === empId));

  const Navigationhandler=(url)=>{
            alert('state');
  }

    useEffect(() => {
        function degreesToRadians(degrees) {
            return degrees * Math.PI / 180;
          }
          
          function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
            var earthRadiusKm = 6378;
          
            var dLat = degreesToRadians(lat2-lat1);
            var dLon = degreesToRadians(lon2-lon1);
          
            lat1 = degreesToRadians(lat1);
            lat2 = degreesToRadians(lat2);
          
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
            return earthRadiusKm * c;
          }

         const distance= distanceInKmBetweenEarthCoordinates(selectedProduct.lat,selectedProduct.long,selectedProduct.lastlat,selectedProduct.lastlong);

         console.log(distance);

         const speed = distance/selectedProduct.lasttime

         console.log(speed);
         if(speed==Infinity){
         setMeterValue(0);
         }
         else{
           setMeterValue(speed)
         }
        }
    )

    return (
      <SafeAreaView style={{ flex: 1,marginTop:10 }}>
        <View style={styles.container}>
          <RNSpeedometer

          
            value={meterValue}
            //value for Speedometer
            size={200}
            //Size of Speedometer
            minValue={0}
            //Min value for Speedometer
            maxValue={100}
            //Max value for Speedometer
            allowedDecimals={0}
            //Decimals value allowed or not
            labels={[
              {
                name: 'Slow and Steady',
                labelColor: '#00ff6b',
                activeBarColor: '#00ff6b',
              },
              {
                name: 'Medium Speed',
                labelColor: '#f4ab44',
                activeBarColor: '#f4ab44',
              },
              {
                name: 'High Speed',
                labelColor: '#ff2900',
                activeBarColor: '#ff2900',
              },
            ]}
            //Labels for the different steps of Speedometer
          />
          <View style={{ marginTop: 70, padding: 20 }}>
            <Text style={{ fontSize: 20 }}>
             Average Speed between 0 to 100
            </Text>
            <View style={{height:'80%'}}>
            <WebView  source={{
          uri: 'https://www.google.com/maps/search/?api=1&query=' + selectedProduct.lat + ',' + selectedProduct.long
        }}
        style={{ marginTop: 2,marginBottom:2, height:20}} 
        />
        <Text>Location Powered by Google</Text>
        </View>
          </View>
        </View>
      </SafeAreaView>
    );
} ;

SpeedometerScreen.navigationOptions = navData => {
    return {
      headerTitle: 'Speedometer',
      headerStyle: {
        backgroundColor: '#0652dd'
      },
      headerTintColor: 'white',
     
    };
  };
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    textInput: {
      height: 25,
      fontSize: 16,
      marginTop: 30,
      borderBottomWidth: 0.3,
      borderBottomColor: 'black',
    },
  });
  


export default SpeedometerScreen;