var ShowcaseItems = React.createClass({
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

            var height = image.height;// + 'px';
            var width = image.width;// + 'px';

            var classNames = 'img-rounded lazy showcase-grid-item ';

            var apsRatio = height/width;
            var givenWidth = 350;
            var ajustedHeight = apsRatio * givenWidth;


            if(image.url === '') {
                return (
                    <img src='data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==' />
                );
            } else {
                return (
                    <img
                        key={image.url}
                        className='img-rounded lazy overflow min-350 showcase-grid-item'
                        data-original={image.url}
                        width={givenWidth}
                        height={ajustedHeight}
                        />
                );

            }

        })

        return (
            <div>
                {images}
            </div>
        );
    }
});
