import React from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import SignOutButton from "../components/SignOutButton";
import AllUserInfo from "../functions/AllUserInfo";
import "./Profile.scss";

export default function Profile() {
  const allUserData = AllUserInfo();

  console.log(allUserData);

  return (
    <div>
      <Nav />
      <h1 style={{ textAlign: "center" }}>Profil info</h1>
      <img
        alt="test"
        style={{ maxWidth: "100px", height: "auto" }}
        src={
          allUserData?.userData?.profilePic || "https://via.placeholder.com/100"
        }
      />
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
