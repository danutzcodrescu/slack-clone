/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: JoinChannel
// ====================================================

export interface JoinChannel_insert_Membership_returning_Chanel {
  __typename: 'Chanel';
  id: any;
  name: string;
}

export interface JoinChannel_insert_Membership_returning {
  __typename: 'Membership';
  id: any;
  /**
   * An object relationship
   */
  Chanel: JoinChannel_insert_Membership_returning_Chanel;
}

export interface JoinChannel_insert_Membership {
  __typename: 'Membership_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: JoinChannel_insert_Membership_returning[];
}

export interface JoinChannel {
  /**
   * insert data into the table: "Membership"
   */
  insert_Membership: JoinChannel_insert_Membership | null;
}

export interface JoinChannelVariables {
  userId: string;
  channelId: any;
}
