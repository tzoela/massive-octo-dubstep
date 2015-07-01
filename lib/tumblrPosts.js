var request = require('request');

var tumblrAPIURL = 'http://api.tumblr.com/v2/blog/teamoxfordsnotbrogues.tumblr.com/posts?filter=text';

function pruneByTagNames(posts, tags) {

    var pruned = posts.filter(function(post) {
        var matchingTags = tags.filter(function(tag) {
            return (post.tags.indexOf(tag) !== -1);
        });
        return matchingTags.length <= 0;
    });
    return pruned;
}


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

var reasonableSizes = [400, 500, 1280, 250, 260, 100];

function showcaseUrls(limit, body, excludedTags) {

    var urlList = [];
    var posts = pruneByTagNames(body.response.posts, excludedTags);
    posts.forEach(function(post) {
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

function extractPostData(limit, body, excludedTags) {
    var postList = [];
    var posts = pruneByTagNames(body.response.posts, excludedTags);
    posts.forEach(function(post) {
        if(post.photos) {
            post.photos.forEach(function(photo) {
                var listLenght = postList.length;

                reasonableSizes.forEach(function(size) {
                    if(postList.length === listLenght) {
                        postList = tryForSize(size, photo, postList);
                    }
                });

            });
        }
    });

    return postList.slice(0, limit);
}


module.exports = function() {

    function requestFromTumblr(limit, callback, formatter, excludedTags) {

        request(tumblrAPIURL, function(error, head, body) {
            if(error) {callback(error);}
            else if(head.statusCode !== 200){callback(new Error('non-200'));}
            else {
                callback(null, formatter(limit, JSON.parse(body), excludedTags));
            }
        });
    }

    return {
        asShowcase: function(limit, callback, excludedTags) {

            requestFromTumblr(limit, callback, showcaseUrls, excludedTags || ['']);
        },

        asPosts: function(limit, callback, excludedTags) {
            requestFromTumblr(limit, callback, extractPostData, excludedTags || ['']);

        }
    };

};
