# Category API-Spec

## Authentication

All API must use this authentication

- Request:
  - Header :
    - Authentication : "Bearer {token}"

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
  image: string;
};
```

## Get List Category

- Request:
  - Method: GET
  - Endpoint: `/api/v1/categories`
  - Header:
    - Accept: application/json
  - Query Param:
    - limit: number
    - page: number
    - search: string
- Response: `ApiResponse<Category[],ApiPagination>`
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
        "image": "string"
      },
      {
        "id": "string",
        "storeId": "string",
        "name": "string",
        "slug": "string",
        "image": "string"
      }
    ]
  }
  ```

## Get Category By ID

- Request:
  - Method: GET
  - Endpoint: `/api/v1/categories/:id`
  - Header:
    - Accept: application/json
- Response: `ApiResponse<Category>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "name": "string",
      "slug": "string",
      "image": "string"
    }
  }
  ```

## Create Category

- Request:
  - Method: POST
  - Endpoint: `/api/v1/categories`
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
      "image": "file"
    }
    ```

- Response: `ApiResponse<Category>`
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
      "image": "string"
    }
  }
  ```

## Update Category

- Request:
  - Method: PUT
  - Endpoint: `/api/v1/categories/:id`
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
      "image": "file"
    }
    ```
- Response: `ApiResponse<Category>`
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
      "image": "string"
    }
  }
  ```

## Delete Category

- Request:
  - Method: DELETE
  - Endpoint: `/api/v1/categories/:id`
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
