var ShowcaseItems = React.createClass({displayName: "ShowcaseItems",
    getInitialState: function() {
        return {
            images: [{
                url: '',
                height: 0,
                width:0
            }]
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    images: result
                });
                var $container = $('.showcase-grid');
                console.log($container);
                $container.packery({
                  itemSelector: '.showcase-grid-item',
                  gutter: 0
                });

                $('img.lazy').lazyload({
                    effect : 'fadeIn'
                });
            }
        }.bind(this));

    },
    render: function() {
        var images = this.state.images.map(function(image) {

            var height = image.height + 'px';
            var width = image.width + 'px';
            return (
                React.createElement("img", {
                    key: image.url, 
                    className: "img-rounded lazy showcase-grid-item col-lg-4 col-md-5 col-sm-6 .col-xs-7", 
                    "data-original": image.url, 
                    width: width, 
                    height: height}
                )
                );
        })

        return (
            React.createElement("div", null, 
                images
            )
        );
    }
});
