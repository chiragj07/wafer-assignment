import React from 'react'
import { useEffect } from 'react'


const Home = () => {
    const handleLogout = ()=>{
        localStorage.removeItem('userDetails')
        localStorage.removeItem('isWaferEmailVerified')
        window.location.replace('/')
    }
    useEffect(()=>{
        const user = localStorage.getItem('userDetails');
        console.log(user)
        if(!user){
            window.location.replace('/')
        }
    },[])
  return (
    <div className='home'>Hello Welcome to our Website 
                <button onClick={handleLogout}>Logout</button>
    
    </div>
  )
}

export default Home