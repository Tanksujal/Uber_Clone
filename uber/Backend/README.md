# User Registration & Login API

## 1. User Registration

### Endpoint: `POST /users/register`

#### Description
This endpoint allows a user to register by providing their full name, email, and password. The password is hashed before being stored, and a JWT token is generated upon successful registration.

### Request Body
The request body must contain the following fields:

| Field          | Type   | Required | Validation                             |
|---------------|--------|----------|-----------------------------------------|
| fullname.firstname | String | Yes      | Minimum 3 characters                  |
| fullname.lastname  | String | No       | Minimum 3 characters (if provided)     |
| email         | String | Yes      | Must be a valid email format, unique   |
| password      | String | Yes      | Minimum 6 characters                   |

### Example Request Body
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### Responses

#### Success Response (201 Created)
If the registration is successful, the response includes a JWT token and the created user object.

```json
{
    "token": "<JWT_TOKEN>",
    "user": {
        "fullName": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "6123abcd4567efgh8901ijkl"
    }
}
```

#### Error Responses

##### 400 Bad Request (Validation Error)
If any required fields are missing or do not pass validation, an error message is returned.

```json
{
    "errors": [
        {
            "msg": "First name must be at least 3 characters long",
            "param": "fullname.firstname",
            "location": "body"
        }
    ]
}
```

##### 400 Bad Request (Missing Fields)
If essential fields are missing, an error message is returned.

```json
{
    "error": "Please fill all the fields"
}
```

##### 500 Internal Server Error
If there is an issue with the server while processing the request.

```json
{
    "error": "Internal server error"
}
```

### Notes
- The password is hashed before being stored in the database.
- The email must be unique; duplicate registrations with the same email will fail.
- The generated JWT token can be used for authentication in subsequent requests.
- The API follows proper validation using `express-validator`.

---

## 2. User Login

### Endpoint: `POST /users/login`

#### Description
This endpoint allows a registered user to log in using their email and password. Upon successful authentication, a JWT token is generated.

### Request Body
The request body must contain the following fields:

| Field    | Type   | Required | Validation                  |
|----------|--------|----------|------------------------------|
| email    | String | Yes      | Must be a valid email format |
| password | String | Yes      | Minimum 6 characters         |

### Example Request Body
```json
{
    "email": "john.doe@example.com",
    "password": "securepassword123"
}
```

### Responses

#### Success Response (200 OK)
If the login is successful, the response includes a JWT token and user data.

```json
{
    "token": "<JWT_TOKEN>",
    "user": {
        "fullName": {
            "firstname": "John",
            "lastname": "Doe"
        },
        "email": "john.doe@example.com",
        "_id": "6123abcd4567efgh8901ijkl"
    }
}
```

#### Error Responses

##### 400 Bad Request (Validation Error)
If the email or password does not meet validation criteria.

```json
{
    "errors": [
        {
            "msg": "Invalid Email",
            "param": "email",
            "location": "body"
        }
    ]
}
```

##### 401 Unauthorized (Invalid Credentials)
If the email does not exist or the password is incorrect.

```json
{
    "error": "Invalid Email Or Password"
}
```

##### 500 Internal Server Error
If there is an issue with the server while processing the request.

```json
{
    "error": "Internal server error"
}
```

### Notes
- The password is securely hashed and compared using bcrypt.
- The API follows proper validation using `express-validator`.
- The JWT token can be used for authentication in subsequent requests.

