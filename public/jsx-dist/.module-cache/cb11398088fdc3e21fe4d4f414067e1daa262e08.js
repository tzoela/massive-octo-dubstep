var Showcase = React.createClass({displayName: "Showcase",
    render: function() {
        return (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", null, 
                    React.createElement("div", {className: "container"}, 
                        React.createElement("div", null, 
                            React.createElement("h1", null, "Showcase")
                        )
                    ), 

                    React.createElement("div", {className: "showcase-grid"}, 
                        React.createElement(ShowcaseItems, {source: "/api/showcase"})
                    )
                )
            )
        );
    }
});
