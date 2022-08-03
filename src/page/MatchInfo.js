import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { firestoreDb } from "../firebase";

export default function MatchInfo() {
  const matchId = useParams().id;
  const [match, setMatch] = useState({});
  const { currentUser } = useAuth();

  console.log(matchId);

  useEffect(() => {
    console.log(currentUser);
    firestoreDb
      .collection("users")
      .doc(currentUser?.uid)
      .collection("wlResults")
      .doc(matchId)
      .get()
      .then((e) => {
        setMatch(e.data());
      });
  }, [setMatch, matchId, firestoreDb, currentUser]);

  console.log(match);
  return (
    <div>
      <div className="result">
        <h2>{match.data?.goalsFor}</h2>
        <h2>-</h2>
        <h2>{match.data?.goalOpp}</h2>
      </div>

      <Link to={"/"}>Tilbage</Link>
    </div>
  );
}
