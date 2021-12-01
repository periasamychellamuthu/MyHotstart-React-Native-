import React from 'react';
import styled from "styled-components";
import {TouchableOpacity,ScrollView, View,Image}from "react-native";
import {Video} from "expo-av";
import SecondCard from "../components/SecondCard";
import MovieCard from "../components/MovieCard";
import VideoScreen from '../screen/VideoScreen';

class Latest extends React.Component{
render(){
    return(
        <Book>
         <Image source={{uri:this.props.image}}/>
        </Book>

    );
}


}
export default Latest;


const Book=styled.View`

width: 171px;
height: 109px;
border-radius:10px;
overflow:hidden;
margin-left:10px;
background: white;
`;
