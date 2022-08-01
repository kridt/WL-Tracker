import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const onlineIdRef = useRef();
  const { signUp } = useAuth();
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
      await signUp(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Der skete en fejl");
    }
    setLoading(false);
  }

  return (
    <div className="signUpDoc">
      <h2>Opret profil</h2>
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
            type={"text"}
            name="email"
            placeholder="Din email"
            required
          />
        </div>
        <div>
          <input
            ref={passwordRef}
            type={"password"}
            name="password"
            placeholder="Vælg en adgangskode"
            required
          />
        </div>
        <div>
          <input
            ref={passwordConfirmRef}
            type={"password"}
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