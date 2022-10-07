import { Switch } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AddMatch.scss";
import { v4 } from "uuid";
import { weekNumber } from "../components/WeekNumber";
import { firestoreDb, realDatabase } from "../firebase";
import { useAuth } from "../context/AuthContext";
import LoadingOverlay from "../components/LoadingOverlay";
import { set, ref } from "firebase/database";
import { useEffect } from "react";

export default function AddMatch() {
  const [loading, setLoading] = useState(false);
  const [win, setWin] = useState(false);
  const [ballP, setBallP] = useState(50);
  const [advanStats, setAdvanStats] = useState(false);
  const uuid = v4();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const date = new Date().getTime();
  const [matchesNumber, setMatchesNumber] = useState([]);
  const [point, setPoint] = useState(1);

  useEffect(() => {
    firestoreDb
      .collection("users")
      .doc(currentUser.uid)
      .collection("wlResults")
      .get()
      .then((e) => {
        setMatchesNumber(e.size);
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const goalsFor = parseInt(e.target.goals.value);
    const goalOpp = parseInt(e.target.goalsOponent.value);
    const ballPos = parseInt(e.target.ballPossesion.value);
    const ballPosOpp = 100 - ballPos;
    const freeWin = e.target.freeWin.checked;
    const rageQuit = e.target.rageQuit.checked;
    const pass = parseInt(e.target.passes?.value);
    const passOp = parseInt(e.target.passesOponent?.value);
    const passPercent = parseInt(e.target.passPercent?.value);
    const passPercentOpp = parseInt(e.target.passPercentOponent?.value);
    const shots = parseInt(e.target.shots?.value);
    const shotsOponent = parseInt(e.target.shotsOponent?.value);
    const shotPercent = parseInt(e.target.shotPercent?.value);
    const shotPercentOponent = parseInt(e.target.shotPercentOponent?.value);
    const expectedGoals = parseInt(e.target.expectedGoals?.value);
    const expectedGoalsOponent = parseInt(e.target.expectedGoalsOponent?.value);
    const uid = uuid;

    if (goalsFor < goalOpp) {
      setWin(false);
      setPoint(1);
    }

    if (goalsFor > goalOpp) {
      setWin(true);
      setPoint(4);
    }

    const data = {
      time: date,
      goalOpp,
      goalsFor,
      ballPos,
      ballPosOpp,
      freeWin,
      rageQuit,
      advanStats,
      week: weekNumber,
      usersId: currentUser?.uid,
      extraStats: {
        pass,
        passOp,
        passPercent,
        passPercentOpp,
        shots,
        shotsOponent,
        shotPercent,
        shotPercentOponent,
        expectedGoals,
        expectedGoalsOponent,
      },
    };

    firestoreDb
      .collection("users")
      .doc(currentUser?.uid)
      .collection("wlResults")
      .doc(weekNumber + "_" + uid)
      .set({
        week: weekNumber,
        matchNumber: matchesNumber + 1,
        point: point,
        data,
      });
    console.log(data);
    setLoading(true);

    /* 
    set(ref(realDatabase, "/matches"), {
      matchId: uid,
      time: new Date().getTime(),
      data,
    });
 */
    /* 

    firestoreDb
      .collection("users")
      .doc(currentUser.uid)
      .collection("wlResults")
      .add({
        week: weekNumber,
        data,
      });
      */
    setLoading(false);
    navigate("/");
  }

  return (
    <div className="addMatch">
      <LoadingOverlay show={loading} />
      <h1>Tilføj kamp</h1>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <p>Mig</p>
          <p>opponent</p>
        </div>
        <div>
          <input
            className="goals"
            type="tel"
            name="goals"
            maxLength={2}
            placeholder={0}
            required
          />
          <label htmlFor="goals">Mål</label>
          <input
            className="goals"
            type="tel"
            name="goalsOponent"
            maxLength={2}
            placeholder={0}
            required
          />
        </div>
        <div>
          <input
            name="ballPossesion"
            type={"tel"}
            maxLength={2}
            onChange={(e) => setBallP(e.target.value)}
            placeholder={ballP}
            required
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <label>Boldbesiddelse %</label>
            {/* <input
              style={{ width: "100%" }}
              type={"range"}
              min={25}
              max={75}
              onChange={(e) => {
                setBallP(e.target.value);
              }}
            /> */}
          </div>
          <p>{100 - ballP}</p>
        </div>

        <div
          style={{
            margin: "0 5em",
          }}
        >
          <p style={{ width: "70px" }}>Rage quit</p>
          <Switch style={{ opacity: "100%" }} name="rageQuit" />
        </div>
        <div
          style={{
            margin: "0 5em",
          }}
        >
          <p style={{ width: "70px" }}>Free Win</p>
          <Switch style={{ opacity: "100%" }} name="freeWin" />
        </div>

        <fieldset>
          <legend>
            Dybtegående stats?{" "}
            <Switch
              style={{ opacity: "100%" }}
              onChange={(e) => setAdvanStats(e.target.checked)}
            />
          </legend>
          <br />

          {advanStats ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    margin: "0 auto",
                  }}
                  className="advanStats"
                >
                  <input
                    type="tel"
                    name="passes"
                    maxLength={3}
                    placeholder={0}
                    required
                  />
                  <label style={{ margin: "0 3em" }} htmlFor="goals">
                    Afleveringer
                  </label>
                  <input
                    type="tel"
                    name="passesOponent"
                    maxLength={3}
                    placeholder={0}
                    required
                  />
                </div>
                <div>
                  <input
                    name="passPercent"
                    type={"tel"}
                    maxLength={2}
                    placeholder={"50"}
                    required
                  />

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <label style={{ margin: "1.5em 2.7em", fontSize: ".97em" }}>
                      Afleverings %
                    </label>
                  </div>
                  <input
                    name="passPercentOponent"
                    type={"tel"}
                    maxLength={2}
                    placeholder={"50"}
                    required
                  />
                </div>
                <div>
                  <input required type="tel" maxLength={2} name="shots" />
                  <label style={{ margin: "0 3.36em" }} htmlFor="shots">
                    Antal skud
                  </label>
                  <input
                    required
                    type="tel"
                    maxLength={2}
                    name="shotsOponent"
                  />
                </div>
                <div>
                  <input required type="tel" maxLength={2} name="shotPercent" />
                  <label style={{ margin: "1.5em 4.03em" }} htmlFor="shots">
                    Skud %
                  </label>
                  <input
                    required
                    type="tel"
                    maxLength={2}
                    name="shotPercentOponent"
                  />
                </div>
                <div>
                  <input required type="text" max={4} name="expectedGoals" />
                  <label
                    style={{ margin: "0 4.1em", fontSize: ".8em" }}
                    htmlFor="shots"
                  >
                    Forventet mål
                  </label>
                  <input
                    required
                    type="text"
                    maxLength={4}
                    name="expectedGoalsOponent"
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <p>Ingen avanceret statistikker</p>
            </>
          )}
        </fieldset>

        <input
          style={{
            marginTop: "2em",
            backgroundColor: "rgb(217, 16, 84)",
            border: "none",
            padding: "1em 2em",
            borderRadius: "20px",
            marginLeft: "6.5em",
          }}
          type="submit"
          value="Tilføj Kamp"
        />
      </form>
      <Link to={"/"}>Tilbage</Link>
    </div>
  );
}
