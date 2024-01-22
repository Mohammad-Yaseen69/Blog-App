import { useState, useEffect } from "react"
import auth from "./appwrite/auth";
import service from "./appwrite/DB&Storage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, toggleloading } from "./store/authSlice";
import { Footer, Header } from "./components/";
import { Outlet } from "react-router-dom";

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
      {/* {loading ? <h1>Loading...</h1> :

        <div>
          {status ? (
            // If the user is logged in
            <div>
              <h1>{data.userData.name}</h1>
              <Button name="logout" callback={() => {
                auth.logout()
                dispatch(logout())
                window.location.reload()
              }} />
              <img src="../assest/logo" className="w-[100px]" alt="" />
            </div>
          ) :
            // If the user is not logged in
            (
              <Button
                name="login"
                callback={() => {
                  auth.login({
                    email: "yaseen@gmail.com",
                    password: "test12345"
                  }).then((data) => {
                    dispatch(login({ userData: data }))
                    window.location.reload()
                  })
                }} />
            )}
        </div>
      } */}
      <Outlet />

      <div className="h-[100vh]  w-full "></div>

      <Footer />

    </div>
  );
}

export default App
