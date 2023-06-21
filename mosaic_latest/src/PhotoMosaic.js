import { ReactImageMosaic } from "react-image-mosaic";

const PhotoMosaic = () => {
  return (
    <ReactImageMosaic
      width={500}
      height={500}
      sources={["image.png", "image.png"]}
      target={"image.png"}
    />
  );
};

export default PhotoMosaic;
