import React from "react";
import { createStackNavigator } from 'react-navigation-stack';
import{createAppContainer} from "react-navigation";
import {createBottomTabNavigator} from "react-navigation-tabs";
import { createStore } from "redux";
import HomeScreen from "./screen/HomeScreen";
import VideoScreen from "./screen/VideoScreen";
import CourseScreen from "./screen/CourseScreen";
import RelatedScreen  from "./screen/RelatedScreen";
import {Ionicons} from '@expo/vector-icons';
import  Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

const HomeStack=createStackNavigator({
    Home:HomeScreen,
    Video:VideoScreen,
    Related:RelatedScreen
});
HomeStack.navigationOptions={
    tabBarLabel:"Home",
    tabBarIcon:({focused})=><Icon name="home" size={25} 
    color={focused ? "#36b8cf":"#aaadad"}/>
};

const CourseStack=createStackNavigator({
    Vidos:CourseScreen,
    Related:RelatedScreen
   
});
CourseStack.navigationOptions={
    tabBarLabel:"Course",
    tabBarIcon:({focused})=><Icon name="home" size={25} 
    color={focused ? "#36b8cf":"#aaadad"}/>
};

const VideoStack=createStackNavigator({
    Course:CourseScreen
  
});
VideoStack.navigationOptions={
    tabBarLabel:"Video",
    tabBarIcon:({focused})=><Icon name="book-open-variant" size={25} 
    color={focused ? "#36b8cf":"#aaadad"}/>
};


const BottomTab =createBottomTabNavigator(
    {HomeStack,VideoStack ,CourseStack},
    { tabBarOptions:{showLabel:false}});

const MaterialbottomTab=createMaterialBottomTabNavigator(
        {
         Home:{screen:HomeStack},
         Vidos:{screen:VideoStack},
        //  Course:{screen:CourseStack}
        
        },
        {
            initialRouteName:"Home",
            activecolor:"#57d3de",
            inactiveColor:"#cfe6e8",
            barStyle:{backgroundColor:"#edf7f7"},
            shifting:true
        }
    )
  
export default createAppContainer(MaterialbottomTab);

