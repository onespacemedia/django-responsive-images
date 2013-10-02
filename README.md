django-responsive-images
========================

Provides responsive image generation in Django.


Getting Started
===============

This project has a dependancy on etianen/django-optimizations which handles the actual image resizing and jQuery for the front-end image selection.  You will need to add a configuation line to your settings file, a boilerplate example follows. You can add as many images sizes as you like.

```
RESPONSIVE_IMAGES_SIZES = [
    {
        "width": 1440,
        "height": 810
    },
    {
        "width": 1280,
        "height": 720
    },
    {
        "width": 1024,
        "height": 576
    },
    {
        "width": 768,
        "height": 432
    },
    {
        "width": 480,
        "height": 270
    }
]

```

To actually make your images responsive you will need to import the supplied templatetag and use it as follows:

```
{% load responsive_images %}

{% responsive_img project.image.file method="crop" %}
```

When the page loads it will perform all of the resizes and pass them into a data- attribute on the image tag, the Javascript code will then select the best image size for the given container size.
