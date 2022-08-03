import Countdown from "countdown-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MatchMiniPreview from "../components/MatchMiniPreview";
import Nav from "../components/Nav";
import { useAuth } from "../context/AuthContext";
import { firestoreDb } from "../firebase";
import AllUserInfo from "../functions/AllUserInfo";
import "./Dashboard.scss";

export default function Dashboard() {
  const allUserData = AllUserInfo();
  const [allMatches, setAllMatches] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(currentUser?.uid)
      .collection("wlResults")
      .get()
      .then((data) => {
        /* data.forEach((e) => {
          console.log(e.data());
        }); */
        setAllMatches(data);
      });
  }, []);

  return (
    <div className="dashboard">
      <Nav />
      <h1>Nuværende Weekend Liga</h1>
      <p>Du har spillet {allMatches.size} kampe</p>
      <Link className="addMatch" to={"/addMatch"}>
        Tilføj kamp
      </Link>
      <div>
        {allMatches &&
          allMatches.docs?.map((e) => {
            const match = e.data();
            console.log(match);
            return (
              <MatchMiniPreview key={match.data?.id} matchInfomation={match} />
            );
          })}
      </div>
    </div>
  );
}
