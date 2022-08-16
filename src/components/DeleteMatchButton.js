import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { firestoreDb } from "../firebase";

export default function DeleteMatchButton({ matchId }) {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  

  function deleteMatch() {
    if (window.confirm("Er du sikker på du  vil slette kampen?") === true) {
      firestoreDb
        .collection("users")
        .doc(currentUser?.uid)
        .collection("wlResults")
        .doc(matchId)
        .delete()
        .then(() => {
          navigate("/");
        });
    }
  }

  return (
    <>
      <button
        style={{
          color: "white",
          border: "none",
          backgroundColor: "rgb(217, 16, 84)",
          padding: "1em 2em",
          borderRadius: "15px",
        }}
        onClick={() => deleteMatch()}
      >
        Slet kamp
      </button>
    </>
  );
}
