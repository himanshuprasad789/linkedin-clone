import { useEffect } from "react";

import "./App.css";
import "./App.scss";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Feed from "./components/Feed/Feed";
import Widgets from "./components/Widgets/Widgets";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";
import Login from "./components/Login/Login";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./features/user/userSlice";
import { auth } from "./firebase/firebase";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  console.log(user);
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // setTimeout(()=>{
        dispatch(
          login({
            name: user.displayName ? user.displayName : user.email,
            // name:user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
            email: user.email
          })
        );
        console.log("auth changed");
        // },1000)
      } else {
        dispatch(logout());
      }
    });
    // window.location.reload();
  }, []);
  console.warn("whole page updated");
  return (
    <div className="app">
      <Header />
      {!user
        ? <Login />
        : <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets />
          </div>}
    </div>
  );
}

export default App;
