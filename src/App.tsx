import React, { useEffect, useState } from 'react';

import Gif from './Components/Gif'
import './App.css'

interface Ipost {
  text: string,
  gif: string,
  bgcolor: string
}

function App() {
  const [post, setPost] = useState<Ipost>({
    text: "",
    gif: "",
    bgcolor: "#fff"
  })

  const [postArray, setPostArray] = useState<Ipost[]>(JSON.parse(localStorage.getItem('POSTS') || " []"));
  const [gifModal, setGifModal] = useState<Boolean>(false);
  useEffect(() => {
    localStorage.setItem('POSTS', JSON.stringify(postArray));
  }, [postArray])
  return (
    <div className="App">
      <div className="container">
        <div className="PostContainer" style={{
          backgroundColor: `#${post.bgcolor}`
        }}>

          <textarea style={{
            backgroundColor: `#${post.bgcolor}`
          }} placeholder="Enter post message" className="TextInput" cols={30} value={post.text} rows={2} onChange={(e) => {
            const val = e.target.value;
            setPost({ ...post, text: val })
          }}></textarea>

          <div className="GifInputArea">
            {post.gif && (<img src={post.gif} alt="gif" style={{
              borderRadius: "10px",
              width: "150px",
              height: "150px"
            }} />)}
          </div>


          {/* BUTTONS FOR POST,COLOR,OPEN GIF */}
          <div className="ButtonsContainer">
            <button className="Button GifButton" onClick={() => {
              setGifModal(!gifModal)
            }}><i className="fas fa-film"></i> Gif</button>
            <button
              className="Button ColorButton"
              onClick={() => {
                let randomColor = Math.floor(Math.random() * 16777215).toString(16);//generating randome color
                setPost({ ...post, bgcolor: randomColor })
              }}
            ><i className="fas fa-palette"></i> Color</button>
            <button className="Button PostButton"
              disabled={post.text == ""}
              onClick={() => {
                setPost({ ...post, text: post.text.trim() })
                setPostArray((prev: Ipost[]) => [...prev, post])
                setPost({
                  text: "",
                  gif: "",
                  bgcolor: "ffff"
                })

              }}
            ><i className="fas fa-plus"></i> POST </button>
          </div>
          {
            gifModal && <div className="GifContainer">
              <Gif colseModal={setGifModal} getUrl={(val) => setPost({ ...post, gif: val })} />
            </div>
          }
        </div>

        {
          postArray.length === 0 ? (
            <h3>No Posts</h3>
          ) : (
            <h3>Posts</h3>
          )
        }

        <div className="PostList">
          {
            postArray?.map((post: Ipost, index: number) => (
              <div key={index} className="Post" style={{ backgroundColor: `#${post.bgcolor}` }}>
                <div className="delete" onClick={() => {
                  setPostArray(postArray?.filter(del => del.text !== post.text))
                }}><i className="fas fa-trash-alt"></i></div>
                <h4>{post.text}</h4>
                {
                  post.gif && (
                    <img src={post.gif} className="PostImg" width="150px" height="150px" />
                  )
                }

              </div>
            ))
          }
        </div>
      </div>


    </div>
  );
}

export default App;
