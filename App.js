import React from "react";
import HomeScreen from "./screen/HomeScreen"
import{createStore}from "redux";
import{Provider}from "react-redux";
import  BottomTab from "./Nav";


const  reducer=( state={menu:"closeMenu",log:""},action)=>{
// if(command.type=="OPENMENU"){
//   return{menu:"openMenu"}
// }else if(command.type=="CLOSEMENU"){
//   return{menu:"closeMenu"}
// }
// return  state;
console.log(action,"in app.js");
switch(action.type){
  case"OPENMENU":
   return{...state,menu:"openMenu"};
  case"CLOSEMENU":
   return{...state,menu:"closeMenu"};
  case"LOG":
    console.log(action.email);
    return{...state,log: action.email};
  case"OPENLOGIN":
   return{...state,menu:"openlogin"};
  case"CLOSELOGIN":
   return{...state,menu:"closelogin"};
  default:
   return state;

}
};
const database = createStore(reducer);

const App =()=>(
  <Provider store={database}>
   <BottomTab/>
  </Provider>
);

export default App;