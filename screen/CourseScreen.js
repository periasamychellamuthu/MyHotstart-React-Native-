import React from 'react';
import styled from "styled-components";
import Carousel from 'react-native-snap-carousel';
import {View,Image,Dimensions,Text,TouchableOpacity} from "react-native";
import firebaseApp from "../FirebaseConfig";

const sliderWidth=Dimensions.get("window").width;
class CourseScreen extends React.Component{
    static navigationOptions={
        header:null
    };
    state={
        MovieCardData:[],
        SecondCardData:[]
    }
    componentDidMount(){
        console.disableYellowBox=true;
        this.database=firebaseApp
        .database()
        .ref()
        .child("MovieCardData");
        this.getMovieCardData(this.database)
   
         this.database=firebaseApp
        .database()
        .ref()
        .child("SecondCardData");
         this.getSecondCardData(this.database)
        }
    
   getMovieCardData= database =>{
    database.on("value",snap=>{
    let item=[];
    snap.forEach(child => {
        item.push({
        Image:child.val().Image,
        title:child.val().title,
        RelatedImage:child.val().RelatedImage
         })
         });
    this.setState({ MovieCardData: item })
     console.log( MovieCardData)
  })
}

getSecondCardData= database =>{
  database.on("value",snap=>{
    let SecondCardFData=[];
    snap.forEach(child => {
      SecondCardFData.push({
        
        Image:child.val().Image
       
      })
   
    });
    this.setState({
      SecondCardData:SecondCardFData
    })
     console.log(SecondCardFData)
  })

 }
 
       
 _renderItem=({item,index})=>{
        return(
          <TouchableOpacity onPress={()=>(
            this.props.navigation.push("Related",{
             Related:item,
              datas:this.state.SecondCardData,
              MovieData:this.state.MovieCardData
             })
          )}>
           <View style={{borderRadius: 10 , overflow:"hidden"}}>
             <Image source={{uri:item.Image}} style={{width:"100%",height:350}}/>
           </View>
           </TouchableOpacity>
        )
    }
    render(){
        return(
            <Container>
            <Lable >
             <Text style={{fontSize : 20}}> Latest</Text>
            </Lable>
            <SliteContainer>
             <Carousel
             ref={c => this._Carousel = c}
             data={this.state.MovieCardData}
             renderItem={this._renderItem}
             sliderWidth={sliderWidth}
             itemWidth={240}
             inactiveSlideScale={0.85}
             inactiveSlideOpacity={1}
             inactiveSlideShift={20}
             enableMomentum={true}
             loop={true}
             autoplay={true}
             autoplayDelay={300}
             autoplayInterval={2000}
            //  activeAnimationType={'spring'}
            //  activeAnimationOptions={{
            //      friction: 4,
            //      tension: 40
            //  }}
            //  Carousel layout={'tinder'} 
            //  layoutCardOffset={18} 

             contentContainerCustomStyle={{
                 marginLeft:5,
                 height:800
             }}
             />
             </SliteContainer>
            </Container>
        )
    }
}
export default CourseScreen;

const Container=styled.View`
flex:1;
justify-content:center;
align-items:center;
height:30px;
background-color:#e9f0f2;
`;
const Lable=styled.View`

position: absolute;
width: 109px;
height: 38px;
left: 35%;
top:15%;
background-color:white;
border-radius:8px;
justify-content:center;
align-items:center;

`;

const SliteContainer=styled.View`
margin-top:60%;
width:${sliderWidth};
/* height:450px; */
`;

const MovieCardData=[
    {
      Image:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",title:"Like"
    
    },
    {
      Image:"https://coolwallpapers.me/picsup/6142253-fall-colorful-red-autumn-japan-view-beautiful-fuji-lake-mountain-tree-leaves-season-branches-reflection.jpg",title:"2"
    },
    {
      Image:"https://c8.alamy.com/comp/2BHG705/colourful-conceptual-images-2BHG705.jpg",title:"3"
    }
  ]