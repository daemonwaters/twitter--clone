import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome";
import SignIn from "./components/SignIn";
import "./styles/App.css";
import Timeline from "./components/Timeline";
import Profile from "./components/Profile";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { auth, db } from "./firebaseconfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { addUser } from "./Helpers/AddUser";
import TweetModal from "./components/TweetModal";

export interface Access {
  hasAccess: boolean | undefined;
  status: string | undefined;
  accessId: string | undefined;
}

function App() {
  const [access, setAccess] = useState<Access>({
    hasAccess: undefined,
    status: undefined,
    accessId: undefined,
  });
  const [modal,setModal] = useState<boolean>(false);
  const [values] = useCollectionData(collection(db,"users"))
  const currentUser = values?.find(user=> user.id === access.accessId )

  const handleModal = ()=>{
    setModal(true)
  }


  const handleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    setAccess({ ...access, status: "loading" });
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;
      addUser(user.displayName,values, user.uid, user.photoURL,setAccess);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
        <TweetModal setModal={setModal} currentUser={currentUser} modal={modal}/>
      <Routes>
        <Route path="/" element={<Welcome handleSignUp={handleSignUp} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route
          path="/timeline"
          element={
            <Timeline
              handleModal={handleModal}
              hasAccess={access.hasAccess}
              status={access.status}
              currentUser={currentUser}
            />
          }
        />
        <Route
          path="/profile"
          element={<Profile handleModal={handleModal} users={values} accessId={access.accessId} />}
        />
      </Routes>
    </React.Fragment>
  );
}

export default App;
