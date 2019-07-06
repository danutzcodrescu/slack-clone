/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ExistingMembership
// ====================================================

export interface ExistingMembership_Membership_Chanel {
  __typename: 'Chanel';
  name: string;
  id: any;
}

export interface ExistingMembership_Membership {
  __typename: 'Membership';
  id: any;
  /**
   * An object relationship
   */
  Chanel: ExistingMembership_Membership_Chanel;
}

export interface ExistingMembership {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: ExistingMembership_Membership[];
}

export interface ExistingMembershipVariables {
  user1?: string | null;
  user2?: string | null;
}
