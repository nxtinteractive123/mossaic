import { ReactImageMosaic } from "react-image-mosaic";

const Demo = () => {
  return (
    <ReactImageMosaic
      width={400}
      height={400}
      sources={[
        "http://localhost:5001/media/photos/30_04_23__02_19_4712.png",
        "http://localhost:5001/media/photos/30_04_23__02_19_4712.png",
      ]}
      target={"http://localhost:5001/media/photos/30_04_23__02_19_4712.png"}
    />
  );
};

export default Demo;
