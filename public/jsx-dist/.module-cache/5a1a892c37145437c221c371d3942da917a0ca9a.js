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
            React.createElement("div", null, 
                "None yet, come back soon! :)"
            )
        );

        return (
            hasSubmissions ? submissionView : appol
        );
    }
});
