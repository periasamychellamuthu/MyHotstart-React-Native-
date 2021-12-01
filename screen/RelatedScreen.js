import React from "react";
import styled from 'styled-components';
import {Text,ScrollView,TouchableOpacity,Dimensions,View} from "react-native";
import SecondCard from "../components/SecondCard";
import Carousel from 'react-native-snap-carousel';



const sliderWidth=Dimensions.get("window").width;
class RelatedScreeen extends React.Component{
    static navigationOptions={
        header:null
    };
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
      const {navigation}=this.props;
      const data=navigation.getParam("Related");
      const SecondCardData=navigation.getParam("datas");
      const MovieCardData=navigation.getParam("MovieData");
        return(
            <Container>
            <ScrollView>
             <CoverImage>
             <Image source={{uri:data.RelatedImage}}/>
             </CoverImage>
             <Text style={{
                color:"black",fontSize:20,
                marginTop:10,marginLeft:10,
                 fontWeight:"bold",marginBottom:10,
                }}>{data.title}</Text>
                <SomeText>Continu To Watch..</SomeText>
                <SecondCardBook>
                <ScrollView horizontal={true}>
                {SecondCardData.map((data,index) =>(
                  <TouchableOpacity key={index} onPress={()=>(
                    this.props.navigation.push("Video",{
                      Video:data,
                      datas:SecondCardData,
                      MovieData:MovieCardData})
                  )}>
                 <SecondCard  image={data.Image}/>
                 </TouchableOpacity>
                ))}   
                 </ScrollView>
                 </SecondCardBook>
                 <LikeText> Latest..</LikeText>
                 <Carousel
                 ref={c => this._Carousel = c}
                 data={SecondCardData}
                 renderItem={this._renderItem}
                 sliderWidth={sliderWidth}
                 itemWidth={365}
                 inactiveSlideScale={0.9}
                 inactiveSlideOpacity={1}
                 enableMomentum={true}
                 loop={true}
                 autoplay={true}
                 autoplayDelay={300}
                 autoplayInterval={2000}
               
                 contentContainerCustomStyle={{
                     marginLeft:0,
                     marginRight:120,
                     height:230
                     
                 }}
                 
             Carousel layout={'tinder'} 
             layoutCardOffset={9} 
                 />
                 </ScrollView>
             </Container>
        )
    }

}
export default RelatedScreeen;

const Container=styled.View`
flex:1;
background-color:white;
`;

const CoverImage=styled.View`
width:100%;
height:229;

`;


const Image=styled.Image`
width:100%;
height:100%;
`;

const SomeText=styled.Text`
margin-top: 15px;
font-size: 20px;
margin-left:10px;
`;

const SecondCardBook=styled.View`
margin-top:15px;
`;

const LikeText=styled.Text`
margin-top: 15px;
margin-bottom:20px;
font-size: 20px;
margin-left:10px;
`;
