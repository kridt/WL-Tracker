import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeleteMatchButton from "../components/DeleteMatchButton";
import { useAuth } from "../context/AuthContext";
import { firestoreDb } from "../firebase";
import "./MatchInfo.scss";

export default function MatchInfo() {
  const matchId = useParams().id;
  const [match, setMatch] = useState({});
  const { currentUser } = useAuth();

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
  }, [setMatch, matchId, currentUser]);

  console.log(match);
  return (
    <div className="matchInfo">
      <div className="topDiv">
        <p>Mig</p>
        <div className="result">
          <h1>{match.data?.goalsFor}</h1>
          <h1>-</h1>
          <h1>{match.data?.goalOpp}</h1>
        </div>
        <p>Opo</p>
      </div>

      <div className="stats">
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <p>{match?.data?.ballPos}%</p>
            <p>Boldbessidelse</p>
            <p>{match?.data?.ballPosOpp}%</p>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className="home_box">
              <div
                style={{ width: `${match?.data?.ballPos}%` }}
                className="home_box_fill"
              ></div>
            </div>
            <div className="away_box">
              <div
                style={{ width: `${100 - match?.data?.ballPos}%` }}
                className="away_box_fill"
              ></div>
            </div>
          </div>
        </div>
        {match?.data?.advanStats ? (
          <>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{match?.data?.extraStats.expectedGoals}</p>
                <p>Forventet mål</p>
                <p>{match?.data?.extraStats.expectedGoalsOponent}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="home_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.expectedGoals /
                          (match?.data?.extraStats.expectedGoalsOponent +
                            match?.data?.extraStats.expectedGoals)) *
                          100
                      )}%`,
                    }}
                    className="home_box_fill"
                  ></div>
                </div>
                <div className="away_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.expectedGoalsOponent /
                          (match?.data?.extraStats.expectedGoalsOponent +
                            match?.data?.extraStats.expectedGoals)) *
                          100
                      )}%`,
                    }}
                    className="away_box_fill"
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{match?.data?.extraStats.shots}</p>
                <p>Antal skud</p>
                <p>{match?.data?.extraStats.shotsOponent}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="home_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.shots /
                          (match?.data?.extraStats.shotsOponent +
                            match?.data?.extraStats.shots)) *
                          100
                      )}%`,
                    }}
                    className="home_box_fill"
                  ></div>
                </div>
                <div className="away_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.shotsOponent /
                          (match?.data?.extraStats.shots +
                            match?.data?.extraStats.shotsOponent)) *
                          100
                      )}%`,
                    }}
                    className="away_box_fill"
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{match?.data?.extraStats.shotPercent}%</p>
                <p>Skud %</p>
                <p>{match?.data?.extraStats.shotPercentOponent}%</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="home_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.shotPercent /
                          (match?.data?.extraStats.shotPercentOponent +
                            match?.data?.extraStats.shotPercent)) *
                          100
                      )}%`,
                    }}
                    className="home_box_fill"
                  ></div>
                </div>
                <div className="away_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.shotPercentOponent /
                          (match?.data?.extraStats.shotPercentOponent +
                            match?.data?.extraStats.shotPercent)) *
                          100
                      )}%`,
                    }}
                    className="away_box_fill"
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{match?.data?.extraStats.pass}</p>
                <p>Antal afleveringer</p>
                <p>{match?.data?.extraStats.passOp}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="home_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.pass /
                          (match?.data?.extraStats.passOp +
                            match?.data?.extraStats.pass)) *
                          100
                      )}%`,
                    }}
                    className="home_box_fill"
                  ></div>
                </div>
                <div className="away_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.passOp /
                          (match?.data?.extraStats.passOp +
                            match?.data?.extraStats.pass)) *
                          100
                      )}%`,
                    }}
                    className="away_box_fill"
                  ></div>
                </div>
              </div>
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <p>{match?.data?.extraStats.passPercent}%</p>
                <p>Afleverings %</p>
                <p>{match?.data?.extraStats.passPercentOpp}%</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="home_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.passPercent /
                          (match?.data?.extraStats.passPercentOpp +
                            match?.data?.extraStats.passPercent)) *
                          100
                      )}%`,
                    }}
                    className="home_box_fill"
                  ></div>
                </div>
                <div className="away_box">
                  <div
                    style={{
                      width: `${Math.round(
                        (match?.data?.extraStats.passPercentOpp /
                          (match?.data?.extraStats.passPercentOpp +
                            match?.data?.extraStats.passPercent)) *
                          100
                      )}%`,
                    }}
                    className="away_box_fill"
                  ></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <p style={{ textAlign: "center" }}>
              Der er ikke valgt dybtegående statistikker for denne her kamp
            </p>
          </>
        )}
      </div>

      <Link to={"/"}>Tilbage</Link>

      <div
        style={{
          textAlign: "center",
          margin: "2em auto",
        }}
      >
        <DeleteMatchButton matchId={matchId} />
      </div>
    </div>
  );
}
