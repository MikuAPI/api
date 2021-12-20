---
description: Introduction to the API's response.
---

# API Responses

All API endpoints must return a strict format of JSON.

```
{
    "data": "The data you're requesting, usually a dictionary.",
    "message": null,
    "status": 200
}
```

Here's an example with the "Get user information" endpoints:

{% swagger method="get" path="/api/user" baseUrl="https://miku-for.us" summary="Get informations about an user" %}
{% swagger-description %}
Not all informations are shown. (Some are private, as for example, the email)
{% endswagger-description %}

{% swagger-parameter in="path" name="id" type="Number" required="true" %}
The user's ID.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="User found" %}
```javascript
{
    "data": {
        "id":1,
        "name":"Predeactor",
        "avatar":null,
        "email":"predeactor0@gmail.com",
        "remember_me_token":null,
        "role":"USER",
        "status":"PENDING",
        "suspending_reason":null,
        "suspending_author":null,
        "created_at":"2021-12-15T23:48:54.000+01:00",
        "updated_at":"2021-12-15T23:48:54.000+01:00"
    },
    "message":null,
    "status":200
}
```
{% endswagger-response %}

{% swagger-response status="404: Not Found" description="If the user is not found" %}
```javascript
{
    "data": null,
    "errors": [
        {
            "message": "E_ROW_NOT_FOUND: E_ROW_NOT_FOUND: Row not found"
            "name": "ApiException",
        },
    ],
    "message": "E_ROW_NOT_FOUND: E_ROW_NOT_FOUND: Row not found",
    "status": 404
}
```
{% endswagger-response %}

{% swagger-response status="500: Internal Server Error" description="In case of issue. " %}
```javascript
{
    "data": null,
    "errors": [
        {
            "message": "Error's message"
            "name": "Name of the exception",
        },
    ],
    "message": "Message of the error",
    "status": 500
}
```
{% endswagger-response %}
{% endswagger %}
