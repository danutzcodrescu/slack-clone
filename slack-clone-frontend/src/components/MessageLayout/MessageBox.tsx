import { isToday, isYesterday } from 'date-fns';
import { groupBy } from 'lodash';
import * as React from 'react';
import { messageQuery } from '../../data/queries';
import { messageSubscription } from '../../data/subscriptions';
import { MessageQuery_Mesage } from '../../generated/MessageQuery';
import { StoreContext } from '../../store/store';
import { useLazyQuery } from '@apollo/react-hooks';
import { Container, DateHeader, Username, DateSpan } from './MessageBox.style';

export function MessageBox() {
  const messageListRef = React.createRef<HTMLDivElement>();
  const { selectedChannel, user } = React.useContext(StoreContext);
  const [execute, { data, loading, subscribeToMore, error }] = useLazyQuery(
    messageQuery
  );

  React.useEffect(() => {
    if (selectedChannel && user.id) {
      execute({ variables: { channelId: selectedChannel!.id } });
    }
  }, [selectedChannel, user, execute]);

  React.useEffect(() => {
    let subscription: any;
    if (subscribeToMore) {
      subscription = subscribeToMore({
        variables: { channelId: selectedChannel!.id },
        document: messageSubscription,
        updateQuery: (
          prev: MessageQuery_Mesage[],
          { subscriptionData }: any
        ) => {
          if (!subscriptionData.data) return prev;
          return Object.assign({}, prev, subscriptionData.data);
        }
      });
    }
    return () => subscription && subscription();
  }, [selectedChannel, subscribeToMore]);

  React.useLayoutEffect(() => {
    if (messageListRef.current) {
      messageListRef.current!.scrollTo(0, messageListRef.current!.scrollHeight);
    }
  }, [data, messageListRef]);

  if (!selectedChannel) {
    return <div />;
  }

  let df = new Intl.DateTimeFormat(
    navigator.languages ? navigator.languages[0] : 'en-US',
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }
  );
  let dates: any;
  if (data && data.Mesage) {
    const dtf = new Intl.DateTimeFormat(
      navigator.languages ? navigator.languages[0] : 'en-US'
    );
    dates = groupBy(data.Mesage, (message: any) =>
      dtf.format(new Date(message.date))
    );
  }
  const rtf = new (Intl as any).RelativeTimeFormat(
    navigator.languages ? navigator.languages[0] : 'en-US',
    { numeric: 'auto' }
  );

  return (
    <Container ref={messageListRef}>
      <ul>
        {error ? error : null}
        {!data || !data.Mesage ? <p>Select a channel</p> : null}
        {!loading && data && data.Mesage
          ? Object.keys(dates).map(key => (
              <div key={key}>
                <DateHeader>
                  {isToday(new Date(dates[key][0].date))
                    ? rtf.format(0, 'day')
                    : isYesterday(new Date(dates[key][0].date))
                    ? rtf.format(-1, 'day')
                    : key}
                </DateHeader>
                {dates[key].map((message: any) => {
                  return (
                    <li key={message.id}>
                      <Username>{message.User.username}</Username>
                      <DateSpan>{df.format(new Date(message.date))}</DateSpan>
                      <p>{message.body}</p>
                    </li>
                  );
                })}
              </div>
            ))
          : null}
      </ul>
    </Container>
  );
}
