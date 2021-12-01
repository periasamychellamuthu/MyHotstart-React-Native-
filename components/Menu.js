import React from 'react';
import styled from 'styled-components';
import {LinearGradient} from "expo-linear-gradient";
import { Animated,TouchableOpacity,Dimensions,AsyncStorage} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import { connect } from 'react-redux';
import MenuCard from './MenuCard';

const screenHeight = Dimensions.get("window").height;

function mapStateToProps(state){
  return{menu:state.menu};
}
function mapDispatchToProps(dispatch){
  return{
    closeMenu:()=>dispatch({
      type:"CLOSEMENU"
    }),
    Login: (email)=>{
      dispatch({
        type:"LOG",
        email:email
      })
    }
  }
}

 
 class Menu extends React.Component{
  state={
   top:new Animated.Value(screenHeight)
  };
  componentDidMount(){
    this.menu();
    }
    componentDidUpdate(){
      this.menu();
    }


  
  menu=()=>{
    if(this.props.menu=="openMenu"){
      Animated.spring(this.state.top,{toValue:150}).start();
      }
  
    
    if (this.props.menu=="closeMenu"){
      
      Animated.spring(this.state.top,{toValue:screenHeight}).start();
      
    }
  };

  logout =()=>{
    this.props.Login();
    this.props.closeMenu();
    AsyncStorage.clear();
  };

  render(){
    return(
      <AnimatedBook style={{position:"absolute",top:this.state.top,zIndex:100}}>
        <Cover>
          <LinearGradient colors ={[ "rgba(242, 192, 136, 0)","rgba(242, 192, 136, 1)"]} style={{ width:"100%",height:"100%"}}/>
          <Content>
           Menu
          </Content>
        </Cover>
        <Sample>
        <TouchableOpacity 
        style={{position:"absolute",top:-20,"left":"45%"}} 
        onPress={this.props.closeMenu}
        >
          <Exit>
            <Ionicons name="ios-close" color="black" size={40} />
          </Exit>
         
        </TouchableOpacity>
        <MenuButten>
          <MenuCard text="Account" icon="ios-settings" caption="profile"/>
          <TouchableOpacity onPress={()=>{this.logout();}}>
           <MenuCard text="Log Out" icon="ios-log-out" caption="see you soon"/>
           </TouchableOpacity>
        </MenuButten>
       
        </Sample>
      </AnimatedBook>
    )}

}

export default connect(mapStateToProps,mapDispatchToProps)(Menu);

const Book=styled.View`
width: 100%;
height: 100%;
`;

const AnimatedBook= Animated.createAnimatedComponent(Book);

const Cover=styled.View`
width: 100%;
height: 140px;
background: white;
border-radius:6px;
overflow:hidden;
`;


const Sample=styled.View`
width: 451px;
height: 100%;
background:#f5f2f0;
padding:30px;
`;

const Exit=styled.View`
width: 40px;
height: 40px;
background: white;
border-radius:20px;
align-items: center;

`;
const Content=styled.Text`
position:absolute;
font-size:24px;
font-weight:600;
color:black;
top:40%;
left:45%;
align-items:center;
justify-content:center;

`;
const MenuButten=styled.Text`
font-size:25px;
color:black;
width:60px;
left:40px;

padding:30px;
`;


