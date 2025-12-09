# User API-Spec

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

### Schema `UserResponse`

```ts
type UserResponse = {
  id: string;
  storeId: string;
  fullName: string;
  avatar?: string | null;
  username: string;
  email: string;
  phone: string;
  status: string;
};
```

## Get List User

- Request:
  - Method: GET
  - Endpoint: `/api/v1/users`
  - Header:
    - Accept: application/json
  - Query Param:
    - limit: number
    - page: number
    - search: string
- Response: `ApiResponse<UserResponse[],ApiPagination>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": [
      {
        "id": "string",
        "storeId": "string",
        "fullName": "string",
        "avatar": "string",
        "username": "string",
        "email": "string",
        "phone": "string",
        "status": "string"
      },
      {
        "id": "string",
        "storeId": "string",
        "fullName": "string",
        "avatar": "string",
        "username": "string",
        "email": "string",
        "phone": "string",
        "status": "string"
      }
    ]
  }
  ```

## Get User By ID

- Request:
  - Method: GET
  - Endpoint: `/api/v1/users/:id`
  - Header:
    - Accept: application/json
- Response: `ApiResponse<UserResponse>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "fullName": "string",
      "avatar": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
      "status": "string"
    }
  }
  ```

## Create User

- Request:
  - Method: POST
  - Endpoint: `/api/v1/users`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "storeId": "string",
      "fullName": "string",
      "username": "string",
      "avatar": "string",
      "email": "string,email",
      "phone": "string",
      "status": "string",
      "password": "string,min(6)",
      "confirmPassword": "string,min(6)"
    }
    ```
- Response: `ApiResponse<UserResponse>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "fullName": "string",
      "avatar": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
      "status": "string"
    }
  }
  ```

## Update User

- Request:
  - Method: PUT
  - Endpoint: `/api/v1/users/:id`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "storeId": "string",
      "fullName": "string",
      "username": "string",
      "avatar": "string",
      "email": "string,email",
      "phone": "string",
      "status": "string",
      "password": "string,min(6)",
      "confirmPassword": "string,min(6)"
    }
    ```
- Response: `ApiResponse<UserResponse>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "fullName": "string",
      "avatar": "string",
      "username": "string",
      "email": "string",
      "phone": "string",
      "status": "string"
    }
  }
  ```

## Delete User

- Request:
  - Method: DELETE
  - Endpoint: `/api/v1/users/:id`
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
