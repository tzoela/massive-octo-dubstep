var Submissions = React.createClass({
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
                <SubmissionImage
                    description={submission.description}
                    key={submission.imgUrl}
                    imgUrl={submission.imgUrl}
                    comments={submission.comments}
                />
            );
        });

        var hasSubmissions = submissionImages.length > 0;
        var submissionView = (
            <div className="container">
                <div >
                    <div className="row">
                        <div>
                            <h1>From {this.props.title}</h1>
                        </div>
                    </div>
                    <div className="row">
                        <div className="list-group">
                            <div>
                                {submissionImages}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

        var appol = (
            <div>
                None yet, come back soon! :)
            </div>
        );

        return (
            hasSubmissions ? submissionView : appol
        );
    }
});
