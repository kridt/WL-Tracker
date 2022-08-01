import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [error, setError] = useState("");
  const { currentUser, logOut } = useAuth();
  /* const history = useNavigate(); */

  async function handleLogout() {
    setError("");

    try {
      await logOut();
      window.location.reload();
      /* history("/login"); */
    } catch {
      setError("Noget gik galt, prøv igen senere");
      alert(error);
    }
  }

  return (
    <div>
      <h1>Wellcome to your Dashboard</h1>
      <div>
        <p>Email:{currentUser?.email}</p>
      </div>
      <Link to="/updateProfile">Opdater profil</Link>
      <button onClick={handleLogout}>Log ud</button>
    </div>
  );
}
