import React from "react";
import Nav from "../components/Nav";
import AllUserInfo from "../functions/AllUserInfo";
import "./Dashboard.scss";

export default function Dashboard() {
  const allUserData = AllUserInfo();

  console.log(allUserData);

  return (
    <div className="dashboard">
      <Nav />
      <h1>Nuværende Weekend Liga</h1>
      <div></div>
    </div>
  );
}
