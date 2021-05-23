import React, { useState } from 'react';
import {
  Text, View, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback
  , Keyboard, ActivityIndicator, Alert
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/HeaderButton';

import Colors from '../../constants/Colors';
import LogButton from '../../components/LogButton';

import Card from '../../components/Card';

const SendInsScreen = props => {

  const employees = useSelector(state => state.empState.availableList);
  const scripts = useSelector(state => state.scriptState.scripts);


  const [ins, setIns] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = () => {
    if (ins != '') {


      setIsLoading(true);
      //POST json
      const dataToSend = { action:'iadd',message: ins };

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
        .then(response => response.json())
        //If response is in json then in success
        .then(responseJson => {
          Alert.alert('Instruction Added', 'Your Instruction was Added Succesfully', [{ text: 'Okay' }]);
          setIsLoading(false);
          //console.log(responseJson);
          setIns("");


        })
        //If response is not in json then in error
        .catch(error => {
          alert('Could not add Instruction!');
          //console.error(error);
        });

      for (const Employee of employees) {
        const pushToken = Employee.pushToken;

        fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            to: pushToken,
            title: 'Administrator!',
            body: ins
          })
        });
      }


    }
    else {
      alert('Please Enter Instruction to send');
    }

  };
  if (scripts.designation == 'admin') {
    return (
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
        }}
        >
          <View style={styles.screen}>
            <Card style={styles.card}>
              <Text style={styles.header}>Instruction</Text>
              <TextInput style={styles.textInput} multiline={true}
                placeholder='Type your instruction here...'
                onChangeText={text => setIns(text)}
                value={ins} />
              <Text style={styles.label1}>Click send to add instruction</Text>

              {isLoading ? <ActivityIndicator size='small' color={Colors.primaryColor} /> :
                <LogButton title='Send >>>' style={styles.button}
                  onPress={() => { submitHandler() }} />}



            </Card>

          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    )
  }
  else {
    return (
      <View style={styles.second}>
        <Text style={styles.text}>You are not authorized to add Instructions!</Text>
      </View>
    )
  }
};


SendInsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Add Instruction',
    headerStyle: {
      backgroundColor: '#633689'
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='ios-send' />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='menu' iconName='md-menu' onPress={() => {
          navData.navigation.toggleDrawer()
        }} />
      </HeaderButtons>
    )

  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  label: {
    fontFamily: 'roboto700',
    fontSize: 16,
    marginLeft: '5%',
    marginTop: '5%',
    color: Colors.primaryColor,
  },
  textInput: {
    //marginLeft:'5%',
    //marginRight:'5%',
    color: "black",
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    lineHeight: 16,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    paddingTop: 14,
    paddingBottom: 8,
    paddingLeft: 8,
    height: 200,
    textAlignVertical: 'top'
  },
  button: {
    width: 100,
    height: 50,
    marginTop: '5%',
    marginRight: '5%',
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(56,203,59,1)',
    borderRadius: 15,
    elevation: 8
  },
  label1: {
    fontFamily: 'roboto',
    fontSize: 10,
    marginLeft: '5%',
    marginTop: '5%',
    color: 'black',
  },
  second: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    alignSelf: 'center'
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
    alignSelf: 'flex-start',
    marginBottom: '2%'
  },

});

export default SendInsScreen;
