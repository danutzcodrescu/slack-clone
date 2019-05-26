/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateMembership
// ====================================================

export interface CreateMembership_insert_Membership_returning {
  __typename: 'Membership';
  id: any;
}

export interface CreateMembership_insert_Membership {
  __typename: 'Membership_mutation_response';
  /**
   * data of the affected rows by the mutation
   */
  returning: CreateMembership_insert_Membership_returning[];
}

export interface CreateMembership {
  /**
   * insert data into the table: "Membership"
   */
  insert_Membership: CreateMembership_insert_Membership | null;
}

export interface CreateMembershipVariables {
  userId?: string | null;
  channelId?: any | null;
}
