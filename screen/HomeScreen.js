import React from "react";
import {StatusBar,ScrollView,Text, View,Image} from "react-native";
import styled from "styled-components";
import SomeCard from "../components/SomeCard";
import SecondCard from "../components/SecondCard";
import MovieCard from "../components/MovieCard";
import {Ionicons} from '@expo/vector-icons';
import {TouchableOpacity,Animated,Dimensions} from "react-native";
import Menu  from "../components/Menu";
import {connect} from "react-redux";
import firebaseApp from "../FirebaseConfig";
import  Login from "../components/Login";
import Latest from"../components/Latest";

// import * as firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyBrjbFpROTIxu2-j2YHezGUeSs00zeyZrE",
//   authDomain: "react-native-69e51.firebaseapp.com",
//   databaseURL: "https://react-native-69e51-default-rtdb.firebaseio.com",
//   projectId: "react-native-69e51",
//   storageBucket: "",
// };

// const firebaseApp=firebase.initializeApp(firebaseConfig);



const  screenHight =Dimensions.get("window").height;
function mapStateToProps(state){
    console.log("properties set # $$",state.log);
    return{menu:state.menu , log:state.log};
}
function mapDispatchToProps(dispatch){
    return{
        openMenu:()=>dispatch({
            type:"OPENMENU"
        }),
        openlogin:()=>dispatch({
          type:"OPENLOGIN"
        })
    };

}

 class  HomeScreen extends React.Component {
   static navigationOptions ={
     header:null
   }
  state={
    left:10,
    top:new Animated.Value(screenHight),
    opacity:new Animated.Value(0),
    SecondCardData:[],
    SomeCardData:[],
    MovieCardData:[]
  };
   componentDidMount(){
     console.disableYellowBox=true;
    //  firebaseApp.database().ref("/SomeCardData").push
    //  ({
    //   Image:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",title:"Like"
    //   })
     this.database=firebaseApp
     .database()
     .ref()
     .child("SomeCardData");
     this.getSomeCardData(this.database)
    
     this.database=firebaseApp
     .database()
     .ref()
     .child("SecondCardData");
     this.getSecondCardData(this.database)

     this.database=firebaseApp
     .database()
     .ref()
     .child("MovieCardData");
     this.getMovieCardData(this.database)
    
   }
   getSomeCardData= database =>{
    database.on("value",snap=>{
    let SomeCardFData=[];
    snap.forEach(child => {
      SomeCardFData.push({
        title:child.val().title,
        Image:child.val().Image,
        
      })
   
    });
    this.setState({
      SomeCardData:SomeCardFData
    })
     
  })
}

 
   getSecondCardData= database =>{
    database.on("value",snap=>{
      let SecondCardFData=[];
      snap.forEach(child => {
        SecondCardFData.push({
          title:child.val().title,
          Image:child.val().Image,
          Video:child.val().Video
        })
     
      });
      this.setState({
        SecondCardData:SecondCardFData
      })
       console.log(SecondCardFData)
    })

   }
   
   getMovieCardData= database =>{
    database.on("value",snap=>{
    let item=[];
    snap.forEach(child => {
        item.push({
       
        Image:child.val().Image,
        RelatedImage:child.val().RelatedImage,
        title:child.val().title
        
      })
   
    });
    this.setState({
        MovieCardData: item
    })
     console.log( MovieCardData)
  })
}
  
  
  
  componentDidUpdate(){
    this.backscreen()
   }
  backscreen(){
    if(this.props.menu=="openMenu"){
      Animated.timing(this.state.top,{toValue:0,duration:10}).start();
      Animated.timing(this.state.opacity,{toValue:0.6,duration:500}).start();
    }
    if(this.props.menu=="closeMenu"){
      Animated.timing(this.state.top,{toValue: screenHight,duration:10}).start();
      Animated.spring(this.state.opacity,{toValue:0}).start();
    }
  }
handleLogin = ()=>{
  console.log(this.props.log,"1");
  console.log(this.state.log,"2");
  if(this.props.log){
    this.props.openMenu();

  }else{
    this.props.openlogin();
  }
  
}

  render(){
    return (
      <Root>
      <Main >
     
      <ScrollView showsVerticalScrollIndicator={false}>
      <StatusBar hidden />
      <Headers>
      
      <TouchableOpacity onPress ={this.handleLogin}
        style={{
          position:"absolute",
          top:15,
          left:this.state.left,
          zIndex:100
          }}  >
       <Ionicons name="ios-menu" color="black" size={28} />
       </TouchableOpacity>
       <Logo>Natural Pick</Logo>
       <Profile source={require('../assets/images.jpg')}></Profile>
      </Headers>
      <SomeCardBook> 
      <SomeCard data={this.state.SecondCardData} />
       </SomeCardBook>
       <SomeText> Watch Continu</SomeText>
       <SecondCardBook>
        <ScrollView horizontal={true}>
           {this.state.SecondCardData.map((data,index) =>(
             <TouchableOpacity key={index} onPress={()=>(
               this.props.navigation.push("Video",{
                 Video:data,
                 datas:SecondCardData,
                 MovieData:MovieCardData
                })
             )}>
            <SecondCard  image={data.Image}/>
            </TouchableOpacity>
            ))}      
        </ScrollView>
       </SecondCardBook>
       <LikeText> More..</LikeText>

       <MovieCardBook>
        <ScrollView horizontal={true}>
           {this.state.MovieCardData.map((data,index) =>(
             <TouchableOpacity key={index} onPress={()=>(
               this.props.navigation.push("Related",{
                Related:data,
                 datas:this.state.SecondCardData,
                 MovieData:this.state.MovieCardData
                })
             )}>
            <MovieCard image={data.Image}/>
            </TouchableOpacity>
            ))}      
        </ScrollView>
       </MovieCardBook>
       <SomeCardBook> 
       <SomeCard data={this.state.SecondCardData} />
        </SomeCardBook>
      
       </ScrollView>
       
     </Main>
     
     <AnimatedBack style={{top:this.state.top,opacity:this.state.opacity}} />
     <Menu /> 
     <Login/>
     </Root>

    )}
}
export default connect(mapStateToProps,mapDispatchToProps)(HomeScreen);

