var responsive_images = function() {
    $('.responsive-image').each(function() {
        // Parse out the image sizes available.
        // Format: widthxheight=url
        sizes_str = $(this).attr('data-sizes');
        sizes_str = sizes_str.split(';');
        size = [];

        container_size = $(this).parent().width();

        for (var i in sizes_str) {
            components = sizes_str[i].match(/(\d+)x(\d+)=([\/\.\w\d]+)/);

            var width = parseInt(components[1], 10);
            var height = parseInt(components[2], 10);
            var src = components[3];

            if (width < container_size) {
                // Image is too small, disregard.
                continue;
            }

            if (width == container_size) {
                // This is perfect, lets use it.
                size = {
                    "width": width,
                    "height": height,
                    "src": src,
                };

                break;
            }

            // width is now greater than container_size, so find the closest match.
            if (size['width']) {
                if (width < size['width']) {
                    size = {
                        "width": width,
                        "height": height,
                        "src": src,
                    };
                }
            }
            else {
                size = {
                    "width": width,
                    "height": height,
                    "src": src,
                };
            }
        }

        $(this).attr(size);
    });
};

$(window).on('resize', responsive_images);
$(function() {
    responsive_images();
});
