/** @jsx jsx */
import { css } from "@emotion/core";
import styled from "@emotion/styled";

const h1 = css`
  color: FireBrick;
`;

const Container = styled.div`
  display: flex;
  background-image: url("https://cfr.slack-edge.com/b47f5/marketing/img/features/unfurl_why_slack.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;

  h1 {
    color: FireBrick;
  }
`;

export default Container;
