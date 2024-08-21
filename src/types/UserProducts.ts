export interface UserProducts {
  Query?: string;
  Operand?: string;
  PageNo?: string;
  RowPerPage?: string;
  SortIndex?: string;
}

// product.ts
export interface UserProductResponse {
  ProductID: number;
  Title: string;
  CategoryID: number;
  CategoryTitle: string;
  GroupID: number;
  GroupTitle: string;
  ImageUrl: string;
  Description: string;
  IsActive: boolean;
  Fi: string;
  RenewFi: string;
  SaleRuleID: number;
}

export interface UserApiProductsResponse {
  Status: number;
  Message: string;
  Title: string;
  Hint: string;
  Name: string;
  Type: string;
  TotalPageCount: number;
  TotalDataCount: number;
  PageNo: number;
  RowPerPage: number;
  Data: UserProductResponse[];
}

export interface UserRenewAdd {
  ProductID: string;
  Description?: string;
}
