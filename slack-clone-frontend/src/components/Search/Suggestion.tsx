import * as React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { searchMessages } from 'data/queries';
import {
  CircularProgress,
  MenuItem,
  Card,
  CardContent,
  Typography
} from '@material-ui/core';
import { format } from 'date-fns';
import styled from 'styled-components';
import { MenuItemProps } from '@material-ui/core/MenuItem';

interface Props {
  value: string | null;
  highlightedIndex: number | null;
  selectedItem: any;
}

const HighlightTypography = styled(Typography)`
  & em {
    color: pink;
  }
`;

export function Suggestion(props: Props) {
  const { data, loading, error } = useQuery(searchMessages, {
    variables: { query: props.value }
  });
  if (loading) {
    return <CircularProgress color="secondary" />;
  }
  return data.Search.hits.map((hit: any, index: number) => {
    const date = new Date(hit.date);
    const isHighlighted = props.highlightedIndex === index;
    // const isSelected = (props.selectedItem || '').indexOf(suggestion.label) > -1;
    return (
      <MenuItem key={hit.id} selected={isHighlighted} component="div">
        <Card>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              # {hit.channelId} - {format(date, 'MMM-dd')}
            </Typography>
            <Typography variant="h5" component="h2">
              {hit.userId} {format(date, 'H:mm')}
            </Typography>

            <HighlightTypography
              variant="body2"
              component="p"
              dangerouslySetInnerHTML={{
                __html: hit._highlightResult.body.value
              }}
            />
          </CardContent>
        </Card>
      </MenuItem>
    );
  });
}
