# Subscription API-Spec

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

### Schema `Subscription`

```ts
type Subscription = {
  id: string;
  storeId: string;
  userId: string;
  status: string;
  subscriptionPayments: SubscriptionPayment[];
};
```

### Schema `SubscriptionPayment`

```ts
type SubscriptionPayment = {
  id: string;
  subscriptionId: string;
  paymentMethod: string;
  proof: string;
  bankAccount: string;
  bankName: string;
  bankNumber: string;
};
```

## Get List Subscription

- Request:
  - Method: GET
  - Endpoint: `/api/v1/subscriptions`
  - Header:
    - Accept: application/json
  - Query Param:
    - limit: number
    - page: number
    - search: string
- Response: `ApiResponse<Subscription[],ApiPagination>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": [
      {
        "id": "string",
        "storeId": "string",
        "userId": "string",
        "status": "string",
        "subscriptionPayments": [
          {
            "id": "string",
            "subscriptionId": "string",
            "paymentMethod": "string",
            "proof": "string",
            "bankAccount": "string",
            "bankName": "string",
            "bankNumber": "string"
          },
          {
            "id": "string",
            "subscriptionId": "string",
            "paymentMethod": "string",
            "proof": "string",
            "bankAccount": "string",
            "bankName": "string",
            "bankNumber": "string"
          }
        ]
      }
    ]
  }
  ```

## Get Subscription By ID

- Request:
  - Method: GET
  - Endpoint: `/api/v1/subscriptions/:id`
  - Header:
    - Accept: application/json
- Response: `ApiResponse<Subscription>`
  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "userId": "string",
      "status": "string",
      "subscriptionPayments": [
        {
          "id": "string",
          "subscriptionId": "string",
          "paymentMethod": "string",
          "proof": "string",
          "bankAccount": "string",
          "bankName": "string",
          "bankNumber": "string"
        },
        {
          "id": "string",
          "subscriptionId": "string",
          "paymentMethod": "string",
          "proof": "string",
          "bankAccount": "string",
          "bankName": "string",
          "bankNumber": "string"
        }
      ]
    }
  }
  ```

## Create Subscription

- Request:
  - Method: POST
  - Endpoint: `/api/v1/subscriptions`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "storeId": "string",
      "paymentMethod": "string",
      "proof": "string",
      "bankAccount": "string",
      "bankName": "string",
      "bankNumber": "string"
    }
    ```
- Response: `ApiResponse<Subscription>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "userId": "string",
      "status": "string",
      "subscriptionPayments": [
        {
          "id": "string",
          "subscriptionId": "string",
          "paymentMethod": "string",
          "proof": "string",
          "bankAccount": "string",
          "bankName": "string",
          "bankNumber": "string"
        },
        {
          "id": "string",
          "subscriptionId": "string",
          "paymentMethod": "string",
          "proof": "string",
          "bankAccount": "string",
          "bankName": "string",
          "bankNumber": "string"
        }
      ]
    }
  }
  ```

## Update Subscription

- Request:
  - Method: PUT
  - Endpoint: `/api/v1/subscriptions/:id`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "storeId": "string",
      "paymentMethod": "string",
      "proof": "string",
      "bankAccount": "string",
      "bankName": "string",
      "bankNumber": "string"
    }
    ```
- Response: `ApiResponse<Subscription>`
  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "storeId": "string",
      "userId": "string",
      "status": "string",
      "subscriptionPayments": [
        {
          "id": "string",
          "subscriptionId": "string",
          "paymentMethod": "string",
          "proof": "string",
          "bankAccount": "string",
          "bankName": "string",
          "bankNumber": "string"
        },
        {
          "id": "string",
          "subscriptionId": "string",
          "paymentMethod": "string",
          "proof": "string",
          "bankAccount": "string",
          "bankName": "string",
          "bankNumber": "string"
        }
      ]
    }
  }
  ```

## Delete Subscription

- Request:
  - Method: DELETE
  - Endpoint: `/api/v1/subscriptions/:id`
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
