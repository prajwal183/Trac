import React, { useState } from "react";
import {
  Text, StyleSheet, View, StatusBar, ScrollView, Linking,
  TouchableWithoutFeedback, Keyboard
} from "react-native";
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/HeaderButton';
import MaterialButtonShare1 from "../../components/MaterialButtonShare1";
import Card from '../../components/Card';
import IconTextbox from '../../components/IconTextbox';
import Colors from '../../constants/Colors';


const AddVehicleScreen = props => {


  const scripts = useSelector(state => state.scriptState.scripts);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vehno, setVehno] = useState('');
  const [driver, setDriver] = useState('');
  const [mob, setmob] = useState('');

  const openWhatsApp = () => {




    const msg =
      '*Add Vehicle*\n*_Vehicle No.-_* ' + vehno + '\n*_Driver Name-_* ' + driver +
      '\n*_Employee email-_* ' + email + '*_Mobile_*-'+mob+'\n*_Selected Password-_* ' + password + '\n*_Enter admin email to proceess your requirement-_* ';


    const mobile = '9611962259';

    let url =
      "whatsapp://send?text=" +
      msg +
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

  if (scripts.designation == 'admin') {
    return (
     
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}
        >

          <View style={styles.container}>
          <ScrollView>


            <Card style={styles.card}>


              <Text style={styles.header}>Add Vehicle</Text>


              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="truck-fast"
                inputStyle="Vehicle Number"
                style={styles.materialIconTextbox3}
                onChangeText={text => setVehno(text)}

              ></IconTextbox>

              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="account-box-multiple"
                inputStyle="Driver Name"
                style={styles.materialIconTextbox3}
                onChangeText={text => setDriver(text)}

              ></IconTextbox>

              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="mail"
                inputStyle="email Id"
                style={styles.materialIconTextbox4}
                onChangeText={text => setEmail(text)}

              ></IconTextbox>

              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="phone"
                inputStyle="Mobile number"
                style={styles.materialIconTextbox5}
                onChangeText={text => setmob(text)}

              ></IconTextbox>
               <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="lock"
                inputStyle="Select a Password"
                style={styles.materialIconTextbox5}
                onChangeText={text => setPassword(text)}

              ></IconTextbox>

              <Text style={styles.footer}>Click the whatsapp button to send to our servers to process your requirement</Text>
            </Card>
         
              </ScrollView>

              <MaterialButtonShare1
              iconName="share-variant"
              icon="whatsapp"
              style={styles.materialButtonShare1}
              onPress={() => { openWhatsApp() }}
            ></MaterialButtonShare1>
          </View>
        </TouchableWithoutFeedback>
    

    );

  }

  else {
    return (
      <View style={styles.second}>
        <Text style={styles.text}>You are not authorized to add Vehicle!</Text>
      </View>
    )
  }
};


AddVehicleScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add a Vehicle',
    headerStyle: {
      backgroundColor: Colors.VoiletbuttonColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-bus' />
      </HeaderButtons>
    ),


  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  materialIconTextbox: {
    height: 53,
    width: '95%',
    alignSelf: 'center'
  },
  materialIconTextbox2: {
    height: 53,
    width: '95%',
    alignSelf: 'center'

  },
  materialIconTextbox3: {
    height: 53,
    width: '95%',
    alignSelf: 'center'
  },
  materialIconTextbox4: {
    height: 53,
    width: '95%',
    alignSelf: 'center'
  },
  materialIconTextbox5: {
    height: 53,
    width: '95%',
    alignSelf: 'center'
  },
  materialButtonShare1: {
    position:'absolute',
    height: 56,
    width: 56,
    backgroundColor: 'rgba(56,203,59,1)',
    right:20,
    bottom:10
  

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
    shadowRadius: 0
  },
  header: {
    fontSize: 20,
    fontFamily: 'roboto700',
    color: '#f7287b',
    alignSelf: 'center',
    margin: '2%'
  },
  footer: {
    fontSize: 12,
    fontFamily: 'roboto',
    color: 'black',
    alignSelf: 'center',
    margin: '2%'
  },
  second: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    alignSelf: 'center'
  }
});

export default AddVehicleScreen;