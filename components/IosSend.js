import React, { Component } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {FontAwesome} from '@expo/vector-icons';

function IosSend(props) {
  return (
    <TouchableOpacity style={[styles.container, props.style]} onPress = {props.onPress}>
     <FontAwesome name ='send' size ={25} color = 'white' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#3F51B5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center"
  }
});

export default IosSend;