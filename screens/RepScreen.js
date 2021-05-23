import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar, Button, FlatList, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import RepCard from '../components/RepCard';
import * as RepActions from '../store/actions/reports';



const RepScreen = props => {

  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const reports = useSelector(state => state.repState.availableList);
  const scripts = useSelector(state => state.scriptState.scripts);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    
    setIsRefreshing(true);
    try {
      await dispatch(RepActions.fetchData(scripts.trac+'?action=rdb'))
    } catch (err) {
      alert('No Employees reported!');
      // console.log(err.message)


    }
    setIsRefreshing(false);

  }, [dispatch, setIsRefreshing]
  )

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
        <Text style={styles.loadtext}>Loading Reports please wait!</Text>

      </View>
    )


  }

  if (!isLoading && reports.length === 0) {
    return (
      <View style={styles.loading}>
        <Image 
          source={require('../assets/images/notes.png')} style={styles.image} />

        <Text style={styles.loadtext}>No Employee Reported Yet!</Text>

      </View>
    )
  }


  else {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor='white' />
        <View style={styles.icon}>
          <Image
            source={require('../assets/images/notes.png')} style={styles.image} />

        </View>
        <FlatList

          onRefresh={loadData}
          refreshing={isRefreshing}
          data={reports}
          keyExtractor={item => item.time}
          renderItem={itemData => (<RepCard
            username={itemData.item.username}
            time={itemData.item.time}
            message={itemData.item.message}
            lat={itemData.item.lat}
            long={itemData.item.long}
            
            onPress={() => { props.navigation.navigate('repDetails', { timeparam: itemData.item.time }) }}
          />
          )
          }
        />

      </View>
    )
  }


};

RepScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Reports',
    headerStyle: {
      backgroundColor: Colors.VoiletbuttonColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-mail-open'
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
  icon: {
    alignItems: 'center',
    margin: '2%'
  },

  image: {
    width: 50,
    height: 50,
    alignSelf: 'center',
    margin:2
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

export default RepScreen;