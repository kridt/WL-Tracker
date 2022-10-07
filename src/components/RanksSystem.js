import React, { useEffect } from "react";
import { useState } from "react";

export default function RanksSystem({ wl }) {
  var currentWl = wl;
  var [pointCount, setPointCount] = useState(0);

  useEffect(() => {
    currentWl.map((e) => {
      const goalScored = 4;
      const goalsAgains = 1;
      console.log(e);
      if (goalScored > goalsAgains) {
        setPointCount(pointCount + 4);
      } else {
        setPointCount(pointCount + 1);
      }
    });
  }, []);

  console.log(currentWl);

  return (
    <div>
      <p>rank</p>
      <p>Antal point: {pointCount}</p>
      <div>
        {currentWl.map((e) => {
          return <p>{e.point}</p>;
        })}
      </div>
    </div>
  );
}
