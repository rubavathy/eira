export interface UserSiteMappingCustomerData {
  customerId: number;
  customerName: string;
  sites: { siteId: number; siteName: string }[];
}

export interface UserSiteMappingData {
  userId: number;
  userName: string;
  siteIds: number[];
  customers: { customerId: number; sites: number[] }[];
}
