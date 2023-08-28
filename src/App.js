import styled from "styled-components";
import { useState, useEffect } from "react";
import Tesseract from "tesseract.js";

const ImgBox = styled.img`
  width: 400px;
  height: 400px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Num = styled.div`
  position: absolute;
  border: 1px solid;
  border-radius: 20px;
  width: 20px;
  text-align: center;
`;

const CameraInput = styled.input`
  display: none;
`;

const TextDiv = styled.div`
  width: 100%;
`;

const Divider = styled.hr`
  width: 100%;
`;

function App() {
  const imgList = [
    "./assets/img/4199672x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/19078188x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/22277757x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/22428796x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/25836840x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/25898253x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/27259508x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/28300096x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/28639105x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/28650736x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/29157953x2_iphone-14-pro__color_black_16004733.png.1000x1000-w.m80.jpg",
    "./assets/img/29370906x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/29381853x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
    "./assets/img/27679237x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg",
  ];

  const [fileName, setFileName] = useState("Default");
  const [recogText, setRecogText] = useState("");

  const imageOnChange = (e) => {
    console.log("image On Change");
    const $target = e.target;
    const imageFile = $target.files[0];

    if (imageFile) {
      console.log(e);
      console.log("image : ", imageFile);
      setFileName(imageFile.name);

      Tesseract.recognize(imageFile, "eng+kor", {
        logger: (m) => {
          console.log("logger: ", m);
          setRecogText(m.status);
        },
      }).then(({ data: { text } }) => {
        console.log("result: ", text);
        setRecogText(text);
      });
    }
  };

  const getMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      const video = document.getElementById("video");
      video.srcObject = stream;
      video.play();
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("useEffect");
    getMedia();
  }, []);

  return (
    <Wrapper>
      <CameraInput
        id="camera"
        type="file"
        capture="camera"
        onChange={imageOnChange}
      />
      <input
        type="button"
        value="카메라열기"
        onClick={() => document.getElementById("camera").click()}
      />
      <TextDiv>
        <b>파일명 :</b> {fileName}
      </TextDiv>
      <TextDiv>
        <b>추출된 텍스트 :</b>
        <br /> {recogText}
      </TextDiv>
      <Divider />
      <video id="video"></video>
      {/* {imgList.map((s, i) => {
        return (
          <div>
            <Num>{i + 1}</Num>
            <ImgBox src={require("" + s)} />
          </div>
        );
      })} */}
    </Wrapper>
  );
}

export default App;
