"""Template tags used to render pages."""
from django import template
from django.conf import settings

from optimizations.assetcache import AdaptiveAsset
from optimizations.thumbnailcache import (
    default_thumbnail_cache, ThumbnailError, PROPORTIONAL)

register = template.Library()


@register.inclusion_tag("assets/responsive_img.html")
def responsive_img(src, method=PROPORTIONAL, alt="", **attrs):
    """Renders an image tag."""
    output = {
        "sizes": [],
        "alt": alt,
        "attrs": attrs,
    }

    for size in settings.RESPONSIVE_IMAGES_SIZES:
        params = {}

        try:
            thumbnail = default_thumbnail_cache.get_thumbnail(
                src,
                width=size['width'],
                height=size['height'],
                method=method,
            )
        except ThumbnailError:
            asset = AdaptiveAsset(src)
            params.update({
                "url": asset.get_url(),
                "width": size['width'] or "",
                "height": size['height'] or "",
            })
        else:
            params.update({
                "url": thumbnail.url,
                "width": thumbnail.width,
                "height": thumbnail.height,

            })

        output['sizes'].append(params)

    return output
