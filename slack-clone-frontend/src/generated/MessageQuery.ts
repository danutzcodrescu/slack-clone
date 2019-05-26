/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MessageQuery
// ====================================================

export interface MessageQuery_Mesage_User {
  __typename: 'User';
  username: string;
}

export interface MessageQuery_Mesage {
  __typename: 'Mesage';
  id: any;
  body: string;
  date: any;
  /**
   * An object relationship
   */
  User: MessageQuery_Mesage_User;
}

export interface MessageQuery {
  /**
   * fetch data from the table: "Mesage"
   */
  Mesage: MessageQuery_Mesage[];
}

export interface MessageQueryVariables {
  channelId?: any | null;
}
