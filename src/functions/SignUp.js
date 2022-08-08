import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import { firestoreDb } from "../firebase";
import LoadingOverlay from "../components/LoadingOverlay";

export default function SignUp() {
  const [showHidePassword, setShowHidePassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const onlineIdRef = useRef();
  const { signUp, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Adgangskoderne er ikke ens");
    }

    try {
      setError("");
      setLoading(true);
      await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        onlineIdRef.current.value
      );

      history("/");
    } catch {
      setError("Der skete en fejl i auth");
    }

    setLoading(false);
  }

  return (
    <div className="signUpDoc">
      <h2>Opret profil</h2>
      <LoadingOverlay show={loading} />
      {error && alert(error)}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            ref={onlineIdRef}
            type={"text"}
            name="onlineId"
            placeholder="Dit PSN/online Id"
            required
          />
        </div>
        <div>
          <input
            ref={emailRef}
            type={"email"}
            name="email"
            placeholder="Din email"
            required
          />
        </div>
        <div>
          <input
            ref={passwordRef}
            type={showHidePassword ? "text" : "password"}
            name="password"
            placeholder="Vælg en adgangskode"
            required
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <p>Vis adgangskode</p>
          <input
            type="checkbox"
            onClick={() => setShowHidePassword(!showHidePassword)}
          />
        </div>
        <div>
          <input
            ref={passwordConfirmRef}
            type={showHidePassword ? "text" : "password"}
            name="passwordConfirm"
            placeholder="Gentag adgangskode"
            required
          />
        </div>

        <div>
          <button disabled={loading} type="submit">
            Opret
          </button>
        </div>
      </form>
      <p>
        Har du allerede en profil? <Link to="/login">Log ind her</Link>
      </p>
    </div>
  );
}
