export interface IServer {
  id: number;
  name: string;
  ip: string;
  port: string; 
  version: string;
  is_port_hidden: number; 
  hide_ip: number;
  is_hidden: number;
  shop_id: number;
  created_at: string;
  updated_at: string;
}

export interface IProduct {
  id: number;
  name: string;
  price: number;
  old_price: number | null;
  type: string;
  number: number;
  commands: string[];
  withdraw_commands: string[] | null;
  withdraw_commands_days: number | null;
  additional_fields: Record<string, any> | null; 
  description: string | null;
  image: string | null;
  first_delete: number;
  shop_id: number;
  created_at: string; 
  updated_at: string;
  sort_index: number;
  servers: IServer[];
}

export interface HomePageProps {
  products: IProduct[];
}

export interface IPaymentData {
  player: string;
  item: number;
}

export interface IOrderPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

export interface IOrderPageParamsProps {
  orderId : string
}

export interface IUserPayments {
  id: number;
  player: string;
  item: number,
  operationId: string,
  createdAt: string | Date | null
}

export interface IPaymentsPageProps {
  username: string
  payments: {
    success: boolean,
    error: null | string,
    payments: IUserPayments[] | null
  }
}

export interface IPaymentsPageParamsProps {
  params: Promise<{
    username: string;
  }>;
}
