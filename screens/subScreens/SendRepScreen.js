import React, { useState,useEffect } from 'react';
import {
  Text, View, StyleSheet, TextInput, ScrollView, TouchableWithoutFeedback
  , Keyboard, StatusBar, ActivityIndicator, Alert,Button,Vibration
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import HeaderButton from '../../components/HeaderButton';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {Audio} from 'expo-av';


import Colors from '../../constants/Colors';
import LogButton from '../../components/LogButton';
import Card from '../../components/Card';
import ShareButton from '../../components/ShareButton'; 

const SendRepScreen = props => {

  const [rep, setRep] = useState('');
  const [isLoading, setIsLoading] = useState('');
  const [hasPermission, setHasPermission] = useState(null);

  const [scanned, setScanned] = useState(false);
  const [dataread, setDataread] = useState('');
  const [scan,setScan] = useState(false)

  const loc = useSelector(state => state.locState.fetchedLocation);

  // const userName = useSelector(state =>  state.nameState.name);
  const uid = useSelector(state => state.idState.user);
  const employees = useSelector(state => state.empState.availableList);
  const scripts = useSelector(state => state.scriptState.scripts);

  const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/beep.mp3')
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync(); }

  useEffect(() => {
    
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;

  }, [sound]);

  const handleBarCodeScanned = ({ type, data }) => {
    setDataread(data);
    Vibration.vibrate();
    playSound();
    setRep(data);
    setScan(false);
    setScanned(false);
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const submitHandler = () => {
    if (rep != '') {


      setIsLoading(true);
      //POST json
      const dataToSend = { action:'radd',userid: uid[0], username: uid[1], message: rep, lat: loc[0], long: loc[1], address: loc[2] };

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
          Alert.alert('Report Added', 'Your Report was submitted succesfully!', [{ text: 'Okay' }]);
          setIsLoading(false);
          console.log(responseJson);
          setRep("");

        })
        //If response is not in json then in error
        .catch(error => {
          alert('Could not add the report please try again!');
          console.error(error);
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
            title: uid[1] + ' reported on duty!',
            body: rep
          })
        });
      }


    }
    else {
      alert('Please Enter Report to send');
    }

  };


if(scan ==true){
  return (
    <View
      style={{
        flex: 1,
      }}>
        {isLoading ? <View style ={styles.loadView}>
          <Text style = {styles.loadText}>IN-Scanning the employee ...</Text>
          <ActivityIndicator size= 'small' color='blue'/>
        </View>:<Text style={styles.text}>Place the Barcode inside the box</Text>}
        <Text style={styles.text}>Last Scanned Shipment or Invoice: {dataread}</Text>
      
      <View style ={styles.scanner}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      </View>

      <Button title={'Back'} onPress={() => setScan(false)} />
    </View>
  );
}

else{
  return (
    
      <TouchableWithoutFeedback onPress={() => {
        Keyboard.dismiss();
      }}
      >
        <View style={styles.screen}>
          <ScrollView>
          <Card style={styles.card}>
            <Text style={styles.header}>Report</Text>
            <TextInput style={styles.textInput} multiline={true}
              placeholder='Type your report here...'
              onChangeText={text => setRep(text)}
              value={rep} />
            <Text style={styles.label1}>Click send to add report </Text>
            <Text style={styles.label1}>Click Barcode icon to scan Shipments or invoices </Text>
            {isLoading ? <ActivityIndicator size='small' color='blue' /> : <LogButton title='Send >>>' style={styles.button}
              onPress={() => { submitHandler() }} />}

          </Card>
</ScrollView>

          <ShareButton
                iconName="share-variant1"
                icon="barcode"
                style={styles.sharebutton}
                onPress ={() =>setScan(true)}
            ></ShareButton>
        </View>
      </TouchableWithoutFeedback>
    
  )
    }
};


SendRepScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Report to Admin',
    headerStyle: {
      backgroundColor: Colors.VoiletbuttonColor
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
    color: Colors.VoiletbuttonColor,
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
    borderColor: Colors.VoiletbuttonColor,
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
    elevation:8
  },
  label1: {
    fontFamily: 'roboto',
    fontSize: 10,
    marginLeft: '5%',
    marginTop: '5%',
    color: 'black',
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
  second: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 12,
    alignSelf: 'center'
  },
  sharebutton: {
    position:'absolute',
    height: 56,
    width: 56,
    backgroundColor: "red",
    elevation: 8,
    right:25,
    bottom:15

},
scanner:{
  flex: 1,
  justifyContent:'center',
  alignItems:'center',
  marginTop:'5%',
  marginBottom:'10%',


},
text:{
  margin:"2%",
  alignSelf:'center',
  fontSize:15,
  fontFamily:'roboto',
  color:'black'
},
loadView:{
  alignSelf: 'center',
  marginTop:'2%'
},
loadText:{
fontSize:15,
alignSelf: 'center',
fontFamily:'roboto',
color:'black'
}
});

export default SendRepScreen;

