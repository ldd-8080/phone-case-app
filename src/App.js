import styled from "styled-components";

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
  return (
    <Wrapper>
      테스트1
      {imgList.map((s, i) => {
        return (
          <div>
            <Num>{i + 1}</Num>
            <ImgBox src={require("" + s)} />
          </div>
        );
      })}
    </Wrapper>
  );
}

export default App;
