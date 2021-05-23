import React from "react";
import { StyleSheet, View, StatusBar, Text, Image, Linking ,ScrollView} from "react-native";
import IoniconsIcon from "react-native-vector-icons/Ionicons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import { HeaderButtons, Item} from 'react-navigation-header-buttons';
import {MaterialCommunityIcons} from '@expo/vector-icons';


import HeaderButton from '../components/HeaderButton';
import Card from "../components/Card";
import ShareButton from '../components/ShareButton';
import Colors from '../constants/Colors';


const AboutScreen = props => {
    const openWhatsApp = () => {
  
        const msg = '*Hello I am texting from the TRAC!*\n _Type your Text Below_ \n';
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
        <View style={styles.screen}>

             <StatusBar barStyle="dark-content" backgroundColor= 'white' /> 
            <Image 
            source={require('../assets/images/mit.png')} style={styles.image} />
            
            <Text style={styles.description}>
                With a vision to make technology accessible to every enterprise
        </Text>
        <ScrollView>
            <Card style={styles.card} >
                <View style={styles.iconRow}>
                    <MaterialIconsIcon
                        name="developer-mode"
                        style={styles.icon}
                    ></MaterialIconsIcon>
                    <Text style={styles.loremIpsum}>Designed for the specific requirement of the client, to get your own customizable solutions contact us</Text>
                </View>
                <View style={styles.icon2Row}>
                    <IoniconsIcon name="ios-mail-open" style={styles.icon2}></IoniconsIcon>
                    <Text style={styles.loremIpsum3}>team@themit.in</Text>
                </View>
                <View style={styles.icon3Row}>
                    <FontAwesomeIcon name="whatsapp" style={styles.icon3}></FontAwesomeIcon>
                    <Text style={styles.loremIpsum4}>+91 9611962259</Text>
                </View>

                <View style={styles.icon3Row}>
                    <MaterialCommunityIcons name="web" style={styles.icon3} />
                    <Text style={styles.loremIpsum4}>www.themit.in</Text>
                </View>

                <Text style={styles.text}>For Queries Click the Whatsapp icon below</Text>

            </Card>
            </ScrollView>

            <ShareButton
                iconName="share-variant1"
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

    )
};
AboutScreen.navigationOptions = navData =>{
  return{
  headerTitle: 'About Us',
  headerStyle: {
    backgroundColor: Colors.primaryColor
  },
  headerTintColor: 'white',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item iconName ='ios-business'/>
  </HeaderButtons>
  ),
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='menubar' iconName ='md-menu' onPress={() => {
      navData.navigation.toggleDrawer()
    }}  />
  </HeaderButtons>
  )

};
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.primaryColor
    },
    image: {
        height: '20%',
        width: '80%',
        alignSelf: 'center',
        marginTop: '5%'
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
    card: {
        width: '90%',
        margin: '5%',

    },
    icon2Row: {
        width: '80%',
        flexDirection: "row",

    },
    icon3Row: {
        height: 40,
        flexDirection: "row",

    },
    loremIpsum4: {
        fontFamily: "roboto700",
        color: "rgba(6,82,221,1)",
        height: 30,
        width: 217,
        fontSize: 15,
        marginLeft: 12,
        marginTop: 9
    },
    loremIpsum3: {
        fontFamily: "roboto700",
        color: "rgba(6,82,221,1)",
        fontSize: 15,
        marginLeft: 14,

    },
    icon2: {
        color: "red",
        fontSize: 25
    },
    icon3: {
        color: "green",
        fontSize: 25
    },
    sharebutton: {
      position:'absolute',
        height: 56,
        width: 56,
        backgroundColor: "rgba(56,203,59,1)",
        elevation: 8,
        right:20,
        bottom:20

    },

    sharebutton1: {
      position:'absolute',
        height: 56,
        width: 56,
        backgroundColor: "red",
        elevation: 8,
        right:20,
        bottom:85

    },
    icon: {
        color: "blue",
        fontSize: 25
      },
      loremIpsum: {
        fontFamily: "roboto",
        color: "black",
        fontSize: 12,
        margin:'2%'
      },
      iconRow: {
        
        flexDirection: "row",
        
      },
      text:{
          alignSelf:'center',
          fontSize:10,
          fontFamily:"roboto",
          
      }

});

export default AboutScreen;
