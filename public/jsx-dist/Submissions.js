var Submissions = React.createClass({displayName: "Submissions",
    getInitialState: function() {
        return {
            submissions: [{
                description: '',
                imgUrl: '',
                comments: ['']
            }]
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result) {
            if (this.isMounted()) {
                this.setState({
                    submissions: result
                });
            }
        }.bind(this));
    },
    render: function() {
        var submissionImages = this.state.submissions.map(function(submission) {
            return (
                React.createElement(SubmissionImage, {
                    description: submission.description, 
                    key: submission.imgUrl, 
                    imgUrl: submission.imgUrl, 
                    comments: submission.comments}
                    )
            );
        });

        var hasSubmissions = submissionImages.length > 0;
        var submissionView = (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", null, 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", null, 
                            React.createElement("h1", null, "From ", this.props.title)
                        )
                    ), 
                    React.createElement("div", {className: "row"}, 
                        React.createElement("div", {className: "list-group"}, 
                            React.createElement("div", null, 
                                submissionImages
                            )
                        )
                    )
                )
            )
        );

        var appol = (
            React.createElement("div", {className: "container"}, 
                React.createElement("div", null, 
                    React.createElement("h1", null, "From ", this.props.title), 
                    React.createElement("div", {className: "row"}, 
                        "This page will contain all of our submissions from ", this.props.title
                    ), 
                    React.createElement("div", {className: "row"}, 
                        "It doesn't look like we have any yet (Because it hasn't started yet :P)"
                    )
                )

            )
        );

        return (
            hasSubmissions ? submissionView : appol
        );
    }
});
