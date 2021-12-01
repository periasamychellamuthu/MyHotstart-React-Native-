import React from "react";
import styled from 'styled-components';
import {Ionicons} from "@expo/vector-icons";

const MenuCard = props =>(
    <MenuText>
    <IconView>
    <Ionicons name={props.icon}size={25}color="black" style={{marginRight:10}}/>
    </IconView> 
    <Bus>
    <MenuButton>{props.text} </MenuButton>
      <Car>{props.caption}</Car>
      </Bus>
      
    </MenuText>
)
export default MenuCard;

const MenuText=styled.View`
flex-direction:row;
margin:8px;

`;
const IconView=styled.View`
width:32px;
height:32px;
justify-content:center;
align-items:center
`;

const Bus=styled.View`
padding-left:10px;
`;

const MenuButton=styled.Text`
font-size:20px;
color:black;
font-weight:600;


`;
const Car=styled.Text`


font-size:10px;
color:black;
margin-top:5px;
opacity:0.6;

`;
