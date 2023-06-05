import React, { useEffect, useState } from "react";
import ClosePng from "./close.png";
import image from "./bg1.png";
import useIsMobile from "./useIsMobile";

const PopupCard = ({ showCard = false, setShowCard }) => {
  const isMobile = useIsMobile();

  //   const [show, setShow] = useState(showCard);
  useEffect(() => {
    const body = document.querySelector("body");
    if (showCard) body.style.backgroundColor = "rgba(46, 46, 132, 1)";
    else body.style.backgroundColor = "transparent";
  }, [showCard]);
  return (
    <>
      <div
        className="card popup-card"
        style={{
          display: "block",
          top: showCard ? (isMobile ? "0%" : "50%") : "-100%",
        }}
      >
        <div
          className="card-header"
          onClick={() => {
            setShowCard(false);
            // setShowCard(false);
            // setImage(null);
            //   toggleCardHandler();
          }}
        >
          <img src={ClosePng} alt="close" />
        </div>
        <main className="card-main">
          <div>
            <div style={{ aspectRatio: "1" }}>
             {showCard?.photo && <img
                src={showCard?.photo}
                alt="Camera Capture"
                style={{
                  display: image ? "block" : "none",
                  objectFit: "cover",
                  width: "210px",
                  height: "210px",
                  // position: "absolute",
                }}
              />}
            </div>
          </div>
          <div
            className="form"
            style={{
              flexDirection: "column",
              display: "flex",
              gap: "1.3rem",
              transition: "0.3s",
              // opacity: image ? "1" : "0",
              // visibility: image ? "inherit" : "hidden",
            }}
          >
            <div>
              <p>{showCard?.name}</p>
              <div>{showCard?.message}</div>
            </div>
          </div>
        </main>
      </div>
      <div
        className="card-overlay"
        onClick={() => setShowCard(false)}
        style={{ display: showCard ? "block" : "none" }}
      ></div>
    </>
  );
};

export default PopupCard;
