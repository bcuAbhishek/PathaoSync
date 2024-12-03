# Backend API Documentation

## User Registration Endpoint

### Endpoint: `/auth/register`

This endpoint is used to register a new user.

#### Method: POST

#### Request Body

The request body should be a JSON object containing the following fields:

- `firstName` (string, required): The first name of the user. Must be at least 2 characters long.
- `lastName` (string, required): The last name of the user.
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password for the user. Must be at least 6 characters long.

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