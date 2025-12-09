# Page API-Spec

## Model Data

### Schema `ApiPagination`

```ts
type ApiPagination = {
  limit: number;
  page: number;
  search?: string | undefined;
};
```

### Schema `ApiResponse<T, P>`

```ts
type ApiResponse<T = undefined, P = undefined> = {
  code: number;
  status: string;
  message?: string | undefined;
  data?: string | undefined;
  pagination?: ApiPagination | undefined;
};
```

### Schema `Category`

```ts
type Category = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
};
```

### Schema `Product`

```ts
type Product = {
  id: string;
  storeId: string;
  name: string;
  slug: string;
  image: string;
  price: number;
};
```

## Get Page Home

- Request:
  - Method: GET
  - Endpoint: `/api/v1/pages/home`
  - Header:
    - Accept: application/json
- Response:
  ```ts
  ApiResponse<{
    categories: Category[];
    favoriteProducts: Product[];
    recommendationProducts: Product[];
  }>;
  ```
