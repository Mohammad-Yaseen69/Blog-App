import { useState, useEffect } from "react"
import auth from "./appwrite/auth";
import service from "./appwrite/DB&Storage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, toggleloading } from "./store/authSlice";
import { Footer, Header, Login } from "./components/";
import { Outlet, Route } from "react-router-dom";

function App() {
  const data = useSelector(state => state.auth.user)
  const status = useSelector(state => state.auth.status)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.getUser()
      .then((userData) => {
        if (userData) {
          dispatch(
            login({ userData })
          )
        }
        else {
          dispatch(
            logout()
          )
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch(toggleloading(false))
      })
  }, [])

  return (
    <div className="w-full h-screen relative  text-white">

      <Header />

      <Outlet />

      <Footer />

    </div>
  );
}

export default App
