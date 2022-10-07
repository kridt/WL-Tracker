import React, { useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./SignUp.scss";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlay from "../components/LoadingOverlay";

export default function SignUp() {
  const [showHidePassword, setShowHidePassword] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const onlineIdRef = useRef();
  const { signUp } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useNavigate();
  const [bigLetter, setBigLetter] = useState(false);
  const [sixDig, setSixDig] = useState(false);

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

  function checkUppercase(str) {
    for (var i = 0; i < str.length; i++) {
      if (
        str.charAt(i) == str.charAt(i).toUpperCase() &&
        str.charAt(i).match(/[a-z]/i)
      ) {
        return true;
      }
    }
    return false;
  }

  function passwordGood(e) {
    var string = e.target.value;
    if (e.target.value.length >= 6) {
      setSixDig(true);
    } else {
      setSixDig(false);
    }

    setBigLetter(checkUppercase(string));
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
          <div>
            Din adgangskode skal indeholde
            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <div style={{ color: bigLetter ? "green" : "red" }}>
                Stort bogstav
              </div>
              <div style={{ color: sixDig ? "green" : "red" }}>6 tegn</div>
            </div>
          </div>
          <input
            ref={passwordRef}
            type={showHidePassword ? "text" : "password"}
            name="password"
            placeholder="Vælg en adgangskode"
            required
            onChange={(e) => passwordGood(e)}
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
