# Product API-Spec

## Authentication

All API must use this authentication

- Request:
  - Header :
    - Authentication : "Bearer {token}"

## Model Data

### Schema `ApiPagination`

```ts
type ApiPagination = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};
```

### Schema `ApiResponse<T, P>`

```ts
type ApiResponse<T = undefined, P = undefined> = {
  code: number;
  status: string;
  message?: string | undefined;
  data?: string | undefined;
  meta?: ApiPagination | undefined;
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
  description: string;
  price: number;
};
```

## Get List Product

- Request:
  - Method: GET
  - Endpoint: `/api/v1/products`
  - Header:
    - Accept: application/json
  - Query Param:
    - limit: number
    - page: number
    - search: string
- Response: `ApiResponse<Product[],ApiPagination>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": [
      {
        "id": "string",
        "storeId": "string",
        "name": "string",
        "slug": "string",
        "image": "string",
        "description": "string",
        "price": "number"
      }
    ]
  }
  ```

## Get Product By ID

- Request:
  - Method: GET
  - Endpoint: `/api/v1/products/:id`
  - Header:
    - Accept: application/json
- Response: `ApiResponse<Product>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "name": "string",
      "slug": "string",
      "image": "string",
      "description": "string",
      "price": "number"
    }
  }
  ```

## Create Product

- Request:
  - Method: POST
  - Endpoint: `/api/v1/products`
  - Header:
    - Content-Type: multipart/form-data
    - Accept: application/json
  - Body:

    ```json
    {
      "id": "string",
      "storeId": "string",
      "name": "string",
      "slug": "string",
      "image": "file",
      "description": "string",
      "price": "number",
      "categoryId": "string"
    }
    ```

- Response: `ApiResponse<Product>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "name": "string",
      "slug": "string",
      "image": "string",
      "description": "string",
      "price": "number"
    }
  }
  ```

## Update Product

- Request:
  - Method: PUT
  - Endpoint: `/api/v1/products/:id`
  - Header:
    - Content-Type: multipart/form-data
    - Accept: application/json
  - Body:

    ```json
    {
      "id": "string",
      "storeId": "string",
      "name": "string",
      "slug": "string",
      "image": "file",
      "description": "string",
      "price": "number",
      "categoryId": "string"
    }
    ```

- Response: `ApiResponse<Product>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "name": "string",
      "slug": "string",
      "image": "string",
      "description": "string",
      "price": "number"
    }
  }
  ```

## Delete Product

- Request:
  - Method: DELETE
  - Endpoint: `/api/v1/products/:id`
  - Header:
    - Accept: application/json
- Response:`ApiResponse`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string"
  }
  ```
