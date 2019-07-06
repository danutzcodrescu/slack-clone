/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateDMChannel
// ====================================================

export interface CreateDMChannel_insert_Chanel_returning {
  __typename: 'Chanel';
  id: any;
  name: string;
}

export interface CreateDMChannel_insert_Chanel {
  __typename: 'Chanel_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: CreateDMChannel_insert_Chanel_returning[];
}

export interface CreateDMChannel {
  /**
   * insert data into the table: "Chanel"
   */
  insert_Chanel: CreateDMChannel_insert_Chanel | null;
}

export interface CreateDMChannelVariables {
  user1: string;
  user2: string;
  title?: string | null;
}
