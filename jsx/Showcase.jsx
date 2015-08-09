var React = require('react');

var ShowcaseItems = require('./ShowcaseItems.jsx');

var Showcase = React.createClass({
    render: function() {
        return (
            <div className="container">
                <div >
                    <div className="container">
                        <div>
                            <h1>Team Tumblr Showcase</h1>
                        </div>
                    </div>

                    <div className="showcase-grid">
                        <ShowcaseItems source='/api/showcase'></ShowcaseItems>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Showcase;
