---
description: This page will introduce you to the error that the API might return you.
---

# Exception Handling

All exceptions raised from the API itself will return a JSON object, however if an exception happens on the website directly, the user will be redirected to a page or receive a notification that an error happened.

The API will return a strict format of JSON, so you can be sure of what to expect in case you need to catch an error. The following is an example of an error you can get:

```
{
    "data": null,
    "errors": [
        {
            "message": "I am an error!"
            "name": "ApiException",
        },
    ],
    "message": "I am the message of why the error happened! I can be null.",
    "status": 500
}
```

{% hint style="warning" %}
You should always check if an exception has been raised by looking up the status code, by comparing the status code you have received in your response. The status code in the body is complementary.
{% endhint %}

`data` will always be null, since there is an exception, we consider that no data should be returned.

`errors` will return a list of the exceptions that happened, however there should technically be only one, we still use a list in case there might be multiple errors thrown.

`message` is an explicative message of why the exception happened.

`status` is the same status code you receive in the response.
