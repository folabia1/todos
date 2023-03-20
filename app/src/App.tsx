import styled from "styled-components";
import MainContainer from "./MainContainer";

const App = styled.div`
  display: grid;
  place-items: center;
`;

export default () => {
  return (
    <App className="App">
      <MainContainer />
    </App>
  );
};
