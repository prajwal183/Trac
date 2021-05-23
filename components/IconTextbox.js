import React, { Component } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function IconTextbox(props) {
  return (
    <View style={[styles.container, props.style]}>
      <Icon
        name={props.iconStyle || "calendar"}
        style={styles.iconStyle}
      ></Icon>
      <TextInput
        placeholder={props.inputStyle || "Label"}
        style={styles.inputStyle}
        value = {props.value}
        onChangeText={props.onChangeText}
        keyboardType ={props.keyboardType}
        autoCapitalize ={props.autoCapitalize}
        secureTextEntry ={props.secureTextEntry}

      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center"
  },
  iconStyle: {
    color: "blue",
    fontSize: 24,
    paddingLeft: 8
  },
  inputStyle: {
    color: "black",
    marginLeft: 16,
    paddingRight: 5,
    fontSize: 16,
    alignSelf: "stretch",
    flex: 1,
    lineHeight: 16,
    borderBottomWidth: 1,
    borderColor: "#D9D5DC",
    paddingTop: 14,
    paddingBottom: 8
  }
});

export default IconTextbox;
