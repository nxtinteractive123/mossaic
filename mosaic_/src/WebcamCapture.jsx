import React from "react";
import Webcam from "react-webcam";
import CameraPng from './camera.png'


  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'user', // or 'environment' for rear camera
  };
  
  const WebcamCapture = ({showCard, setImage, image}) => {
    console.log({showCard})
    const webcamRef = React.useRef(null);
    const capture = React.useCallback(function() {
        const imageSrc = webcamRef.current.getScreenshot();
      // console.log(imageSrc)
      setImage(imageSrc)
      },
      [webcamRef]  );
        
    
      
    
    return (
      <>
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
                }}
              />
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        {/* <button onClick={capture}>Capture photo</button> */}
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
      </>
    );
  };
  

  export default WebcamCapture
  