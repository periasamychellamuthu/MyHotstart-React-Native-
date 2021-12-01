import React from 'react';
import Styled from 'styled-components';
import {Ionicons} from '@expo/vector-icons';
import {LinearGradient} from "expo-linear-gradient";
import styled from 'styled-components';
export  default class SecondCard extends React.Component{
render(){
    return(
        <Book>

        <Image source=
             {{uri: this.props.image}}/>
         <LinearGradient colors ={[ "rgba(0, 0, 0, 0))","rgba(0, 0, 0, 1)"]}
        style={{
            position:"absolute",
            width:"100%",
            height:"50%",
            top :55

        }}
        />
        <Main>
           
               <Ionicons name="ios-play" color="white" size={18}/>
           
           <SomeText>
             continu
           </SomeText>
        </Main>


        </Book>
    );
 }
}
 

const Book=Styled.View`

width: 171px;
height: 109px;
border-radius:10px;
overflow:hidden;
margin-left:10px;
background: white;
`;
const Image=Styled.Image`

width: 100%;
height: 100%;
`;


const SomeText=styled.Text`

font-size:16px;
color:white;
padding-left:5px;
`;

const Main=styled.View`
position:absolute;
top:60px;
left:5px;
flex-direction:row;
align-items:center;
`;