type User = {
  user_id: number
  first_name: string
  last_name: string
  account_id: string
  email: string
  profile_image_url: string
  created_at: string
  password_changed_at: string
  is_active: boolean
  is_email_verified: boolean
}

type UserResponse = {
  status: string
  data: {
    message: string
    result: {
      user: User
      access_token: string
    }
  }
}

// Define storeOwner type
type StoreOwner = {
  user_id: number
  store_id: number
  access_level: number
  added_at: string // Should be a valid date-time string
}

// Define storeResult type
type StoreResult = {
  store: Store
  store_owners: StoreOwner[]
}

// Define storeResponse type
type StoreResponse = {
  status: string
  data: {
    message: string
    result: StoreResult
  }
}

type Store = {
  name: string
  description: string
  store_account_id: string
  profile_image_url: string
  is_verified: string
  category: string
  is_frozen: boolean
  is_verified: boolean
  created_at: Date
}

type Session = {
  access_token: string
  user: User
}

type storeData = {
  store_id: string
  user_id: string | number
}

type StoreItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  store_id: number;
  image_urls: string[];
  category: string;
  discount_percentage: string;
  supply_quantity: number;
  extra: object;
  is_frozen: boolean;
  created_at: Date;
  updated_at: Date;
}

type ResponseData = {
  message: string;
  result: {
    item: StoreItem;
  };
}

type GetItemApiResponse = {
  status: string;
  data: ResponseData;
}