const SomeCardData=[
  {
    Image:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
  },
  {
    Image:"https://wallpaperaccess.com/full/1249645.jpg"
  },
  {
    Image:"https://coolwallpapers.me/picsup/6142253-fall-colorful-red-autumn-japan-view-beautiful-fuji-lake-mountain-tree-leaves-season-branches-reflection.jpg"
  },
  {
    Image:"https://c8.alamy.com/comp/2BHG705/colourful-conceptual-images-2BHG705.jpg"
  }
];
const SecondCardData=[
  {
    Image:"https://cdn-a.william-reed.com/var/wrbm_gb_food_pharma/storage/images/publications/cosmetics/cosmeticsdesign-asia.com/headlines/formulation-science/natural-and-organic-beauty-one-of-the-key-drivers-of-indonesia-s-personal-care-market/9440813-1-eng-GB/Natural-and-organic-beauty-one-of-the-key-drivers-of-Indonesia-s-personal-care-market_wrbm_large.jpg",title:"Like"
  
  },
  {
    Image:"http://pipeclinic.com/wp-content/uploads/2019/03/AdobeStock_105994137-1024x680.jpeg",title:"2"
  },
  {
    Image:"https://c8.alamy.com/comp/2BHG705/colourful-conceptual-images-2BHG705.jpg",title:"3"
  }, {
    Image:"https://scx2.b-cdn.net/gfx/news/2019/2-nature.jpg",title:"3"
  }, {
    Image:"http://www.meissl.com/media/images/8f24db1f/schweiz.jpg",title:"3"
  }
]
const Root=styled.View`
flex:1;
`;
const Main=styled.View`
flex:1;
background-color:#f5f9fa;
`;
const Back=styled.View`
position:absolute;
width:100%;
height:100%;
background:#34353b;
opacity:0.6;
`;
const AnimatedBack =Animated.createAnimatedComponent(Back);

const Headers=styled.View`
width:100%;
height:60px;
background-color:#edf7f7;
`;

const Logo=styled.Text`
color:#1c1f1e;
font-size:22px;
left:45px;
top:13px;
font-weight:500;
`;
const Profile=styled.Image`
position: absolute;
width: 45px;
height: 35px;
border-radius:20px;
background: #E5E5E5;
left: 85%;
top: 5px;
`;

const SomeCardBook=styled.View`
margin-top: 27px;
height: 245px;
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
const SecondCardBook=styled.View`
margin-top:24px;
`;
const MovieCardBook=styled.View`
margin-top:8px;
`;
const LatestText=styled.Text`
margin-top: 20px;
margin-bottom:20px;
font-size: 20px;
margin-left:10px;
`;

const LatestCard=styled.View`
margin-top:24px;
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
const LatestCarddata=[
  {
   image:"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg" 
  },
  {
    image:"https://wallpaperaccess.com/full/1249645.jpg"
  },
  {
    image:"https://coolwallpapers.me/picsup/6142253-fall-colorful-red-autumn-japan-view-beautiful-fuji-lake-mountain-tree-leaves-season-branches-reflection.jpg"
  },
  {
    image:"https://c8.alamy.com/comp/2BHG705/colourful-conceptual-images-2BHG705.jpg"
  }
]

