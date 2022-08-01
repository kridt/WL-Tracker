import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMsg("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMsg("Tjek din email");
    } catch {
      setError("Der skete en fejl, prøv igen");
    }
    setLoading(false);
  }

  return (
    <div className="signUpDoc">
      <h2>Glemt adgangskode</h2>
      {error && alert(error)}
      <p>{msg}</p>
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
          <button disabled={loading} type="submit">
            Få en ny adgangskode
          </button>
        </div>
      </form>

      <p>
        Log ind
        <Link to={"/login"}> Klik her</Link>
      </p>
      <p>
        Har du ikke en profil endnu? <Link to="/signup">Tryk her</Link>
      </p>
    </div>
  );
}
