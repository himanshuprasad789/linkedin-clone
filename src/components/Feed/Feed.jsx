import React, { useEffect, useState } from "react";
import "./Feed.scss";
import CreateIcon from "@mui/icons-material/Create";
import ImageIcon from "@mui/icons-material/Image";
import InputOption from "./InputOption/InputOption";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "./Post/Post";
import FlipMove from 'react-flip-move'
import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/user/userSlice";

const Feed = () => {
  const user=useSelector(selectUser)
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const postsRef=collection(db, "posts")    
    // console.log(postsRef.exists)
    const q=query(postsRef,orderBy('data.timestamp','desc'));
    const unsub=onSnapshot(q, snapshot => {
      console.log(snapshot)
      setPosts(
        snapshot.docs.map(doc => ({
          id: doc.id,
          data: doc.data().data
        }))
        );
        console.log('snapshotted')
      // console.log(posts);
    },err=>{
      console.log(err)
    })
    return unsub;
  }, []);

  const sendPost = e => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      data: {
        name: user.name,
        description: user.email,
        message: input,
        photoUrl: user.photoUrl ?? '',
        timestamp: serverTimestamp()
      }
    });
    setInput('')
  };
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button type="submit" onClick={sendPost}>
              Send
            </button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70b5f9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#COCBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>
      <FlipMove>
      {posts.map(
        ({ id, data: { name, description, message, photoUrl, timestamp } }) =>
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
            timestamp={timestamp}
          />
      )}
      </FlipMove>
    </div>
  );
};

export default Feed;
