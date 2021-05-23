import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, StatusBar, FlatList, ActivityIndicator, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';


import Colors from '../constants/Colors';
import HeaderButton from '../components/HeaderButton';
import InsCard from '../components/InsCard';
import * as InsActions from '../store/actions/instructions';




const InsScreen = props => {

  const [isLoading, setIsLoading] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const instructions = useSelector(state => state.insState.availableList);
  const scripts = useSelector(state => state.scriptState.scripts);

  const dispatch = useDispatch();

  const loadData = useCallback(async () => {
    
    setIsRefreshing(true);
    try {
      await dispatch(InsActions.fetchData(scripts.trac+'?action=idb'));

    } catch (err) {
      alert('No Instructions were added!');
      console.log(err.message)

    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading]);

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
        <Text style={styles.loadtext}>Loading Instructions please wait!</Text>

      </View>
    )


  }

  if (!isLoading && instructions.length === 0) {
    return (
      <View style={styles.loading}>
        <Image
          source={require('../assets/images/notebook.png')} style={styles.image} />

        <Text style={styles.loadtext}>No Instructions as been added today!</Text>

      </View>
    )
  }

  else {
    return (
      <View style={styles.screen}>
        <StatusBar barStyle="dark-content" backgroundColor='white' />
        <View style={styles.icon}>
          <Image
            source={require('../assets/images/notebook.png')} style={styles.image} />
        </View>
        <FlatList
          onRefresh={loadData}
          refreshing={isRefreshing}
          data={instructions}
          keyExtractor={item => item.time}
          renderItem={itemData => (<InsCard
            time={itemData.item.time}
            message={itemData.item.message} 
            onPress={() => { props.navigation.navigate('insdetails', { timeparam: itemData.item.time }) }}
          />
          )
          }
        />


      </View>
    )

  }


};

InsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Admin Instructions',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: 'white',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item iconName='md-mail-open' />
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

export default InsScreen;