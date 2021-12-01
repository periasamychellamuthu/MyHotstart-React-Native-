import React from 'react';
import Styled from 'styled-components';

export  default class SecondCard extends React.Component{
render(){
    return(
        <Book>

        <Image source=
             {{uri: this.props.image}}/>
    


        </Book>
    );
 }
}
 

const Book=Styled.View`

width: 160px;
height: 210px;
border-radius:7px;
overflow:hidden;
margin-left:10px;
background: white;
`;
const Image=Styled.Image`

width: 100%;
height: 100%;
`;

