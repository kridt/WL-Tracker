import React, { useEffect } from "react";
import { useState } from "react";
import { auth, firestoreDb } from "../firebase";

export default function AllWeekendLeagueResults({ user }) {
  const [wlResults, setWlResults] = useState([]);
  const [standart, setStandart] = useState([]);

  useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(auth?.currentUser.uid)
      .collection("wlResults")
      .get()
      .then((res) => {
        const infoWl = [];

        res.forEach((data) => {
          infoWl.push(data.data());
        });

        setWlResults(infoWl);
        setStandart(infoWl);
      });
  }, []);

  function sortWeeks(e) {
    const sorted = [];
    if (parseInt(e) === 0) {
      setWlResults(standart);
      return;
    } else {
      standart.filter((w) => w.week === parseInt(e)).map((e) => sorted.push(e));
    }
    setWlResults(sorted);
  }

  return (
    <div>
      <div>
        <p>specifik uge?</p>
        <select
          name="weekNumber"
          id="week"
          onChange={(e) => sortWeeks(e.target.value)}
        >
          <option value="0">Alle</option>
          <option value="40">40</option>
          <option value="41">41</option>
        </select>
      </div>

      <p
        style={{
          marginBottom: "8em",
        }}
      >
        {wlResults.map((e) => {
          var win = false;

          var gameTime = e.data.time;
          console.log(gameTime);
          if (e.data.goalsFor > e.data.goalOpp) {
            win = true;
          }

          return (
            <div
              style={{
                backgroundColor: win ? "green" : "red",
                margin: "0 2em",
                marginBottom: "2em",
              }}
            >
              <p>Uge: {e.week}</p>
              <div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <p>{e.data.goalsFor}</p>
                  <p>-</p>
                  <p>{e.data.goalOpp}</p>
                </div>
                <div>kampen blev spillet: {gameTime}</div>
              </div>
            </div>
          );
        })}
      </p>
    </div>
  );
}
