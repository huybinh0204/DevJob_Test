import {createAppContainer,} from 'react-navigation';
import {createMaterialTopTabNavigator,} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import FeatureJob from '../page/FeatureJob';
import RewardJob from '../page/RewardJob';

const TabScreen = createMaterialTopTabNavigator(
    {
        RewardJob: {
            screen: RewardJob,
            navigationOptions:{
                tabBarLabel:"Reward Job",
            },

        },
        FeatureJob: {
            screen: FeatureJob,
            navigationOptions:{
                tabBarLabel:"Feature Job",
            },
        },
    }, {
        tabBarPosition: 'top',
        swipeEnabled: true,
        animationEnabled: true,
        tabBarOptions: {
            activeTintColor: '#000000',
            inactiveTintColor: '#9a9a9a',
            style: {
                backgroundColor: '#ffffff',
            },
            labelStyle: {
                textAlign: 'center',
            },
            indicatorStyle: {
                borderBottomColor: '#87B56A',
                borderBottomWidth: 2,
            },
        },
    },
);


const TabHomeScreen = createStackNavigator(
    {

        TabScreen: {
            screen: TabScreen,
            navigationOptions: {
                header:null,
            },
        },
    },
);



export default createAppContainer(TabHomeScreen);
