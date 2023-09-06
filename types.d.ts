interface User {
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

interface UserData {
  access_token: string
  user: User
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

//image data
interface ImageData {
  access_mode: string
  asset_id: string
  bytes: number
  created_at: string
  etag: string
  folder: string
  format: string
  height: number
  original_filename: string
  placeholder: boolean
  public_id: string
  resource_type: 'image'
  secure_url: string
  signature: string
  tags: string[]
  type: 'upload'
  url: string
  version: number
  version_id: string
  width: number
}

// Define storeOwner type
type StoreOwner = {
  account_id: string
  profile_img_url: string
  access_levels: []
  added_at: string
}

// Define storeResult type

type StoreResult = {
  status: string
  data: {
    message: string
    result: {
      store: {
        id: number
        name: string
        description: string
        profile_image_url: string
        is_verified: boolean
        category: string
        is_frozen: boolean
        created_at: string
        user_access_levels: []
      }
      store_owners: StoreOwner[]
    }
  }
}

// Define storeResponse type
type StoreResponse = {
  status: string
  data: {
    message: string
    result: {
      metadata: {
        current_page: number
        first_page: number
        last_page: number
        page_size: number
        total_records: number
      }
      stores: Store[]
    }
  }
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
  id: number
  name: string
  description: string
  price: string
  store_id: number
  image_urls: string[]
  category: string
  discount_percentage: string
  supply_quantity: number
  extra: object
  is_frozen: boolean
  created_at: Date
  updated_at: Date
}

type ResponseData = {
  message: string
  result: {
    item: StoreItem
  }
}

type GetItemApiResponse = {
  status: string
  data: ResponseData
}

type SalesOverview = {
  data: {
    message: string
    result: {
      metadata: {}
      sales_overview: []
    }
  }
  status: string
}

type Sales = {
  data: {
    data: {
      message: string
      result: {
        metadata: {}
        sales: []
      }
    }
    status: string
  }
}

type Store = {
  store: {
    id: number
    name: string
    description: string
    profile_image_url: string
    is_verified: true
    category: string
    is_frozen: true
    created_at: string
    user_access_levels: []
  }
  store_owners: [
    {
      account_id: string
      profile_img_url: string
    },
  ]
}

type Stores = {
  status: string
  data: {
    message: string
    result: {
      stores: Store[]
      metadata: {
        current_page: number
        page_size: number
        first_page: number
        last_page: number
        total_records: number
      }
    }
  }
}

type CoOwner = {
  account_id: string
  new_access_level: number
}

type InvitationResponse = {
  status: string
  data: {
    message: string
    result: {
      co_owner_access: {
        account_id: string
        profile_img_url: string
        access_levels: Number[]
        added_at: string
      }
    }
  }
}

type UserInfo = {
  first_name: string
  last_name: string
  password: string
  email: string
  account_id: string
  profile_image_url: string
}

type UserResponse = {
  status: string
  data: {
    message: string
    result: {
      user: {
        user_id: number
        first_name: string
        last_name: string
        account_id: string
        email: string
        profil_image_url: string
        created_at: string
        password_changed_at: string
        is_active: boolean
        is_email_verified: boolean
      }
    }
  }
}
