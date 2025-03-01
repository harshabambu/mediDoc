import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Outlet} from 'react-router-dom'
import bot from './assets/bot1.png'
function RootLayout() {
  return (
    <div>
        <Header />
        <div className='min-h-screen'>
          <Outlet />
          <div className='fixed bottom-10 right-10 z-50 border bg-gray-300 border-gray-300 p-2 rounded-full'>
            <img src={bot} alt='bot' className='w-12 h-12' />
          </div>
        </div>
        <Footer />
    </div>
  )
}

export default RootLayout