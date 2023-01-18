import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


export const Register = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [countryCode, setCountryCode] = useState('')

    useEffect(()=>{
        const user = localStorage.getItem('userDetails');
        console.log(user)
        if(user){
            window.location.replace('/home')
        }
    },[])

    const handleRegister = async(e)=>{
        e.preventDefault();
        if(!firstName || !lastName || !email || !phone || !countryCode){
          window.alert('All fields are required')
          return
        }
        const body = {
            'first name': firstName,
            'last name': lastName,
            email, 
            phone:countryCode+' '+phone
        }
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
  
        try{
        const data = await axios.post('http://localhost:5000/user/register', body, config )
        console.log(data)
  
        if(data && data.status === 200){
        //   dispatch(fetchUserReq(data))
          window.location.replace('/login')
  
        }
        else{
            window.alert(data.message)
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
                  <label htmlFor='firstName'>First Name</label>
                  <input type="text" id="firstName" name="firstName" onChange={(e)=>setFirstName(e.target.value)} value={firstName}/>
                </div>
                <div className='input-holder'>
                    <label htmlFor='lastName'>Last Name</label>
                    <input type="text" id="lastName" name="lastName" onChange={(e)=>setLastName(e.target.value)} value={lastName}/>
                </div>

                <div className='input-holder'>
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" name="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                </div>
                <div className='input-holder'>
                    <label htmlFor='phone'>Phone</label>
                    <div className='phone-holder'>
                      <input type="text" onChange={(e)=>setCountryCode(e.target.value) } value={countryCode} /><input type="text" id="phone" name="phone" onChange={(e)=>setPhone(e.target.value)} value={phone}/>
                    </div>
                </div>
                
                <button onClick={handleRegister}>Login</button>

            </form>

            <div className='footer-links'>
                Already have an account ?  <Link style={{color:"wheat", textDecoration:"none"}} to={'/login'}>Login</Link>
            </div>
    </div>
  )
}
