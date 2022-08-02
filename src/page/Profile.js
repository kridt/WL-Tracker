import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import SignOutButton from "../components/SignOutButton";
import AllUserInfo from "../functions/AllUserInfo";
import "./Profile.scss";

export default function Profile() {
  const allUserData = AllUserInfo();

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: "center" }}>Profil info</h1>
      <div>
        <p>
          <strong>Email: </strong> {allUserData?.authInfo?.email}
        </p>
        <p>
          <strong>OnlineId/PSN:</strong> {allUserData?.userData?.onlineId}
        </p>
      </div>
      <SignOutButton />
      <Link to="/updateProfile">Opdater profil</Link>
    </div>
  );
}
