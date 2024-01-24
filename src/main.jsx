import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import { RouterProvider, Routes, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Login, Signup } from './components/index.js'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      {/* <Route path='' element={<Home />} /> */}
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<Signup />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>
)
