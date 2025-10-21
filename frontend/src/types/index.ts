export interface User {
  username: string;
  aaAddress: string;
}

export interface Token {
  name: string;
  symbol: string;
  balance: string;
  price: string;
  address?: string;
  decimals: number;
}
