/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: SidebarSubscription
// ====================================================

export interface SidebarSubscription_Membership_Chanel {
  __typename: 'Chanel';
  id: any;
  name: string;
}

export interface SidebarSubscription_Membership {
  __typename: 'Membership';
  id: any;
  direct: boolean;
  /**
   * An object relationship
   */
  Chanel: SidebarSubscription_Membership_Chanel;
}

export interface SidebarSubscription {
  /**
   * fetch data from the table: "Membership"
   */
  Membership: SidebarSubscription_Membership[];
}
