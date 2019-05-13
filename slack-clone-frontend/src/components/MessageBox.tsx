import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: 85px;
  overflow-y: auto;
  height: calc(100vh - 185px);
  li {
    margin: 0.5rem 0;
  }
  p {
    margin-top: 0.25rem;
  }
`;

const Username = styled.span`
  font-weight: 800;
  margin-right: 5px;
  font-size: 1.2rem;
`;

const DateSpan = styled.span`
  color: darkgrey;
`;

export function MessageBox() {
  const messageListRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    messageListRef.current!.scrollTo(
      messageListRef.current!.scrollTop,
      messageListRef.current!.scrollHeight
    );
  }, [messageListRef]);

  const messages = [
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    },
    {
      message: 'Deleniti delectus hic soluta ratione sunt voluptates ut.',
      user: 'Edwardo_Stiedemann56',
      date: 'Sat May 11 2019 05:24:35 GMT+0200 (CEST)'
    }
  ];
  return (
    <Container ref={messageListRef}>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            <Username>{message.user}</Username>
            <DateSpan>
              {new Intl.DateTimeFormat('en-GB').format(new Date(message.date))}
            </DateSpan>
            <p>{message.message}</p>
          </li>
        ))}
      </ul>
    </Container>
  );
}
