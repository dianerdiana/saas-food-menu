# Authentication API-Spec

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
  fullName: string;
  avatar?: string | null;
  username: string;
  email: string;
  phone: string;
  status: string;
};
```

## Sign Up

- Request:
  - Method: POST
  - Endpoint: `/api/v1/auth/signup`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "fullName": "string",
      "username": "string",
      "email": "string,email",
      "phone": "string",
      "password": "string,min(6)",
      "confirmPassword": "string,min(6)"
    }
    ```
- Response: `ApiResponse`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string"
  }
  ```

## Sign In

- Request:
  - Method: POST
  - Endpoint: `/api/v1/auth/signin`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "email": "string,email",
      "password": "string,min(6)"
    }
    ```

- Response:

  ```ts
  ApiResponse<{}>;
  ```

  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "accessToken": "string",
      "refreshToken": "string",
      "userData": {
        "id": "string",
        "fullName": "string",
        "username": "string",
        "email": "string",
        "phone": "string",
        "status": "string",
        "permissions": [
          {
            "id": "string",
            "name": "string",
            "action": "string",
            "subject": "string",
            "conditions": "string",
            "inverted": "boolean"
          },
          {
            "id": "string",
            "name": "string",
            "action": "string",
            "subject": "string",
            "conditions": "string",
            "inverted": "boolean"
          }
        ]
      }
    }
  }
  ```
