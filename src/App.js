import styled from "styled-components";

const ImgBox = styled.img`
  width: 400px;
  height: 400px;
`;

function App() {
  return (
    <div>
      <ImgBox
        src={require("./assets/img/4199672x2_iphone-14-pro__color_black_16004813.png.1000x1000-w.m80.jpg")}
      />
    </div>
  );
}

export default App;
