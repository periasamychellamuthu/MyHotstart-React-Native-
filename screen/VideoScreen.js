import React from 'react';
import styled from "styled-components";
import {TouchableOpacity,ScrollView}from "react-native";
import {Video} from "expo-av";
import SecondCard from "../components/SecondCard";
import MovieCard from "../components/MovieCard";

class VideoScreen extends React.Component{
    static navigationOptions={
        header:null
    };
    render(){
      const {navigation}=this.props;
      const data=navigation.getParam("Video");
      const SecondCardData=navigation.getParam("datas");
      const MovieCardData=navigation.getParam("MovieData");
        return(
            <Container >
            <ScrollView showsVerticalScrollIndicator={false}>
              <VideoContainer>
              <Video source={{
                uri:data.Video
                 }} shoutdPlay resizeMode="cover"
                 useNativeControls={true}
                 style={{width:"100%",height:"100%"}}
              />
              </VideoContainer>
              <VideoTittle>{data.title}</VideoTittle>
              <SomeText> Continu...</SomeText>
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
               <LikeText> More Image... </LikeText>
         <MovieCardBook>
        <ScrollView horizontal={true}>
           {MovieCardData.map((data,index) =>(
             <TouchableOpacity key={index} onPress={()=>(
               this.props.navigation.push("Video",{
                 Video:data,
                 datas:SecondCardData,
                 MovieData:MovieCardData
                })
             )}>
            <MovieCard image={data.Image}/>
            </TouchableOpacity>
            ))}      
        </ScrollView>
       </MovieCardBook>
       </ScrollView>     
            </Container>
        )
    }
}
export default VideoScreen;

const Container=styled.View`
flex:1;

`;
const VideoContainer=styled.View`
width:100%;
height:201px;
background:black;
`;
const VideoTittle = styled.Text`
margin-top:10px;
margin-left:10px;
color:#3c8282;
font-family:Roboto;
font-size:20px;
margin-bottom:10px;
line-height:24px;
font-weight:600;
`;
const SecondCardBook=styled.View`
margin-top:20px;
`;
const SomeText=styled.Text`
margin-top: 10px;
font-size: 20px;
margin-left:10px;
`;
const LikeText=styled.Text`
margin-top: 20px;
margin-bottom:20px;
font-size: 20px;
margin-left:10px;
`;

const MovieCardBook=styled.View`
margin-top:10px;

`;