# Store API-Spec

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

### Schema `StoreResponse`

```ts
type StoreResponse = {
  id: string;
  name: string;
  image: string;
  slug: string;
  phone: string;
  location: string;
  description: string;
  status: string;
};
```

## Get List Store

- Request:
  - Method: GET
  - Endpoint: `/api/v1/stores`
  - Header:
    - Accept: application/json
  - Query Param:
    - limit: number
    - page: number
    - search: string
- Response: `ApiResponse<StoreResponse[],ApiPagination>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": [
      {
        "id": "string",
        "name": "string",
        "image": "string",
        "slug": "string",
        "phone": "string",
        "location": "string",
        "description": "string",
        "status": "string"
      },
      {
        "id": "string",
        "name": "string",
        "image": "string",
        "slug": "string",
        "phone": "string",
        "location": "string",
        "description": "string",
        "status": "string"
      }
    ]
  }
  ```

## Get Store By ID

- Request:
  - Method: GET
  - Endpoint: `/api/v1/stores/:id`
  - Header:
    - Accept: application/json
- Response: `ApiResponse<StoreResponse>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "id": "string",
      "name": "string",
      "image": "string",
      "slug": "string",
      "phone": "string",
      "location": "string",
      "description": "string",
      "status": "string"
    }
  }
  ```

## Create Store

- Request:
  - Method: POST
  - Endpoint: `/api/v1/stores`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "slug": "string",
      "phone": "string",
      "location": "string",
      "description": "string"
    }
    ```
- Response: `ApiResponse<StoreResponse>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "name": "string",
      "image": "string",
      "slug": "string",
      "phone": "string",
      "location": "string",
      "description": "string",
      "status": "string"
    }
  }
  ```

## Update Store

- Request:
  - Method: PUT
  - Endpoint: `/api/v1/stores/:id`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "name": "string",
      "image": "string",
      "slug": "string",
      "phone": "string",
      "location": "string",
      "description": "string"
    }
    ```
- Response: `ApiResponse<StoreResponse>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "name": "string",
      "image": "string",
      "slug": "string",
      "phone": "string",
      "location": "string",
      "description": "string",
      "status": "string"
    }
  }
  ```

## Delete Store

- Request:
  - Method: DELETE
  - Endpoint: `/api/v1/stores/:id`
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
