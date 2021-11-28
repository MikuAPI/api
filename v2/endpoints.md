---
description: MikuAPI's v2 endpoints.
---

# v2 Endpoints

{% swagger baseUrl="https://miku-for.us" path="/api/v2/random" method="get" summary="Get Random Images" %}
{% swagger-description %}
Retrieve a random image of the API
{% endswagger-description %}

{% swagger-response status="200" description="Obtain the image URL." %}
```javascript
{
    "url": "https://miku-for.us/img/ckoopxet900e9m2m3fkjz9ps2.jpg"
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://miku-for.us" path="/api/v2/all" method="get" summary="Get All Images" %}
{% swagger-description %}
Obtain all images stored. ⚠ Please avoid using this endpoints for bad purpose, this may simply get you banned from the service.
{% endswagger-description %}

{% swagger-response status="200" description="Get your images!" %}
```javascript
{
    "message": "Warning, making usage of this endpoint is NOT recommended if you want to show all images, this could get clients being ratelimited by the API.",
    "files": [
        "https://miku-for.us/img/ckoopxeo20000m2m384eldxuo.png",
        "https://miku-for.us/img/ckoopxeo40001m2m3cov536gk.png",
        "https://miku-for.us/img/ckoopxeo40002m2m3aahg5y5r.png",
        "https://miku-for.us/img/ckoopxeo40003m2m304sec4qs.png",
        "..."
    ]
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger baseUrl="https://miku-for.us" path="/api/add" method="post" summary="Post new image" %}
{% swagger-description %}


\


This endpoint require a token! This is done in order to prevent spam and abuse. A token can be obtained by contacting an owner by pressing the "Contact" button on the website or by DMing an API owner on the Discord server.
{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" type="string" %}
Your token here. "Bearer" is the authorization we use, so put "Bearer <Your_Token>" to make it work.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="image" type="object" %}
Your image. Must be either a .jpg, a .png or a .gif. Maximum allowed size is 5mb.
{% endswagger-parameter %}

{% swagger-response status="200" description="Image has been uploaded and ready to get served." %}
```javascript
{
    message: 'File as been renamed to a collision resistant ID. (CUID)',
    filename: 'ckoopxeo40003m2m304sec4qs.png',
    cuid: 'ckoopxeo40003m2m304sec4qs',
}
```
{% endswagger-response %}

{% swagger-response status="401" description="Authorization denied." %}
```
Access denied
```
{% endswagger-response %}
{% endswagger %}
