import React from 'react'
import Navbar from './Compontents/navbar/Navbar'
import Sidebar from './Compontents/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './Pages/Add/add'
import List from './Pages/List/list'
import Orders from './Pages/Orders/order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const url = "https://tomato-backend-3e3n.onrender.com"
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Orders url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
