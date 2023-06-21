import React, { useState, useRef } from "react";
import {Camera} from "react-camera-pro";
import CameraPng from './camera.png'

const ReactCamera = ({image , setImage}) => {
  const camera = useRef(null);
//   const [image, setImage] = useState(null);


  console.log({image})

  const capture = () => setImage(camera.current.takePhoto())

  return (
    <div>
    <label htmlFor="">Image</label>
    <div style={{ aspectRatio: "1", position: "relative" }}>
       <img
        src={image}
        alt="Camera Capture"
        style={{
          display: image ? "block" : "none",
          objectFit: "cover",
          width: "210px",
          height: "210px",
          position: "absolute",
          zIndex : '1',
          transform : 'transform: rotateY(180deg)',
          zIndex : '99999'

        }}
      />
      <Camera ref={camera} isImageMirror={false} />
      </div>
            <button
              className="pri"
              onClick={!image ? capture : () => setImage(null)}
              style={{
                width: "132px",
                margin: "auto",
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "16px",
                  display: "grid",
                  placeContent: "center",
                  marginRight: "0.5rem",
                }}
              >
                <img
                  alt="snap"
                  src={CameraPng}
                  style={{
                    height: "auto !important",
                    width: "100%",
                    marginRight: "1rem",
                    position: "relative",
                    top: "-1px",
                  }}
                />
              </div>
              <div>{!image ? "CLICK" : "RETAKE"}</div>
            </button>
          </div>
  );
}

export default ReactCamera