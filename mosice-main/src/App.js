import "./App.css";
import Camera from "./Camera";
import { useEffect, useState } from "react";
import { ImagePixelated } from "react-pixelate";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../src/Firebase";
import image from "./logo.jpeg";
import ClosePng from "./close.png";
import FooterPng from "./footer.png";
import Footer2Png from "./footer2.png";
import CameraNew from "./CameraNew";
import PopupCard from "./PopupCard";
// import WebcamCapture from "./WebcamCapture";

function App() {
  const [photos, setPhotos] = useState([]);
  const [key, setKey] = useState(Math.random());

  const [selectedCard, setSelectedCard] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    document.querySelector(".grid-img-wrapper").style.opacity = "1";
  }, []);

  function getPhotos () {

    // axios
    //   .get("http://localhost:5001/images")
    //   .then((res) => setPhotos(res.data.data))
    //   .catch((err) => console.log(err.response));
    
    getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      let data = newData.sort((a, b) => a.timestamp - b.timestamp);
      setPhotos(data);
    });
  }

  useEffect(() => {
    getPhotos();
  }, []);

  const popupHandler = (e) => {
    // console.log(e.currentTarget);
    getPosition(e.currentTarget);
    if (isClickEvent(e)) {
      const allImages = document.querySelectorAll(".grid-img-wrapper > div");
      allImages.forEach((imgDiv) => {
        // imgDiv.style.border = "1px red solid";
        imgDiv.style.mixBlendMode = "multiply";
        imgDiv.style.position = "relative";
        imgDiv.style.width = "100%";
        imgDiv.style.height = "100%";
        imgDiv.style.borderRadius = "0%";
        imgDiv.style.boxShadow = "none";
        imgDiv.style.zIndex = "1";
        imgDiv.style.margin = "0px";
        imgDiv.style.opacity = "0.4";
        imgDiv.querySelector("img").style.height = "100%";
        imgDiv.style.top = "0%";
        imgDiv.style.left = "0%";

        // imgDiv.style.transform = "scale(1) translate(0,0)";
        imgDiv.style.transform = "unset";
      });
      const eltStyle = e.currentTarget.style;
      eltStyle.mixBlendMode = "normal";
      eltStyle.width = "300px";
      eltStyle.height = "360px";
      eltStyle.borderRadius = "20px";
      eltStyle.boxShadow = "0 0 1rem rgba(0,0,0,0.5)";
      eltStyle.zIndex = "111";
      eltStyle.marginLeft = "-20px";
      eltStyle.marginTop = "-30px";
      eltStyle.opacity = "1";
      e.currentTarget.querySelector("img").style.height = "auto";

      eltStyle.position = "fixed";
      eltStyle.margin = "0%";
      eltStyle.top = "40%";
      eltStyle.left = "50%";
      eltStyle.transform = "scale(0.6) translate(-50%,-50%)";
    }
  };
  function cardLeaveHandler(e)  {
    setKey(Math.random());
    // const allImages = document.querySelectorAll(".grid-img-wrapper > div");
    // allImages.forEach((imgDiv) => {
    //   imgDiv.style.position = "static";
    //   imgDiv.style.width = "100%";
    //   imgDiv.style.height = "auto";
    //   imgDiv.style.borderRadius = "0px";
    //   imgDiv.style.boxShadow = "none";
    //   imgDiv.style.zIndex = "1";
    //   imgDiv.style.margin = "0px";
    //   imgDiv.style.opacity = "0.3";
    // });
  };
console.log(selectedCard)
  return (
    <div className="App">
      {/* <PhotoMosaic /> */}
      {/* <Demo /> */}
      <PopupCard showCard={selectedCard} setShowCard={setSelectedCard} />
      <div style={{ margin: "auto" }}></div>
      <div className="grid-img-wrapper" key={key} style ={{
        opacity : !(selectedCard || showForm) ? '1' : '0'
      }} >
        {/* <ImagePixelated
          src={image}
          width={400}
          height={400}
          pixelSize={1}
          centered={true}
          fillTransparencyColor={"white"}
        /> */}
        {photos.map((p) => (
          <div
            key={p.id}
            // onClick={(e) => popupHandler(e)}
            onClick={() => setSelectedCard(p)}
            style={{ position: "relative" }}
          >
            <img src={p.photo} alt={p.name} />
            <h3>{p.name}</h3>
            <div>
              <p>{p.message}</p>
            </div>
            <div
              style={{
                background: "white",
                borderRadius: "50%",
                display: "grid",
                placeContent: "center",
                // position: "absolute",
                margin: "auto",
                minHeight: "30px",
                width: "30px",
                top: 0,
                right: 0,
                border: "1px gray solid",
              }}
              onClick={cardLeaveHandler}
            >
              <img
                src={ClosePng}
                alt="close"
                style={{ width: "10px", cursor: "pointer", height: "10px" }}
              />
            </div>
          </div>
        ))}
      </div>
      <CameraNew getPhotos={getPhotos} setPhotos={setPhotos} showCard = {showForm} setShowCard={setShowForm} 
      style  = {{
        opacity : !(selectedCard || showForm) ? '1' : '0'

      }}
      />
      <footer>
        <img src={!(selectedCard || showForm) ?  FooterPng : Footer2Png} alt="" style = {!(selectedCard || showForm)  ?{
          height : '25px',
          width : '260px'
        } : {
          height : '62px',
          width : '312px',
          objectFit : 'contain',
          marginBottom : '1rem'
        }}  />
        {/* <img src={Footer2Png} alt="" /> */}
      </footer>
    </div>
  );
}

export default App;

function getPosition(element) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

  const position = {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft,
  };

  return position;
}

function isClickEvent(event) {
  return event.type === "click";
}
