import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar, Button, FlatList, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import EmpLocaterCard from '../components/EmpLocaterCard';
import * as EmpActions from '../store/actions/employee';


const EmployeeLocaterScreen = props => {

  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const employees = useSelector(state => state.empState.availableList);
  const scripts = useSelector(state => state.scriptState.scripts);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await dispatch(EmpActions.fetchData(scripts.trac+'?action=edb'));

    } catch (err) {
      alert('could not connect to servers');
      // console.log(err.message)

    }
    setIsRefreshing(false);
  }, [setIsRefreshing, dispatch]
  )



  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });



  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='small' color='black' />
        <Text style={styles.loadtext}>Tracking all your Employees please wait!</Text>

      </View>
    )
  }

  if (!isLoading && employees.length === 0) {
    return (
      <View style={styles.loading}>
        <Image
          source={require('../assets/images/placeholder.png')} style={styles.image} />

        <Text style={styles.loadtext}>No Employee has been added by you!</Text>

      </View>
    )
  }
  else {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor='white' />
        <Image
          source={require('../assets/images/placeholder.png')} style={styles.image} />

        {isLoading ? <ActivityIndicator size='large' color='blue' /> : <FlatList
          onRefresh={loadData}
          refreshing={isRefreshing}
          data={employees}
          keyExtractor={item => item.userid}
          renderItem={itemData => (<EmpLocaterCard
            empid={itemData.item.empid}
            name={itemData.item.name}
            time={itemData.item.time}
            lat={itemData.item.lat}
            long={itemData.item.long}
            address={itemData.item.address}
            onPress={() => { props.navigation.navigate('empDetails', { user: itemData.item.userid }) }}
          />
          )
          }
        />}

      </View>
    )
  }
};

EmployeeLocaterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Driver Locater',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-bus'
        />
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
    flex: 1,

  },
  image: {
    width: 60,
    height: 60,
    alignSelf: 'center',
    margin: '2%'
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadtext: {
    fontFamily: 'roboto',
    fontSize: 10
  }
});

export default EmployeeLocaterScreen;