import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export const Login = () => {


    const [email, setEmail] = useState('')
    const [emailOtp, setEmailOtp] = useState('')
    


    const [user, setUser] = useState({})

    const [showEmailOtpBox, setShowEmailOtpBox] = useState(false)


    useEffect(()=>{
        const user = localStorage.getItem('userDetails');
        console.log(user)
        if(user){
            window.location.replace('/home')
        }
    },[])


    
    const verifyEmail = async(e)=>{
        e.preventDefault();
        const body = {
            email,
            otp:emailOtp,
            
            
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        try{
        const data = await axios.post('http://localhost:5000/user/verify/email', body, config )
        console.log(data)
  
        if(data && data.status === 200){
            if(data.message === 'expired'){
                setShowEmailOtpBox(false)
                window.alert('OTP Expired')
                localStorage.removeItem('userDetails')
                localStorage.removeItem('isWaferEmailVerified');
                return
            }

            localStorage.setItem('isWaferEmailVerified', JSON.stringify(user))
            window.location.replace('/verify-phone')
            
  
        }
        else{
          window.alert('Verification failed, Try using other otp');
          return   
        }
      }
      catch{
        window.alert("Invalid Email")
  
      }
    }

    const handleLogin = async(e)=>{
        e.preventDefault();
        const body = {
            email
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        try{
        const data = await axios.post('http://localhost:5000/user/login', body, config )
  
        if(data && data.status === 200){
            setShowEmailOtpBox(true);
            setUser(data.data.user)
  
        }
        else{
            window.alert("Invalid Email")
        }
      }
      catch{
        window.alert("Invalid Email")
  
      }
  
    }
  



  return (
    <div className="card-container">
          <div className='circle'></div>
          <div className='circle'></div>
           <h1>Register</h1>  
            <form>

                <div className='input-holder'>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>

                <div className='input-holder' style={{display: `${!showEmailOtpBox ? 'none' : 'flex'}`}}>
                <label htmlFor='email-otp'>Email Otp</label>
                <input type="text" id="email" name="email" onChange={(e)=>setEmailOtp(e.target.value)} value={emailOtp}/>
                </div>
                
                
                <button onClick={handleLogin} style={{display: `${showEmailOtpBox ? 'none' : 'block'}`, width:'25%'}} >Send OTP</button>
                <div className='button-holder'>
                <button onClick={verifyEmail} style={{display: `${!showEmailOtpBox ? 'none' : 'block'}`, width:'25%'}} >Verify OTP</button>
                <button onClick={handleLogin} style={{display: `${!showEmailOtpBox ? 'none' : 'block'}`, width:'25%'}} >Resend OTP</button>
                
                </div>
                <button onClick={(e)=>{
                    e.preventDefault();
                    setShowEmailOtpBox(false)
                }} style={{display: `${!showEmailOtpBox ? 'none' : 'block'}`}} >Reset</button>
            </form>
            <div className='footer-links'>
                Don't have an account ?  <Link style={{color:"wheat", textDecoration:"none"}} to={'/'}>Register</Link>
            </div>
    </div>
  )
}


export default Login