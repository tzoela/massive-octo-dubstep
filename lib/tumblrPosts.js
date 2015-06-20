var request = require('request');

var tumblrAPIURL = 'http://api.tumblr.com/v2/blog/teamoxfordsnotbrogues.tumblr.com/posts?filter=text';



function tryForSize(width, photo, urlList) {
    photo.alt_sizes.forEach(function(sized) {
        if(sized.width === width) {
            urlList.push({
                url:sized.url,
                height: sized.height,
                width: sized.width
            });
        }
    });

    return urlList;
}

var reasonableSizes = [400, 500, 1280];

function showcaseUrls(limit, body) {

    var urlList = [];

    body.response.posts.forEach(function(post) {
        if(post.photos) {
            post.photos.forEach(function(photo) {
                var listLenght = urlList.length;

                reasonableSizes.forEach(function(size) {
                    if(urlList.length === listLenght) {
                        urlList = tryForSize(size, photo, urlList);
                    }
                });

            });
        }
    });

    return urlList.slice(0, limit);
}


module.exports = function() {

    function requestFromTumblr(limit, callback, formatter) {
        request(tumblrAPIURL, function(error, head, body) {
            if(error) {callback(error);}
            else if(head.statusCode !== 200){callback(new Error('non-200'));}
            else {
                callback(null, formatter(limit, JSON.parse(body)));
            }
        });
    }

    return {
        asShowcase: function(limit, callback) {
            requestFromTumblr(limit, callback, showcaseUrls);
        }
    };

};
