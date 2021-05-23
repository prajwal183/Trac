import React from 'react';
import { View, Text, StyleSheet,Image} from 'react-native';
import Card from './Card';
import {Entypo} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const RepCard = props=> {
    return (
      <TouchableOpacity onPress ={props.onPress} style = {styles.card}>
       
       
          <View style = {styles.textbox}>
          <View style={styles.bio}>
            <View style = {styles.id}>
          <Text style={styles.biotext}>
            Employee Name :
          </Text>
        
  
          <Text style={styles.TextHeaders}>
            {props.username}
          </Text>
          </View>

          <View style = {styles.name1}>
          <Text style={styles.biotext}>
            Time :
          </Text>
        
  
          <Text style={styles.TextHeaders1}>
            {props.time}
          </Text>


          </View>

          </View>


       
          <Text style={styles.biotext}>
           Report :
          </Text>
          <Text style={styles.loc}>
           {props.message}
          </Text>

          <Text style={styles.biotext}>
            Tracked successfully
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
      flex: 2
    },
    name1:{
      flex:2
    },
    loc:{
      fontSize:13,
      fontFamily:'roboto700',
      color:'black'

    },
    add:{
      fontFamily:'roboto700',
      fontSize:10,
      color:'#7f8fa6'
    }

});

export default RepCard;
