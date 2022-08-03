import React, { useState } from "react";
import "./AddMatch.scss";

export default function AddMatch() {
  const [ballP, setBallP] = useState(50);
  console.log(ballP);

  return (
    <div className="addMatch">
      <h1>Tilføj kamp</h1>

      <form>
        <div>
          <input
            className="goals"
            type="tel"
            name="goalsFor"
            maxLength={2}
            placeholder={0}
          />
          <label htmlFor="goals">Mål</label>
          <input
            className="goals"
            type="tel"
            name="goalsAgains"
            maxLength={2}
            placeholder={0}
          />
        </div>
        <div>
          <input
            name="ballPossesion"
            type={"tel"}
            maxLength={2}
            onChange={(e) => setBallP(e.target.value)}
            defaultValue={50}
          />
          {/* <p>{100 - ballP}</p> */}
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
      </form>
    </div>
  );
}
