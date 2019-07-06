/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChannelsQuery
// ====================================================

export interface ChannelsQuery_Chanel_Memberships {
  __typename: 'Membership';
  userId: string;
}

export interface ChannelsQuery_Chanel {
  __typename: 'Chanel';
  id: any;
  name: string;
  /**
   * An array relationship
   */
  Memberships: ChannelsQuery_Chanel_Memberships[];
}

export interface ChannelsQuery {
  /**
   * fetch data from the table: "Chanel"
   */
  Chanel: ChannelsQuery_Chanel[];
}

export interface ChannelsQueryVariables {
  channelName?: string | null;
}
