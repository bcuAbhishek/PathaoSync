# Backend API Documentation

## User Registration Endpoint

### Endpoint: `/auth/register`

This endpoint is used to register a new user.

#### Method: POST

#### Request Body

The request body should be a JSON object containing the following fields:

-   `firstName` (string, required): The first name of the user. Must be at least 2 characters long.
-   `lastName` (string, required): The last name of the user.
-   `email` (string, required): The email address of the user. Must be a valid email format.
-   `password` (string, required): The password for the user. Must be at least 6 characters long.

#### Example Request

```json
{
    "fullName": {
        "firstName": "John",
        "lastName": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Login User

**URL:** `/auth/login`

**Method:** `POST`

**Description:** Logs in an existing user.

**Request Body:**

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### `GET /auth/me`

#### Description

Fetch the authenticated user's details.

#### Headers

-   `Cookie`: `token=<JWT_TOKEN>`

#### Response

-   **200 OK**
    ```json
    {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "password": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Z5l5l5l5l5l5l5l5l5l",
        "socketId": "someSocketId"
    }
    ```

### `POST /auth/logout`

#### Description

Logs out the authenticated user by clearing the authentication token.

#### Headers

-   `Cookie`: `token=<JWT_TOKEN>`

#### Response

-   **200 OK**
    ```json
    {
        "message": "Logged out successfully"
    }
    ```

### `POST /captain/register`

#### Description

Registers a new captain.

#### Request Body

```json
{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "phone": "1234567890",
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "type": "car"
}
```

#### Response

-   **201 Created**
    ```json
    {
        "message": "Captain created successfully",
        "captain": {
            "_id": "60d0fe4f5311236168a109ca",
            "fullName": {
                "firstName": "John",
                "lastName": "Doe"
            },
            "email": "john.doe@example.com",
            "password": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36Z5l5l5l5l5l5l5l5l5l",
            "phone": "1234567890",
            "vehicle": {
                "color": "Red",
                "plate": "ABC123",
                "capacity": 4,
                "type": "car"
            },
            "status": "offline",
            "socketId": null,
            "location": {
                "latitude": null,
                "longitude": null
            }
        }
    }
    ```

### `POST /captain/login`

#### Description

Logs in an existing captain.

#### Request Body

```json
{
    "email": "john.doe@example.com",
    "password": "password123"
}
```

#### Response

-   **200 OK**
    ```json
    {
        "message": "Captain Login successful"
    }
    ```

### `GET /captain/getCaptain`

#### Description

Fetch the authenticated captain's details.

#### Headers

-   `Cookie`: `token=<JWT_TOKEN>`

#### Response

-   **200 OK**
    ```json
    {
        "_id": "60d0fe4f5311236168a109ca",
        "fullName": {
            "firstName": "John",
            "lastName": "Doe"
        },
        "email": "john.doe@example.com",
        "phone": "1234567890",
        "vehicle": {
            "color": "Red",
            "plate": "ABC123",
            "capacity": 4,
            "type": "car"
        },
        "status": "offline",
        "socketId": null,
        "location": {
            "latitude": null,
            "longitude": null
        }
    }
    ```

### `POST /captain/logout`

#### Description

Logs out the authenticated captain by clearing the authentication token.

#### Headers

-   `Cookie`: `token=<JWT_TOKEN>`

#### Response

-   **200 OK**
    ```json
    {
        "message": "Logged out successfully"
    }
    ```
