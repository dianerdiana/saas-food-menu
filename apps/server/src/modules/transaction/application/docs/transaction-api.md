# Transaction API-Spec

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
  pagination?: ApiPagination | undefined;
};
```

### Schema `Transaction`

```ts
type Transaction = {
  id: string;
  storeId: string;
  code: string;
  name: string;
  tableNumber: string;
  paymentMethod: string;
  totalPrice: number;
  status: string;
};
```

## Get List Transaction

- Request:
  - Method: GET
  - Endpoint: `/api/v1/transactions`
  - Header:
    - Accept: application/json
  - Query Param:
    - limit: number
    - page: number
    - search: string
- Response: `ApiResponse<Transaction[],ApiPagination>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": [
      {
        "id": "string",
        "storeId": "string",
        "code": "string",
        "name": "string",
        "tableNumber": "string",
        "paymentMethod": "string",
        "totalPrice": "number",
        "status": "string"
      }
    ]
  }
  ```

## Get Transaction By ID

- Request:
  - Method: GET
  - Endpoint: `/api/v1/transactions/:id`
  - Header:
    - Accept: application/json
- Response: `ApiResponse<Transaction>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "code": "string",
      "name": "string",
      "tableNumber": "string",
      "paymentMethod": "string",
      "totalPrice": "number",
      "status": "string"
    }
  }
  ```

## Create Transaction

- Request:
  - Method: POST
  - Endpoint: `/api/v1/transactions`
  - Header:
    - Content-Type: multipart/form-data
    - Accept: application/json
  - Body:

    ```json
    {
      "storeId": "string",
      "code": "string",
      "name": "string",
      "tableNumber": "string",
      "paymentMethod": "string"
    }
    ```

- Response: `ApiResponse<Transaction>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "code": "string",
      "name": "string",
      "tableNumber": "string",
      "paymentMethod": "string",
      "totalPrice": "number",
      "status": "string"
    }
  }
  ```

## Update Transaction

- Request:
  - Method: PUT
  - Endpoint: `/api/v1/transactions/:id`
  - Header:
    - Content-Type: multipart/form-data
    - Accept: application/json
  - Body:

    ```json
    {
      "storeId": "string",
      "code": "string",
      "name": "string",
      "tableNumber": "string",
      "paymentMethod": "string"
    }
    ```

- Response: `ApiResponse<Transaction>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "code": "string",
      "name": "string",
      "tableNumber": "string",
      "paymentMethod": "string",
      "totalPrice": "number",
      "status": "string"
    }
  }
  ```

## Delete Transaction

- Request:
  - Method: DELETE
  - Endpoint: `/api/v1/transactions/:id`
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
