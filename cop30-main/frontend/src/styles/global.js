import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

   html, body {
    height: 100%;
    overflow-x: hidden;
    font-family: Arial, Helvetica, sans-serif;
  }
`;

export default GlobalStyle;