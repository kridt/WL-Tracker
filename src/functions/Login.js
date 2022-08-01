import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      return;
    } else {
      history("/");
    }
  }, [currentUser, history]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history("/");
    } catch {
      setError("Der skete en fejl, prøv igen");
    }
    setLoading(false);
  }

  return (
    <div className="signUpDoc">
      <h2>Log ind</h2>
      {error && alert(error)}
      <form onSubmit={(e) => handleSubmit(e)}>
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
          <button disabled={loading} type="submit">
            Log Ind
          </button>
        </div>
      </form>

      <p>
        Har du glemt din adgangskode?{" "}
        <Link to={"/forgotPassword"}>Klik her</Link>
      </p>
      <p>
        Har du ikke en profil endnu? <Link to="/signup">Tryk her</Link>
      </p>
    </div>
  );
}
