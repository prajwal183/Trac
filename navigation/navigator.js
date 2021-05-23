import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {
    MaterialIcons, MaterialCommunityIcons, Entypo,
    FontAwesome, FontAwesome5
} from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import EmployeeLocaterScreen from '../screens/EmployeeLocaterScreen';
import EmpDetailsScreen from '../screens/EmployeeLocationDetails';
import VehLocaterScreen from '../screens/VehLocaterScreen';
import Colors from '../constants/Colors';
import VehDetailsScreen from '../screens/VehDetailsScreen';
import AddItemScreen from '../screens/subScreens/AddItemScreen';
import AddVehicleScreen from '../screens/subScreens/AddVehicleScreen';
import InsScreen from '../screens/InsScreen';
import RepScreen from '../screens/RepScreen';
import SendInsScreen from '../screens/subScreens/SendInsScreen';
import SendRepScreen from '../screens/subScreens/SendRepScreen';
import RepDetailsScreen from '../screens/RepDetailsScreen';
import AboutScreen from '../screens/AboutScreen';
import UserLocationScreen from '../screens/subScreens/UserLocationScreen';
import AuthScreen from '../screens/authScreen';
import GetInfoScreen from '../screens/subScreens/GetInfoScreen';
import StartScreen from '../screens/StartScreen';
import InsdetailsScreen from '../screens/InsdetailsScreen';
import ErrorScreen from '../screens/subScreens/ErrorScreen';
import SpeedometerScreen from '../screens/speedometerScreen';


const EmpstackNavigator = createStackNavigator({
    empLocater: EmployeeLocaterScreen,
    empDetails: EmpDetailsScreen,
    speed: SpeedometerScreen

},{
navigationOptions: {
    drawerIcon: drawerConfig => <Entypo name='location-pin' size={23} color={drawerConfig.tintColor} />,
    drawerLabel: 'Trac Locater'
}
}
);


/* const VehstackNavigator = createStackNavigator({
    vehLocater: VehLocaterScreen,
    vehDetails: VehDetailsScreen,
}
);
 */

/* const LocaterTabNavigator = createMaterialBottomTabNavigator({
    employee: {
        screen: EmpstackNavigator, navigationOptions: {
            tabBarLabel: "Employees",
            tabBarIcon: (tabInfo) => {
                return <MaterialIcons name='account-circle' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor

        }
    },
    vechicle: {
        screen: VehstackNavigator, navigationOptions: {
            tabBarLabel: "Vehicles",
            tabBarIcon: (tabInfo) => {
                return <MaterialCommunityIcons name='truck-fast' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.VoiletbuttonColor

        }
    }
}, {
    activeColor: 'white',
    shifting: true,
    navigationOptions: {
        drawerIcon: drawerConfig => <Entypo name='location-pin' size={23} color={drawerConfig.tintColor} />,
        drawerLabel: 'Trac Locater '
    }
},


)
 */

const InsStackNavigator = createStackNavigator({
    instruction: InsScreen,
    insdetails: InsdetailsScreen

});

const SendInsStack = createStackNavigator({
    sendIns: SendInsScreen
})

const RepStackNavigator = createStackNavigator({
    report: RepScreen,
    repDetails: RepDetailsScreen
});

const sendRepStack = createStackNavigator({
    sendRep: SendRepScreen,
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <FontAwesome name='send' size={18} color={drawerConfig.tintColor} />,
        drawerLabel: 'Send a Report '
    }
});

const TopTabNavigator = createMaterialTopTabNavigator(
    {
        veh: {
            screen: AddVehicleScreen,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View style={styles.iconCOntainer}>
                        <MaterialCommunityIcons name='truck-fast' size={22} color={tintColor} />
                        <Text style={{ color: tintColor }}>Add Vehicle</Text>
                    </View>
                ),
            },
        },
        emp: {
            screen: AddItemScreen,
            navigationOptions: {
                tabBarLabel: ({ tintColor }) => (
                    <View style={styles.iconCOntainer}>
                        <MaterialIcons name='account-circle' size={22} color={tintColor} />
                        <Text style={{ color: tintColor }}>Add Employee</Text>
                    </View>
                ),
            },
        },
    },
    {
        initialRouteName: 'veh',
        lazyLoad: true,
        tabBarPosition: 'top',
        swipeEnabled: false,
        tabBarOptions: {
            style: {
                height: 70,
                backgroundColor: '#633689',
                paddingBottom: 3,
                paddingTop: 3,
            },
            indicatorStyle: {
                backgroundColor: '#87B56A',
                elevation: 10,
            },
            activeTintColor: '#fff',
            inactiveTintColor: '#f8f8f8',
        },
    },
);

const AdminTabNavigator = createMaterialBottomTabNavigator({
    addins: {
        screen: SendInsStack, navigationOptions: {
            tabBarLabel: "Add Instruction",
            tabBarIcon: (tabInfo) => {
                return <Entypo name='clipboard' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: '#633689'

        }
    },
    add: {
        screen: TopTabNavigator, navigationOptions: {
            tabBarLabel: "Add Users",
            tabBarIcon: (tabInfo) => {
                return <MaterialIcons name='account-circle' size={22} color={tabInfo.tintColor} />
            },
            tabBarColor: '#633689'

        }
    }
}, {
    activeColor: 'white',
    shifting: true,
    navigationOptions: {
        drawerIcon: drawerConfig => <MaterialCommunityIcons name='account-circle' size={20} color={drawerConfig.tintColor} />,
        drawerLabel: 'Admin Panel'
    }
})





const MessageTabNavigator = createMaterialBottomTabNavigator({
    insStack: {
        screen: InsStackNavigator, navigationOptions: {
            tabBarLabel: "Instructions",
            tabBarIcon: (tabInfo) => {
                return <Entypo name='clipboard' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor

        }
    },
    repStack: {
        screen: RepStackNavigator, navigationOptions: {
            tabBarLabel: "Reports",
            tabBarIcon: (tabInfo) => {
                return <Entypo name='chat' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.VoiletbuttonColor

        }
    }
}, {
    activeColor: 'white',
    shifting: true,
    navigationOptions: {
        drawerIcon: drawerConfig => <FontAwesome5 name='facebook-messenger' size={20} color={drawerConfig.tintColor} />,
        drawerLabel: 'Trac Messenger'
    }
})

const AboutStackNavigator = createStackNavigator({
    About1: AboutScreen
},
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <MaterialCommunityIcons name='factory' size={20} color={drawerConfig.tintColor} />,
            drawerLabel: 'About us '
        }
    });




const DrawNavigator = createDrawerNavigator({
    Locater: EmpstackNavigator,
    Messenger: MessageTabNavigator,
    ReportS: sendRepStack,
    Admin: AdminTabNavigator,
    About: AboutStackNavigator,


}, {
    contentOptions: {
        activeTintColor: Colors.primaryColor
    }
});

const locaterStack = createStackNavigator({
    stacklocation: UserLocationScreen
});

const AuthStack = createStackNavigator({
    Auth: AuthScreen
});

const infoStack = createStackNavigator({
    infost: GetInfoScreen
});


const Navigator = createAnimatedSwitchNavigator({
    start: StartScreen,
    Error1:ErrorScreen,
    Auth1: AuthStack,
    info: infoStack,
    userlocation: locaterStack,
    drawer: DrawNavigator
},{
    // The previous screen will slide to the bottom while the next screen will fade in
    transition: (
      <Transition.Together>
        <Transition.In type="slide-bottom" durationMs={500} />
      </Transition.Together>
    ),
  })



export default createAppContainer(Navigator);

const styles = StyleSheet.create({
    iconCOntainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
});