"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import jwt from "jwt-decode"
import Countdown from 'react-countdown';

export default function Home() {
  const [user,setUser] = useState(null)
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
        window.location.href="/login"
    }else{
      if(token.length>20){

        const decoded =  jwt(token)
        console.log("aa",decoded);
        setUser(decoded)
      }
    }
},[])


// ============ timer ===============

const [isUserActive, setIsUserActive] = useState(true);
let timer;

const resetInactivityTimer = () => {
  clearTimeout(timer);
  timer = setTimeout(handleInactivity, 60000); 
};


const handleInactivity = () => {
  setIsUserActive(false);
  setTimeout(() => {
    localStorage.removeItem("token")
    location.href="/login"
  }, 60000);

};

useEffect(() => {
  const handleUserActivity = () => {
    !isUserActive? setIsUserActive(true):setIsUserActive(false);
    resetInactivityTimer();
  };

  document.addEventListener('mousemove', handleUserActivity);
  document.addEventListener('touchmove', handleUserActivity);
  document.addEventListener('keypress', handleUserActivity);

  return () => {
    document.removeEventListener('mousemove', handleUserActivity);
    document.removeEventListener('touchmove', handleUserActivity);
    document.removeEventListener('keypress', handleUserActivity);
  };
}, []);

useEffect(() => {
  resetInactivityTimer();

  return () => {
    clearTimeout(timer);
  };
}, []);

const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    return "";
  } else {
    return <h2>{minutes}:{seconds}</h2>;
  }
};
console.log("isUserActive",isUserActive);
  return (
    <div className="w-full flex justify-center items-center">
      <div>

      <h1 className="text-3xl">Home page</h1>
      {user?.picture && <Image src={user.picture}  width={100} height={100} className="rounded-full" alt="profile" />}
      <h2>Name :  {user?.name}</h2>
      <button className="bg-black text-white p-1 px-3 rounded-md mt-2" onClick={()=>{
        localStorage.removeItem("token")
        location.href="/login"
      }} >Log out</button>
      </div>
      {!isUserActive &&<Countdown
    date={Date.now() + 60000}
    renderer={renderer}
  />}
      
    </div>
  );
}
