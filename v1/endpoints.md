---
description: MikuAPI's v1 endpoints.
---

# v1 Endpoints

{% swagger method="get" path="/endpoints" baseUrl="https://mikuapi.predeactor.net" summary="Endpoints Listing" %}
{% swagger-description %}
Return the available endpoints of the API.
{% endswagger-description %}

{% swagger-response status="200: OK" description="The only response available." %}
```javascript
{
  "random": {
    "description": "Return a random image.",
    "ratelimit": "100 requests per minute.",
    "types": [".jpg", ".png", ".gif"],
    "availableImages": 100,  # 
  },
}
```
{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/random" baseUrl="https://mikuapi.predeactor.net" summary="Random image" %}
{% swagger-description %}
Return a random image stored in a folder of the server.
{% endswagger-description %}

{% swagger-response status="200: OK" description="" %}
```javascript
{
  "url": "https://mikuapi.predeactor.net/images/0001.png" 
}
```
{% endswagger-response %}
{% endswagger %}
