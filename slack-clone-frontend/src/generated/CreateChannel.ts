/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateChannel
// ====================================================

export interface CreateChannel_insert_Chanel_returning {
  __typename: 'Chanel';
  id: any;
}

export interface CreateChannel_insert_Chanel {
  __typename: 'Chanel_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: CreateChannel_insert_Chanel_returning[];
}

export interface CreateChannel {
  /**
   * insert data into the table: "Chanel"
   */
  insert_Chanel: CreateChannel_insert_Chanel | null;
}

export interface CreateChannelVariables {
  name?: string | null;
}
