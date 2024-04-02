/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/Firebase.init";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic/useAxiosPublic";

export const AuthContext = createContext(null);

const auth = getAuth(app);
const Googleprovider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axiosPublic = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [loding, setIsloading] = useState(true);
  const handleRegisterWithEmailAndPass = (email, password) => {
    setIsloading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handleUpdate = (name, photourl) => {
    setIsloading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photourl,
    });
  };

  const handleLogin = (email, password) => {
    setIsloading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handleLogOut = async () => {
    setIsloading(true);
    return signOut(auth);
  };

  const handleSignGoolge = () => {
    return signInWithPopup(auth, Googleprovider);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setIsloading(true);
      if (currentUser) {
        const userEmail = { email: currentUser.email };
        const res = await axiosPublic.post("/jwt", userEmail);
      }
      setUser(currentUser);

      // console.log(res.data);

      setIsloading(false);
    });
    return () => unSubscribe();
  }, [axiosPublic, user]);

  const AuthInfo = {
    handleLogin,
    handleRegisterWithEmailAndPass,
    handleLogOut,
    handleSignGoolge,
    handleUpdate,
    loding,
    user,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
