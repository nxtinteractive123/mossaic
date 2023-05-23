// import axios from "axios";
import React, { useState, useRef } from "react";
import { storage } from "./Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { collection, addDoc } from "firebase/firestore";
import { db } from "./Firebase";
import CameraPng from "./camera.png";
import ClosePng from "./close.png";
import WebcamCapture from "./WebcamCapture";
import ReactCamera from "./ReactCamera";
function CameraNew({ getPhotos, setPhotos, showCard, setShowCard,style = {}}) {
  const [image, setImage] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  // const [showCard, setShowCard] = useState(false);

  const intialData = { name: "", message: "" };

  const [formData, setFormData] = useState(intialData);
  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const startCamera = () => {
  //   navigator.mediaDevices
  //     .getUserMedia({ video: true })
  //     .then((stream) => {
  //       videoRef.current.srcObject = stream;
  //       videoRef.current.play();
  //     })
  //     .catch((error) => {
  //       console.error("Error accessing camera", error);
  //     });
  // };
  const startCamera = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Standard API
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        })
        .catch((error) => {
          console.error("Error accessing camera", error);
        });
    } else if (navigator.getUserMedia) {
      // Chrome and Firefox
      navigator.getUserMedia(
        { video: true },
        (stream) => {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        },
        (error) => {
          console.error("Error accessing camera", error);
        }
      );
    } else {
      console.error("getUserMedia is not supported in this browser");
    }
  };
  
  // const takePicture = () => {
  //   const canvas = canvasRef.current;
  //   const videoWidth = videoRef.current.videoWidth;
  //   const videoHeight = videoRef.current.videoHeight;
  //   const aspectRatio = videoWidth / videoHeight;
  //   canvas.width = aspectRatio * canvas.height;

  //   const context = canvas.getContext("2d");
  //   // context.drawImage(videoRef.current, 0, 0, canvas.width * 2, canvas.height * 2);

  //   context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

  //   const dataURL = canvasRef.current.toDataURL("image/png");
  //   setImage(dataURL);
  // };
  const takePicture = () => {
    const canvas = canvasRef.current;
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;
    const aspectRatio = videoWidth / videoHeight;
    const canvasHeight = 720; // Set the canvas height to 720px
    canvas.width = aspectRatio * canvasHeight;
    canvas.height = canvasHeight;

    const context = canvas.getContext("2d");
    context.imageSmoothingEnabled = true;
    context.willReadFrequently = true;
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvas.width * 1,
      canvas.height * 1
    ); // Increase the canvas scale factor

    const dataURL = canvasRef.current.toDataURL("image/png");
    setImage(dataURL);
  };
  const toggleCardHandler = () => {
    setShowCard(!showCard);
    !showCard && startCamera();
    const body = document.querySelector("body");
    if (!showCard) body.style.backgroundColor = "rgba(46, 46, 132, 1)";
    else body.style.backgroundColor = "transparent";
    // if (showCard) document.querySelector("body").style.backgroundColor = "red";
  };

  const onSubmit = () => {
    if (!image || !formData.message || !formData.name) return;
    else setShowCard(false);
    const file = base64ToFile(image, formData.name);
    const storageRef = ref(storage, `/image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    const body = document.querySelector("body");
    body.style.backgroundColor = "transparent";
    setFormData(intialData);
    setImage(null);

    const data = {
      ...formData,
      photo: image,
      timestamp: new Date().getTime(),
    };
    setPhotos((prev) => [...prev, data]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},

      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);

          const database = addDoc(collection(db, "users"), data);

          console.log("Document written with ID: ", database.id);
        });
      }
    );
  };

  return (
    <div  >
      <button
        className="pri"
        onClick={toggleCardHandler}
        style={{
          width: "132px",
          margin: "auto",
          marginTop: "1.5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transition : '0.3s',
          ...style
        }}
      >
        <div
          style={{
            width: "16px",
            display: "grid",
            placeContent: "center",
            marginRight: "0.5rem",
          }}
        >
          <img
            alt="snap"
            src={CameraPng}
            style={{
              width: "100%",
              marginRight: "1rem",
              position: "relative",
              top: "-1px",
            }}
          />
        </div>
        <div>CLICK</div>
      </button>
      <div
        className="card-overlay"
        style={{ display: showCard ? "block" : "none" }}
        onClick={() => {
          setShowCard(false);
          const body = document.querySelector("body");
          body.style.backgroundColor = "transparent";
        }}
      ></div>
      <div>
        <canvas
        // willReadFrequently
          ref={canvasRef}
          style={{ display: "none", width: "300px", height: "300px" }}
        />
      </div>
      <div
        className="card"
        style={{
          display: showCard ? "block" : "none",
          visibility: showCard ? "visible" : "hidden",
          opacity: showCard ? "1" : "0",
        }}
      >
        <div
          className="card-header"
          onClick={() => {
            // setShowCard(false);
            // setImage(null);
            toggleCardHandler();
          }}
        >
          <img src={ClosePng} alt="close" />
        </div>
        <main className="card-main">
          {/* <div>
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
              /> */}
           {/*   <video
                ref={videoRef}
                style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              /> */}
      {/* <WebcamCapture showCard = {showCard} setImage = {setImage} image = {image} /> */}
<ReactCamera setImage = {setImage} image = {image}/>
            {/* </div>
            <button
              className="pri"
              onClick={!image ? takePicture : () => setImage(null)}
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
          </div> */}
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
              <label htmlFor="">Name : </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={formDataHandler}
              />
            </div>
            <div>
              <label htmlFor="">Your Message : </label>
              <textarea
                placeholder="Write Your Message"
                name="message"
                value={formData.message}
                onChange={formDataHandler}
              ></textarea>
            </div>

            <button
              className="pri"
              onClick={() => onSubmit()}
              style={{
                marginTop: "auto",
                marginBottom: "0",
              }}
            >
              SUBMIT
            </button>
          </div>
        </main>

        <div className="card-footer">
          {/* <div className="card-action-wrapper">
            {!image ? (
              <button className="pri" onClick={takePicture}>
                Take Picture
              </button>
            ) : (
              <>
                <button className="pri" onClick={() => setImage(null)}>
                  Retake
                </button>
              </>
            )}
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default CameraNew;

function base64ToFile(base64String, fileName) {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
}
