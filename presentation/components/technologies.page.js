/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import styled from "@emotion/styled";

const h1 = css`
  margin-top: 0;
`;

const size = 0.6;

const Container = styled.div`
  display: grid;
  width: 95vw;
  text-align: left;
  grid-template-columns: 1fr 1fr;
  font-size: ${size}em;
  grid-gap: 1em;

  h4 {
    text-align: center;
  }

  div {
    box-shadow: 10px 10px 5px 0px rgba(204, 202, 204, 1);
  }
`;

const UlContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(max-content, 1fr));
  li {
    margin-left: 15px;
    margin-right: 10px;
  }

  img {
    height: ${size * 2}em;
    width: auto;
    margin-left: 3px;
    vertical-align: middle;
  }
`;

export default function TechnologiesPage() {
  return (
    <div>
      <h1 css={h1}>Technologies</h1>
      <Container>
        <div>
          <h4>Frontend</h4>
          <UlContainer>
            <li>
              React
              <img src="https://s3.amazonaws.com/media-p.slid.es/uploads/jhabdas/images/969312/react-logo-1000-transparent.png" />
            </li>
            <li>
              Apollo
              <img src="https://seeklogo.com/images/A/apollo-logo-DC7DD3C444-seeklogo.com.png" />
            </li>
            <li>
              Typescript
              <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" />
            </li>
            <li>
              Styled components
              <img src="https://www.styled-components.com/static/atom.png" />
            </li>
          </UlContainer>
        </div>
        <div>
          <h4>Backend</h4>
          <UlContainer>
            <li>
              Hasura
              <img src="https://res-3.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/flomw2fsyjzgucu0yizs" />
            </li>
            <li>
              Auth0
              <img src="https://raw.githubusercontent.com/github/explore/633ba64a42fd76f89e16eba17343c045e025150a/topics/auth0/auth0.png" />
            </li>
            <li>
              Algolia
              <img src="https://cdn.dribbble.com/users/509373/screenshots/3171914/5.png" />
            </li>
            <li>
              Netlify
              <img src="https://www.netlify.com/img/global/meta-image.jpg" />
            </li>
          </UlContainer>
        </div>
      </Container>
    </div>
  );
}
