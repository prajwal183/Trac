import React from 'react';
import { View, Text, StyleSheet, Image} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EmpLocaterCard = props=> {
    return (
      <TouchableOpacity onPress ={props.onPress} style = {styles.card}>
       
         
          
        <View style = {styles.textbox}>
          <View style = {styles.bio}>
            <View style = {styles.in}>
        <Text style={styles.TextHeadersAdmin}>
            Administrator:
          </Text>
          </View>
        
  <View style = {styles.out}>
          <Text style={styles.TextHeaders}>
            Time :
          </Text>
          <Text style={styles.timetext}>
            {props.time}
          </Text>

          </View>
          </View>
  
  
          <Text style={styles.TextHeaders}>
            Message : 
          </Text>
          <Text style={styles.messagetext}>
             {props.message}
          </Text>
          </View>
      
        
  
   
    </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    card:{
      flexDirection:'row',
      elevation: 15,
        backgroundColor: 'white',
        //padding: 20,
        borderRadius:5,
        shadowColor: 'white',
        width: '90%',
        alignSelf: 'center',
        marginTop: '2%',
        

    

    },
    TextHeadersAdmin:{
        fontSize: 12,
        fontFamily: 'roboto700',
        color:'#7f8fa6' 
    },

    TextHeaders:{
      fontSize: 12,
      fontFamily: 'roboto',
    },
    textbox:{
      padding: 20,
      marginRight:'5%',
      width:'80%'
      
    },

    icon:{
      alignSelf:'center',
      marginLeft:'2%'
    },

    image:{
      width:50,
      height:50
    },
    bio:{
      flexDirection:'row'
    },
    in:{
      flex:3
    },
    out:{
      flex:2
    },
    timetext:{
      fontFamily:'roboto700',
      fontSize:15,
      color:"red"
    },
    messagetext:{
      fontSize: 13,
      fontFamily:'roboto700',
      color:'black'
    }
});

export default EmpLocaterCard;