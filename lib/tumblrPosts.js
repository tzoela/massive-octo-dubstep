var request = require('request-promise');
var Q = require('q');

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


module.exports = function() {

    return {
        promised: {
            asShowcase: function(limit, excludedTags) {

                return Q.Promise(function(resolve, reject) {
                    request(tumblrAPIURL).then(function(remoteResponse) {
                        resolve(showcaseUrls(limit, JSON.parse(remoteResponse), excludedTags || ['']));
                    }, function(error) {
                        reject(error);
                    });
                });
            }
        }
    };

};
