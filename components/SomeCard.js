import React from 'react';
import styled from 'styled-components';
import Carousel from 'react-native-snap-carousel';
import {View,Image,Dimensions,Text} from "react-native";

const sliderWidth=Dimensions.get("window").width;
export default class SomeCard extends React.Component {
    _renderItem({item,index}){
        return(
            <View style={{borderRadius: 10 , overflow:"hidden"}}>
            <Image source=
            {{uri:item.Image }}
            style={{
                width:"100%",height:210
            }}/>
          </View>
        )
    }
    render(){
        return(
            <Book>
             <SliteContainer>
             <Carousel
             ref={c => this._Carousel = c}
             data={this.props.data}
             renderItem={this._renderItem}
             sliderWidth={sliderWidth}
             itemWidth={368}
             inactiveSlideScale={0.92}
             inactiveSlideOpacity={1}
             enableMomentum={true}
             loop={true}
             autoplay={true}
             autoplayDelay={300}
             autoplayInterval={2000}
           
             contentContainerCustomStyle={{
                //  marginLeft:10,
                //  marginRight:70,
                 height:230
             }}
             />
             </SliteContainer>
            </Book>
        );
    }
}
const Book=styled.View`
width: ${sliderWidth};
height: 180px;
border-radius:9px;
overflow:hidden;
/* margin-left:8px; */
top:10px;
height:320px;

`;

// const Image=styled.Image`
// width: 100%;
// height: 100%;
// `;

const SliteContainer=styled.View`
margin-top:10px;
width:${sliderWidth};
/* height:450px; */
`;