import React from "react";

export default function LoadingOverlay({ show }) {
  return (
    <>
      {show ? (
        <>
          <div
            style={{
              position: "absolute",
              top: 0,
              backgroundColor: "grey",
              opacity: "50%",
              height: "100vh",
              width: "100vw",
            }}
            className="fa-4x"
          >
            <i
              style={{
                marginTop: "5em",
              }}
              className="fas fa-spinner fa-spin"
            ></i>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
