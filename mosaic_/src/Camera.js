// import axios from "axios";
import React, { useState, useRef } from "react";
import { storage } from "../src/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { collection, addDoc } from "firebase/firestore";
import { db } from "../src/Firebase";
import CameraPng from "./camera.png";
import ClosePng from "./close.png";
function Camera({ getPhotos, setPhotos }) {
  const [image, setImage] = useState(null);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [showCard, setShowCard] = useState(false);

  const intialData = { name: "", message: "" };

  const [formData, setFormData] = useState(intialData);
  const formDataHandler = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const startCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((error) => {
        console.error("Error accessing camera", error);
      });
  };

  const takePicture = () => {
    const canvas = canvasRef.current;
    const videoWidth = videoRef.current.videoWidth;
    const videoHeight = videoRef.current.videoHeight;
    const aspectRatio = videoWidth / videoHeight;
    canvas.width = aspectRatio * canvas.height;

    const context = canvas.getContext("2d");
    // context.drawImage(videoRef.current, 0, 0, canvas.width * 2, canvas.height * 2);

    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURL = canvasRef.current.toDataURL("image/png");
    setImage(dataURL);
  };

  const toggleCardHandler = () => {
    setShowCard(!showCard);
    !showCard && startCamera();
  };

  const onSubmit = () => {
    if (!image || !formData.message || !formData.name) return;
    else setShowCard(false);
    const file = base64ToFile(image, formData.name);
    // console.log(file);
    // axios
    //   .post("https://woven-benefit-365108-default-rtdb.asia-southeast1.firebasedatabase.app/imagedata.json", submitData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((__) => {
    //     getPhotos();
    //     setFormData(intialData);
    //     setImage(null);
    //   });

    // const imageRef = ref(storage, "image");
    // uploadBytes(imageRef, image)
    //   .then(() => {
    //     getDownloadURL(imageRef)
    //       .then((url) => {
    //         setUrl(url);
    //       })
    //       .catch(() => {
    //         console.log(error.message, "hghgjh");
    //       });
    //     setImage(null);
    //   })
    //   .catch((error) => {
    //     console.log(error.message);
    //   });

    const storageRef = ref(storage, `/image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    console.log(storageRef, uploadTask);
    setFormData(intialData);
    setImage(null);
    // const database = addDoc(collection(db,"users"),submitData)

    const data = {
      ...formData,
      photo: image,
      timestamp: new Date().getTime(),
    };
    setPhotos((prev) => [...prev, data]);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        ); // update progress
        // setImage(percent);
        console.log(percent);
      },

      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url);
          // setPhotos

          const database = addDoc(collection(db, "users"), data);
          // getPhotos();

          console.log("Document written with ID: ", database.id);
        });
      }
    );
  };

  console.log({ image });

  return (
    <div>
      <button
        className="pri"
        onClick={toggleCardHandler}
        style={{
          width: "132px",
          margin: "auto",
          marginTop: "1.5rem",
          display: "flex",
          justifyContent: "center",
          gap: "0.4rem",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "16px",
            display: "grid",
            placeContent: "center",
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

      {/* {image && (
        <img
          src={image}
          alt="Camera Capture"
          style={{
            display: "block",
            width: "100%",
            aspectRatio: "3/2",
            objectFit: "cover",
          }}
        />
      )} */}
      {/* <video
        ref={videoRef}
        style={{
          display: "block",
          width: "100%",
          aspectRatio: "3/2",
          objectFit: "cover",
        }}
      /> */}
      <div>
        <canvas
          ref={canvasRef}
          style={{ display: "none", width: "300px", height: "300px" }}
        />
      </div>

      <div className="card" style={{ display: showCard ? "block" : "none" }}>
        <div className="card-header">
          <div>Take Image</div>
          <img
            src={ClosePng}
            alt="close"
            style={{ width: "20px", cursor: "pointer", height: "20px" }}
            onClick={() => {
              setShowCard(false);
              setImage(null);
            }}
          />
        </div>
        <div>
          <img
            src={image}
            alt="Camera Capture"
            style={{
              display: image ? "block" : "none",
              width: "100%",
              aspectRatio: "3/2",
              objectFit: "cover",
            }}
          />
          <video
            ref={videoRef}
            style={{
              display: "block",
              width: "100%",
              aspectRatio: "3/2",
              objectFit: "cover",
            }}
          />
        </div>

        <div className="card-footer">
          <p style={{ margin: "0.2rem 0" }}>
            Note: Take a selfie in front of white background for the mosaic
          </p>

          <div className="card-action-wrapper">
            {!image ? (
              <button className="pri" onClick={takePicture}>
                Take Picture
              </button>
            ) : (
              <>
                <button className="pri" onClick={() => setImage(null)}>
                  Retake
                </button>
                {/* <button
                  className="pri"
                  onClick={() => {
                    setShowCard(false);
                    // setImage(null);
                  }}
                >
                  Save Image
                </button> */}
              </>
            )}
            {/* <button
              className="thr"
              onClick={() => {
                setShowCard(false);
                setImage(null);
              }}
            >
              Discard
            </button> */}
          </div>
          {/*  kk*/}
          <div
            className="form"
            style={{
              flexDirection: "column",
              gap: "0.2rem",
              transition: "0.3s",
              opacity: image ? "1" : "0",
              visibility: image ? "inherit" : "hidden",
            }}
          >
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={formDataHandler}
            />
            <textarea
              placeholder="Write Your Message"
              name="message"
              value={formData.message}
              onChange={formDataHandler}
            ></textarea>
            <button className="pri" onClick={() => onSubmit()}>
              SUBMIT
            </button>
          </div>
          {/* kk */}
        </div>
      </div>
    </div>
  );
}

export default Camera;

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
