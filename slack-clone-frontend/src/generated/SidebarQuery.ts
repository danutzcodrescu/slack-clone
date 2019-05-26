/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SidebarQuery
// ====================================================

export interface SidebarQuery_Membership_Chanel {
  __typename: 'Chanel';
  id: any;
  name: string;
}

export interface SidebarQuery_Membership {
  __typename: 'Membership';
  id: any;
  direct: boolean;
  /**
   * An object relationship
   */
  Chanel: SidebarQuery_Membership_Chanel;
}

export interface SidebarQuery {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: SidebarQuery_Membership[];
}
