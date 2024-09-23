import React from 'react'
import {Profile} from './UserProfile/Profile'
import { AboutMe } from './UserProfile/AboutMe'

export const AdminDashboard = () => {
  return (
    <div className='flex flex-col justify-center content-center items-center w-full'>
    
       <Profile />
      
       <AboutMe/>
      

    </div>
  )
}
