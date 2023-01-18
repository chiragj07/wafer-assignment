import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
// import { Link } from 'react-router-dom'


export const PhoneVerification = () => {


    const [phoneOtp, setPhoneOtp] = useState('')

    const [user, setUser] = useState(null)

    const sendOtp = useCallback(async (e)=>{
        if(e) e.preventDefault();
        const isWaferEmailVerified = JSON.parse(localStorage.getItem('isWaferEmailVerified'))

        const body = {
            phone:isWaferEmailVerified.phone
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        try{
        const data = await axios.post('http://localhost:5000/user/send-otp-phone', body, config )
        console.log(data)
      }
      catch(err){
        //window.alert("Internal Error")
        console.log(err)
  
      }

    },[])

    useEffect(()=>{
        async function load(){
        const userLoggedIn = localStorage.getItem('userDetails');
        const isWaferEmailVerified = JSON.parse(localStorage.getItem('isWaferEmailVerified'))

        
        if(userLoggedIn){
            window.location.replace('/home')
            return
        }
        if(!isWaferEmailVerified){
            window.location.replace('/login');
            return
        }

        setUser(isWaferEmailVerified)
        await sendOtp();
        }
        load()
    },[sendOtp])


const verifyPhone = async(e)=>{
      e.preventDefault();
      console.log(user)
      const body = {
          phone:user.phone,
          otp:phoneOtp,
          
          
      }
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      }

      try{
      const data = await axios.post('http://localhost:5000/user/verify/phone', body, config )
      console.log(data)

      if(data && data.status === 200){
          if(data.message === 'expired'){
              window.alert('OTP Expired')
              localStorage.removeItem('isWaferEmailVerified')
              localStorage.removeItem('userDetails')
              window.location.href('/login')
              return
          }

          localStorage.setItem('userDetails', JSON.stringify(data))
          window.location.replace('/home')
          

      }
      else{
            window.alert('something went wrong')
      }
    }
    catch{
      window.alert("Some internal error")

    }
  }

    


  return (
    <div className="card-container">
          <div className='circle'></div>
          <div className='circle'></div>
           <h1>Verify Phone OTP</h1>  
            <form style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>

                
                <div className='input-holder' >
                <label htmlFor='phone-otp'>Enter Otp sent to your registered phone number</label>
                <input style={{marginTop:'50px'}} type="text" id="phone-otp" name="phone-otp" onChange={(e)=>setPhoneOtp(e.target.value)} value={phoneOtp}/>
                </div>
                
                
                <div className='button-holder'>
                <button onClick={verifyPhone} style={{width:'25%'}} >Verify OTP</button>
                <button onClick={sendOtp} style={{width:'25%'}} >Resend OTP</button>
                
                </div>
            </form>
    </div>
  )
}


export default PhoneVerification