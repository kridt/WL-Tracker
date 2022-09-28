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
  const [activeWl, setActiveWl] = useState(
    JSON.parse(localStorage.getItem("activeWl"))
  );

  const { currentUser } = useAuth();

  /* useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(currentUser.uid)
      .get()
      .then((e) => {
        if (
          !e.data().activeWl === JSON.parse(localStorage.getItem("activeWl"))
        ) {
          setActiveWl(e.data().activeWl);
          localStorage.setItem("activeWl", e.data().activeWl);
        }
        console.log(e.data().activeWl);
        console.log(localStorage.getItem("activeWl"));
      });
  }, [activeWl]); */

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

  function startWl() {
    console.log("ja");
    localStorage.setItem("activeWl", true);
    setActiveWl(true);
  }

  function endWl() {
    localStorage.setItem("activeWl", false);
    setActiveWl(false);
  }
  return (
    <div className="dashboard">
      <Nav />

      {activeWl ? (
        <>
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

          <br />
          <br />
          <br />
          <br />
          <button onClick={() => endWl()}>Slut wl</button>
        </>
      ) : (
        <>
          <h1>ingen aktiv wl</h1>

          <button onClick={() => startWl()}>Start Wl?</button>
        </>
      )}
    </div>
  );
}
