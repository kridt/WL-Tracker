import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { firestoreDb } from "../firebase";

export default function AllUserInfo() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({});

  const allUserData = {
    authInfo: currentUser,
    userData,
  };

  useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(currentUser?.uid)
      .get()
      .then((data) => {
        setUserData(data.data());
      });
  }, [ currentUser]);

  return allUserData;
}
