/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SubmitMessage
// ====================================================

export interface SubmitMessage_insert_Mesage_returning {
  __typename: 'Mesage';
  userId: string;
  id: any;
  body: string;
  channelId: any;
}

export interface SubmitMessage_insert_Mesage {
  __typename: 'Mesage_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: SubmitMessage_insert_Mesage_returning[];
}

export interface SubmitMessage {
  /**
   * insert data into the table: "Mesage"
   */
  insert_Mesage: SubmitMessage_insert_Mesage | null;
}

export interface SubmitMessageVariables {
  userId: string;
  body?: string | null;
  channelId: any;
}
