import styled from "@emotion/styled";
import * as React from "react";

const Container = styled.div`
  img {
    height: 95vh;
    width: auto;
  }
`;

export default function ArchitecturePage() {
  return (
    <Container>
      <img src="./static/SlackCloneArchitecture.png" />
    </Container>
  );
}
