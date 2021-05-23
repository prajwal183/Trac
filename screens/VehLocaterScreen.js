import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar, Button, FlatList, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import VehLocaterCard from '../components/VehLocaterCard';
import * as VehActions from '../store/actions/vehicle';


const VehLocaterScreen = props => {

  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const vehicles = useSelector(state => state.vehState.availableList);
  const scripts = useSelector(state => state.scriptState.scripts);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    setIsRefreshing(true)
    try {
      await dispatch(VehActions.fetchData(scripts.trac+'?action=vdb'));

    } catch (err) {
      alert('Could not fetch vehicles, Check network settings!');
      // console.log(err.message)

    }
    setIsRefreshing(false)

  }, [ setIsLoading, setIsRefreshing, dispatch]
  );


  useEffect(() => {
    setIsLoading(true);
    loadData().then(() => {
      setIsLoading(false);
    });

  }, [dispatch, loadData]);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size='small' color='black' />
        <Text style={styles.loadtext}>Tracking all your Vehicles please wait!</Text>

      </View>
    )
  }

  if (!isLoading && vehicles.length === 0) {
    return (
      <View style={styles.loading}>
        <Image
          source={require('../assets/images/truck.png')} style={styles.image} />

        <Text style={styles.loadtext}>No Vehicle has been added by you!</Text>

      </View>
    )
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" backgroundColor='white' />

      <Image
        source={require('../assets/images/truck.png')} style={styles.image} />

      {isLoading ? <ActivityIndicator size='large' color='blue' /> : <FlatList
        onRefresh={loadData}
        refreshing={isRefreshing}
        data={vehicles}
        keyExtractor={item => item.userid}
        renderItem={itemData => (<VehLocaterCard
          VehicleNo={itemData.item.VehicleNo}
          driverName={itemData.item.driverName}
          time={itemData.item.time}
          lat={itemData.item.lat}
          long={itemData.item.long}
          address={itemData.item.address}
          onPress={() => { props.navigation.navigate('vehDetails', { vehicleno: itemData.item.VehicleNo }) }}
        />
        )
        }
      />}

    </View>
  )
};

VehLocaterScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Vehicle Locater',
    headerStyle: {
      backgroundColor: Colors.VoiletbuttonColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-bus' />
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

export default VehLocaterScreen;