import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function MatchMiniPreview({ matchInfomation }) {
  const match = matchInfomation;

  return (
    <Link style={{ textDecoration: "none" }} to={"/match/" + match.data?.id}>
      <div>
        <div
          style={{
            display: "flex",
            color: "white",
          }}
        >
          <p>{match.data?.goalsFor}</p>
          <p> - </p>
          <p>{match.data?.goalOpp}</p>
        </div>
      </div>
    </Link>
  );
}
