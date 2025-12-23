# Page API-Spec

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
  category: {
    id: string;
    name: string;
  };
};
```

### Schema `Menu Ingredients`

```ts
type Ingredient = {
  id: string;
  name: string;
};
```

### Schema Transaction`

```ts
type Transaction = {
  id: string;
  name: string;
  code: string;
  transactionDetails: {
    id: string;
    transactionId: string;
    productId: string;
    quantity: number;
  }[];
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

  ```json
  {
    "code": "number",
    "status": "string",
    "data": {
      "categories": [
        {
          "id": "string",
          "storeId": "string",
          "name": "string",
          "slug": "string"
        },
        {
          "id": "string",
          "storeId": "string",
          "name": "string",
          "slug": "string"
        }
      ],
      "favoriteProducts": [
        {
          "id": "string",
          "storeId": "string",
          "name": "string",
          "slug": "string",
          "image": "string",
          "price": "number",
          "category": {
            "id": "string",
            "name": "string"
          }
        },
        {
          "id": "string",
          "storeId": "string",
          "name": "string",
          "slug": "string",
          "image": "string",
          "price": "number",
          "category": {
            "id": "string",
            "name": "string"
          }
        }
      ],
      "recommendationProducts": [
        {
          "id": "string",
          "storeId": "string",
          "name": "string",
          "slug": "string",
          "image": "string",
          "price": "number",
          "category": {
            "id": "string",
            "name": "string"
          }
        },
        {
          "id": "string",
          "storeId": "string",
          "name": "string",
          "slug": "string",
          "image": "string",
          "price": "number",
          "category": {
            "id": "string",
            "name": "string"
          }
        }
      ]
    }
  }
  ```

## Get Page Products

- Request:
  - Method: GET
  - Endpoint: `/api/v1/pages/products`
  - Header:
    - Accept: application/json
- Response:

  ```ts
  ApiResponse<Product[]>;
  ```

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
        "price": "number",
        "category": {
          "id": "string",
          "name": "string"
        }
      },
      {
        "id": "string",
        "storeId": "string",
        "name": "string",
        "slug": "string",
        "image": "string",
        "price": "number",
        "category": {
          "id": "string",
          "name": "string"
        }
      }
    ]
  }
  ```

## Get Page Categories

- Request:
  - Method: GET
  - Endpoint: `/api/v1/pages/search`
  - Header:
    - Accept: application/json
- Response:

  ```ts
  ApiResponse<Category[]>;
  ```

  ```json
  {
    "code": "number",
    "status": "string",
    "data": [
      {
        "id": "string",
        "storeId": "string",
        "name": "string",
        "slug": "string"
      },
      {
        "id": "string",
        "storeId": "string",
        "name": "string",
        "slug": "string"
      }
    ]
  }
  ```

## Get Page Product Details

- Request:
  - Method: GET
  - Endpoint: `/api/v1/pages/products/:id/details`
  - Header:
    - Accept: application/json
- Response:

  ```ts
  ApiResponse<Product & { ingredients: Ingredients[] }>;
  ```

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
      "price": "number",
      "ingredients": [
        { "id": "string", "name": "string" },
        { "id": "string", "name": "string" }
      ]
    }
  }
  ```

## Create Page Transaction

- Request:
  - Method: POST
  - Endpoint: `/api/v1/pages/transactions`
  - Header:
    - Content-Type: application/json
    - Accept: application/json
  - Body:
    ```json
    {
      "name": "string",
      "phone": "string",
      "tableNumber": "string",
      "paymentMethod": "string",
      "products": [
        {
          "productId": "string",
          "quantity": "number",
          "note": "string"
        },
        {
          "productId": "string",
          "quantity": "number",
          "note": "string"
        }
      ]
    }
    ```
- Response:

  ```ts
  ApiResponse<{ transactionId: 'string' }>;
  ```

  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "transactionId": "string"
    }
  }
  ```

## Get Page Detail Transaction Created

- Request:
  - Method: GET
  - Endpoint: `/api/v1/pages/transactions/:id/details`
  - Header:
    - Accept: application/json
- Response:

  ```ts
  ApiResponse<Transaction>;
  ```

  ```json
  {
    "code": "number",
    "status": "string",
    "message": "string",
    "data": {
      "id": "string",
      "name": "string",
      "code": "string",
      "transactionDetails": [
        {
          "id": "string",
          "transactionId": "string",
          "productId": "string",
          "quantity": "number"
        },
        {
          "id": "string",
          "transactionId": "string",
          "productId": "string",
          "quantity": "number"
        }
      ]
    }
  }
  ```
