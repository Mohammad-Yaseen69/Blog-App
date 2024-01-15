import config from "./config/config"
import { useState } from "react"
import auth from "./appwrite/auth";
import service from "./appwrite/DB&Storage";

function App() {

  console.log(auth);

  return (
    <>
    <button onClick={() => {
      service.createPost(
        {
          Title: "Post 1",
          Content: "Content 1",
          slug: "post-1",
          Img: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
          Status: "active",
          UserId:"yaseen"
        }
      )
    }}>Upload Data</button>
    </>
  )
}

export default App
