import Countdown from "countdown-js";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { firestoreDb } from "../firebase";
import AllUserInfo from "../functions/AllUserInfo";
import "./Dashboard.scss";

export default function Dashboard() {
  const allUserData = AllUserInfo();

  return (
    <div className="dashboard">
      <Nav />
      <h1>Nuværende Weekend Liga</h1>

      <Link className="addMatch" to={"/addMatch"}>
        Tilføj kamp
      </Link>
    </div>
  );
}
