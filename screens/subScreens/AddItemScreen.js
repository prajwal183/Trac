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

import { Ionicons } from '@expo/vector-icons';

const AddItemScreen = props => {

  const scripts = useSelector(state => state.scriptState.scripts);

  const [empid, setEmpid] = useState('');
  const [empname, setEmpname] = useState('');
  const [email, setEmail] = useState('');
  const [mob, setmob] = useState('');
  const [password, setPassword] = useState('');



  const openWhatsApp = () => {


    const msg =
      '*Add Employee*\n*_Employee Id-_* ' + empid + '\n*_Employee Name-_* ' + empname +
      '\n*_Employee email-_* ' + email + '\n*_Selected Password-_* ' + password + '\n*_Mobile_*-' + mob +'\n *_Enter admin email to proceess your requirement-_* ';




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


              <Text style={styles.header}>Add Employee</Text>

              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="account-box-multiple"
                inputStyle="Employee Id"
                style={styles.materialIconTextbox3}
                onChangeText={text => setEmpid(text)}

              ></IconTextbox>


              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="account-box-multiple"
                inputStyle="Employee Name"
                style={styles.materialIconTextbox3}
                onChangeText={text => setEmpname(text)}

              ></IconTextbox>


              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="mail"
                inputStyle="Email Id"
                style={styles.materialIconTextbox4}
                onChangeText={text => setEmail(text)}

              ></IconTextbox>

              <IconTextbox
                iconStyleName="calendar"
                inputStyle="Label"
                iconStyle="phone"
                inputStyle="Mobile Number"
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
        <Text style={styles.text}>You are not authorized to add Employee!</Text>
      </View>
    )
  }

};

AddItemScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add Employee',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='ios-contact' />
      </HeaderButtons>
    ),
    tabBarIcon: ({ tintColor, focused }) => (
      <Ionicons name='md-planet'
        size={focused ? 28 : 22}
        color={tintColor} />
    )

  }


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

export default AddItemScreen;