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
              zIndex: "999",
              margin: "0 !important",
              padding: "0 !important",
            }}
            className="fa-4x"
          >
            <i
              style={{ marginLeft: "45vw", marginTop: "45vh" }}
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
