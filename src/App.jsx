import { useState, useEffect } from "react"
import auth from "./appwrite/auth";
import service from "./appwrite/DB&Storage";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "./store/authSlice";
import { Button } from "./components";

function App() {
  const [loading, setLoading] = useState(true)
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
        setLoading(false)
      })
  }, [])


  return (
    <div className="w-full h-screen flex items-center justify-center bg-[#131315] text-white">

      {loading ? <h1>Loading...</h1> :
        <div>
          {status ? (
            <div>
              <h1>{data.userData.name}</h1>
              <Button name="logout" callback={() => {
                auth.logout()
                dispatch(logout())
                window.location.reload()
              }} />
            </div>
          ) :
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
      }

    </div>
  );
}

export default App
