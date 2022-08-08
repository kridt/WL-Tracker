import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Last5results from "../components/Last5results";
import Nav from "../components/Nav";
import { useAuth } from "../context/AuthContext";
import { firestoreDb } from "../firebase";
import "./Dashboard.scss";

export default function Dashboard() {
  const [single, setSingle] = useState(false);
  const [allMatches, setAllMatches] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(currentUser?.uid)
      .collection("wlResults")
      .get()
      .then((data) => {
        data.forEach((e) => {
          console.log(e.data());
        });

        if (data.size === 1) {
          console.log("single");
          setSingle(true);
        }
        if (data.size === !1) {
          console.log("flertal");
        }

        setAllMatches(data);
      });
  }, [setAllMatches, currentUser]);

  return (
    <div className="dashboard">
      <Nav />
      <h1>Nuværende Weekend Liga</h1>
      <p>
        Du har spillet {allMatches.size} {single ? "Kamp" : "kampe"}
      </p>
      <div>
        <Last5results />
      </div>
      <Link className="addMatch" to={"/addMatch"}>
        Tilføj kamp
      </Link>
    </div>
  );
}
