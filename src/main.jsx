import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import { RouterProvider, Routes, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { LoginPage, SignupPage ,CreatePost , AllPost ,Home, Post ,EditPost} from './pages'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/' element={<Home />} />
      <Route path='login' element={<LoginPage />} />
      <Route path='sign-up' element={<SignupPage />} />
      <Route path='Create-Post' element={<CreatePost />} />
      <Route path='posts' element={<AllPost />} />
      <Route path='post/:slug' element={<Post />} />
      <Route path='edit-post/:slug' element={<EditPost />} />
    </Route>
  )
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   <RouterProvider router={router}/>
  </Provider>
)
