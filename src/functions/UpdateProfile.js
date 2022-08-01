import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Adgangskoderne er ikke ens");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history("/");
      })
      .catch(() => {
        setError("Der skete en fejl");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className="signUpDoc">
      <h2>Opdater profil</h2>
      {error && alert(error)}
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            ref={emailRef}
            type={"text"}
            name="email"
            defaultValue={currentUser?.email}
          />
        </div>
        <div>
          <div style={{ marginTop: "1em" }}>
            <label>Adgangskode</label>
          </div>
          <input
            style={{ margin: 0 }}
            ref={passwordRef}
            type={"password"}
            name="password"
            placeholder="Efterlad blank for ikke at ændre"
          />
        </div>
        <div>
          <div style={{ marginTop: "1em" }}>
            <label>Gentag adgangskode</label>
          </div>
          <input
            style={{ margin: 0 }}
            ref={passwordConfirmRef}
            type={"password"}
            name="passwordConfirm"
            placeholder="Efterlad blank for ikke at ændre"
          />
        </div>

        <div>
          <button disabled={loading} type="submit">
            Ændre
          </button>
        </div>
      </form>
      <Link to={"/"}>Tilbage</Link>
    </div>
  );
}
