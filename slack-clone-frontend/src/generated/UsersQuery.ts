/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UsersQuery
// ====================================================

export interface UsersQuery_User {
  __typename: 'User';
  id: string;
  username: string;
}

export interface UsersQuery {
  /**
   * fetch data from the table: "User"
   */
  User: UsersQuery_User[];
}

export interface UsersQueryVariables {
  currentUserId?: string | null;
  filter?: string | null;
}
