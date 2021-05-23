import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';
import Card from './Card';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const VehLocaterCard = props=> {
    return (
      <TouchableOpacity onPress ={props.onPress} style = {styles.card}>
       
       <View style = {styles.textbox}>
          <View style={styles.bio}>
            <View style = {styles.id}>
          <Text style={styles.biotext}>
            Vehicle No. :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {props.VehicleNo}
          </Text>
          </View>

          <View style = {styles.name1}>
          <Text style={styles.biotext}>
            Driver Name :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {props.driverName}
          </Text>


          </View>

          </View>


       
          <Text style={styles.biotext}>
           Updated Time :
          </Text>
          <Text style={styles.TextHeaders1}>
           {props.time}
          </Text>

          <Text style={styles.biotext}>
            Tracked Location :
          </Text>

          <Text style={styles.loc}>
            {props.address}
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
    biotext:{
      marginTop:2,
      fontFamily:'roboto',
      fontSize:12,
      color:'black'
    },
    id:{
      flex: 3
    },
    name1:{
      flex:2
    },
    loc:{
      fontSize:13,
      fontFamily:'roboto700',
      color:'black'

    }
});

export default VehLocaterCard;