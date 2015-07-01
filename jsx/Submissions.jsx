var React = require('react');

var SubmissionImage = require('./SubmissionImage.jsx');

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
                    itemNumber={submission.itemNumber}
                    award={submission.award}
                    />
            );
        });

        var hasSubmissions = submissionImages.length > 0;
        var header = (
            <div>
                <h1>{this.props.title}</h1>
                <h4>{this.props.subtitle}</h4>
            </div>
        );

        var submissionView = (
            <div className="container">
                <div >
                    <div className="row">
                        <div>
                            {header}
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
            <div className="container">
                <div>
                    <div className="row">
                        <div>
                            {header}
                        </div>
                    </div>
                </div>
                <div className="row">
                    This page will contain all of our submissions from {this.props.title}
                </div>
                <div className="row">
                    It doesn't look like we have any yet (Because it hasn't started yet :P)
                </div>

            </div>
        );

        return (
            hasSubmissions ? submissionView : appol
        );
    }
});
module.exports = Submissions;
