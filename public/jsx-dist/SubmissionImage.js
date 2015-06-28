var SubmissionImage = React.createClass({displayName: "SubmissionImage",
    render: function () {
        var comments;
        if(this.props.comments) {
            comments = this.props.comments.map(function (comment) {
                return (
                    React.createElement("div", {className: "text-center"}, comment)
                );
            });
        }

        return (
            React.createElement("div", {className: "list-group-item"}, 
                React.createElement("div", {className: "text-center"}, 
                    this.props.description
                ), 
                React.createElement("img", {className: "img-rounded col-centered submission-item", src: this.props.imgUrl}), 
                comments
            )
        );
    }
});
