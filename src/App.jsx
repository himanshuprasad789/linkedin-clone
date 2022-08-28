import React, { useState } from "react";
import { useEffect } from "react";

import "./App.css";
import "./App.scss";
const Header = React.lazy(()=>import("./components/Header/Header"));
// import Sidebar from "./components/Sidebar/Sidebar";
// import Feed from "./components/Feed/Feed";
const Feed = React.lazy(() => import("./components/Feed/Feed"));
const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar"));
const Widgets = React.lazy(() => import("./components/Widgets/Widgets"));
// import Widgets from "./components/Widgets/Widgets";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "./features/user/userSlice";
const Login =React.lazy(()=>import("./components/Login/Login"))
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "./features/user/userSlice";
import { auth } from "./firebase/firebase";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  
  useEffect(() => {
    const unsuscribe=onAuthStateChanged(auth, user => {
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
    return ()=>{
      unsuscribe()
    }
    // window.location.reload();
  }, []);
  
  console.log('user ->',user);
  console.warn("whole page updated");
  const whatToShow=user==='checking'?(<div style={{width:'100vw',height:'100vh',display:'flex',justifyContent: 'center',alignItems: 'center'}}>checking if you are already logged in</div>):
  user===null?(
    <>
    <React.Suspense fallback={<p style={{textAlign: 'center',height:'50px',}}>Loading Header</p>}>
        <Header />
      </React.Suspense>
    <React.Suspense fallback={<p style={{textAlign: 'center'}}>Loading Login</p>}>
      <Login />
    </React.Suspense>
  </>
  ):
  (
    <>
      <React.Suspense fallback={<p style={{textAlign: 'center'}}>Loading Header</p>}>
        <Header />
      </React.Suspense>
      <React.Suspense fallback={<div style={{width: '100%',height: '100vh',display: 'flex', justifyContent: 'center', alignItems:'center',fontSize:'24px',fontWeight:'bold'}}>Loading Content</div>}>
      <div className="app__body">
            <Sidebar />
            <React.Suspense fallback={<div style={{width: '100%',height: '50vh',display: 'flex', justifyContent: 'center', alignItems:'center',fontSize:'24px',fontWeight:'bold'}}>Loading Feed</div>}>
              <Feed />
            </React.Suspense>
            <Widgets />
          </div>
      </React.Suspense>
    </>
  );
  return (
    <div className="app">
      {whatToShow}
    </div>
  )
  // return (
  //   <div className="app">
  //     <React.Suspense fallback={<p style={{textAlign: 'center'}}>Loading Header...</p>}>
  //       <Header />
  //     </React.Suspense>
  //     <React.Suspense fallback={<div style={{width: '100%',height: '50vh',display: 'flex', justifyContent: 'center', alignItems:'center',fontSize:'24px',fontWeight:'bold'}}>Loading Page</div>}>
  //     {user
  //       ?
  //       <div className="app__body">
  //           <Sidebar />
  //           <React.Suspense fallback={<div style={{width: '100%',height: '50vh',display: 'flex', justifyContent: 'center', alignItems:'center',fontSize:'24px',fontWeight:'bold'}}>Loading Feed</div>}>
  //             <Feed />
  //           </React.Suspense>
  //           <Widgets />
  //         </div>:<Login />}
  //     </React.Suspense>
  //   </div>
  // );
}

export default App;
