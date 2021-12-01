import React from "react";
import styled from 'styled-components';
import { TouchableOpacity,Animated,Dimensions,
         TouchableWithoutFeedback,Alert,
        AsyncStorage} from 'react-native';
import Loading from "./Loading";
import Success from "./Success";
import { connect } from 'react-redux';
import firebaseApp from "../FirebaseConfig";

 
function mapStateToProps(state){
    return{menu:state.menu};
  }
  function mapDispatchToProps(dispatch){
    return{
    closelogin:()=>{
      console.log("close menu in Login.js");
      dispatch({
        type:"CLOSELOGIN"
      })
    },
      Login: (email)=>{
        console.log("login in Login.js");
        dispatch({
          type:"LOG",
          email:email
        })
      }
    }
  }
const  screenHight =Dimensions.get("window").height;
class Login extends React.Component{
    state={
      email:"",
      password:" ",
      isLoading:false,
      isSuccess:false,
      top:new Animated.Value(screenHight),
      scale:new Animated.Value(1.3),
      translateY:new Animated.Value(0)
    };
    componentDidMount(){
      this.getUser();
    }
    setUser = async(name)=>{
      try{
        await AsyncStorage.setItem("userName",name)
      }catch(error){}
    }
    getUser = async() =>{
      try{
        const name = await AsyncStorage.getItem("userName");

        if(name !== null){
          
        this.props.Login(name);
        }
      }catch(error){}
      
    };
    

    handleLogin = () =>{
      this.setState({isLoading:true});
      // setTimeout(()=>{  
      // this.setState({isLoading:false});
      // this.setState({isSuccess:true});    
      // },2000);
      // setTimeout(()=>{
      // this.setState({isSuccess:false});
      // this.props.closelogin();
      // },6000);

      const  email=this.state.email;
      const password=this.state.password;

      firebaseApp.auth()
      .signInWithEmailAndPassword(email,password)
      .catch(function(error){
        Alert.alert("Error",error.message);
      })
      .then((response)=>{
        this.setState({isLoading:false});

        if (response){
         this.setUser(response.user.email);
         this.props.Login(response.user.email);
         this.setState({isSuccess:true});
         setTimeout(()=>{
         this.setState({isSuccess:false});
         this.props.closelogin();
         },3000);  
        }
      })
    };
    componentDidUpdate(){
      if(this.props.menu=="openlogin"){
        Animated.timing(this.state.top,{toValue:0,duration:0}).start();
        Animated.spring(this.state.scale,{toValue:1}).start();
        Animated.timing(this.state.translateY,{toValue:0,duration:0}).start();
      }
      if(this.props.menu=="closelogin"){
          console.log("close login called 1",this.props.log);
         setTimeout( ()=>{
          console.log("close login called 2",this.props.log);
          Animated.timing(this.state.top, {toValue:screenHight,duration:0}).start();
          Animated.spring(this.state.scale, {toValue:1.3}).start();
          },2000); 
          Animated.timing(this.state.translateY,{toValue:1000,duration:500}).start();
        }
    }
    TabBackground=()=>{
       this.props.closelogin();
    }
    render(){
      return(
        <AnimatedContainer style={{top:this.state.top}}>
        <TouchableWithoutFeedback onPress={this.TabBackground} style={{position:"absolute" ,top:0,left:0}}>
          <BlackBox></BlackBox>
        </TouchableWithoutFeedback>
        <AnimatedBox style = {{
                transform:[{scale:this.state.scale},
                          {translateY:this.state.translateY}]}}>
                <Text>Member Login</Text>
                  <TextInput placeholder="Email" keyboardType="email-address"
                  onChangeText={email=>{this.setState({email:email})}}/>
                  <TextInput placeholder="Password" secureTextEntry={true}
                  onChangeText={password=>{this.setState({password:password})}}/>
                  <TouchableOpacity onPress = {this.handleLogin}>
                   <ButtenView>
                    <ButtenText>login</ButtenText>
                   </ButtenView>
                  </TouchableOpacity>
              </AnimatedBox>
              <Loading isActive={this.state.isLoading}/>
              <Success isActive={this.state.isSuccess}/>
            </AnimatedContainer>

        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);

 const Container=styled.View`
 position:absolute;
 width:100%;
 height:100%;
 top:0;
 left:0;
 align-items:center;
 justify-content:center;
 `;
 const AnimatedContainer =Animated.createAnimatedComponent(Container);

 const BlackBox=styled.View`
 background:rgba(24, 26, 24,0.75);
 position:absolute;
 top:0;
 left:0;
 width:100%;
 height:100%;
 `;

 const Box=styled.View`
 width:345px;
 height:250px;
 margin-top:40px;
 background:white;
 border-radius:15px;
 justify-content:center;
 align-items:center;
 `;
 const AnimatedBox =Animated.createAnimatedComponent(Box);
 
 const  Text=styled.Text`
 /* margin-top:10px; */
 font-size:20px;
 font-weight:400;
 color:black;
 
 `;

 const TextInput=styled.TextInput`
 margin-top:20px;
 width:327px;
 height:35px;
 background:#d8e1e6;
 border-radius:10px;
 padding-left:10px;
 /* color:blue; */
 `;

 const ButtenView=styled.View`
 background-color:#4c5b63;
 border-radius:10px;
 width:177px;
 height:38px;
 margin-top:20px;
 justify-content:center;
 align-items:center;
 margin-top:30px;

 `;

 const  ButtenText=styled.Text`
 color:white;
 font-weight:600;
 font-size:20px;
 text-transform:uppercase;
 
 `;
