import React, { useEffect } from "react";
import { useState } from "react";
import { auth, firestoreDb } from "../firebase";

export default function Last5results() {
  const [allWl, setAllWl] = useState([]);
  var points = 0;

  var last5 = allWl.slice(-5);
  useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(auth?.currentUser.uid)
      .collection("wlResults")
      .get()
      .then((e) => {
        var wl = [];
        e.forEach((e) => {
          wl.push(e.data());
        });
        setAllWl(wl.sort((a, b) => a.matchNumber - b.matchNumber));
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: "gray",
        border: "1px solid rgb(217, 16, 84)",
        margin: "1em",
        marginBottom: "3em",
      }}
    >
      <p style={{ textAlign: "center", marginTop: "0" }}>
        Form de sidste 5 kampe
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          flexDirection: "row-reverse",
        }}
      >
        {last5?.map((e) => {
          var win = false;

          if (e.data.goalsFor > e.data.goalOpp) {
            win = true;
            points = points + 4;
          }

          if (e.data.goalsFor < e.data.goalOpp) {
            win = false;
            points = points + 1;
          }
          console.log(points);
          return (
            <div>
              {win ? (
                <p
                  style={{
                    backgroundColor: "green",
                    width: "20px",
                    height: "20px",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  W
                </p>
              ) : (
                <p
                  style={{
                    backgroundColor: "red",
                    width: "20px",
                    height: "20px",
                    textAlign: "center",
                    alignContent: "center",
                  }}
                >
                  L
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
