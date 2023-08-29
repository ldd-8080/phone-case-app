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

const Video = styled.video`
  border: 1px solid;
`;

const VideoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const VideoContainer = styled.div`
  width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const CaptureBtn = styled.button`
  background: #fff;
  border-radius: 30px;
  width: 30px;
  height: 30px;
  position: absolute;
  bottom: 10px;
  left: calc(50% - 15px);
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
  const [progressText, setProgressText] = useState("");

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

  var imageCapture = "1";

  const getMedia = async () => {
    try {
      console.log("start getMedia");
      setProgressText("start getMedia");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            exact: "environment",
          },
        },
      });

      setProgressText("set video srcObject to stream");
      const video = document.getElementById("video");
      video.srcObject = stream;

      try {
        const track = stream.getVideoTracks()[0];
        imageCapture = new ImageCapture(track);
        setProgressText(
          "set imageCapture Constructor with track : " +
            track +
            ", imageCapture : " +
            imageCapture
        );
      } catch (e) {
        setProgressText("impageCapture err : " + e);
        console.log(e);
      }
      video.play();
      console.log("end getMedia");
      setProgressText("end getMedia");
    } catch (e) {
      console.log(e);
    }
  };

  const onButtonClick = () => {
    console.log("button click");
    setProgressText("button Click");

    imageCapture
      .takePhoto()
      .then(function (blob) {
        console.log("took photo : ", blob);
        setProgressText("took photo : " + blob);

        const div = document.getElementById("testText");
        div.innerHTML += blob;
        const img = document.getElementById("capturedImg");
        img.src = URL.createObjectURL(blob);
      })
      .catch((e) => console.log("takePhoto() error : ", e));
  };

  useEffect(() => {
    console.log("useEffect");
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

      <VideoWrapper>
        <input type="button" value="카메라 연결" onClick={() => getMedia()} />
        <VideoContainer>
          <Video id="video" autoPlay playsInline></Video>
          <CaptureBtn type="button" onClick={onButtonClick}></CaptureBtn>
        </VideoContainer>

        <Divider />

        <b>진행상황 : </b>
        <TextDiv id="progressText">{progressText}</TextDiv>
        <b>캡쳐된 이미지 : </b>
        <TextDiv id="testText"></TextDiv>
        <img id="capturedImg" src="" alt="" style={{ border: "1px solid" }} />
      </VideoWrapper>
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
