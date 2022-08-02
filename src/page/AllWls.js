import React from "react";
import AllWeekendLeagueResults from "../components/AllWeekendLeagueResults";
import Nav from "../components/Nav";
import AllUserInfo from "../functions/AllUserInfo";
import "./AllWls.scss";

export default function AllWls() {
  const userInfo = AllUserInfo();

  return (
    <div className="allWls">
      <Nav />
      <h1>Alle dine resultater</h1>
      <AllWeekendLeagueResults user={userInfo} />
    </div>
  );
}
