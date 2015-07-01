var SubmissionImage = React.createClass({
    render: function () {
        var comments;
        if(this.props.comments) {
            comments = this.props.comments.map(function (comment) {
                return (
                    <div className="text-center">{comment}</div>
                );
            });
        }

        return (
            <div className="list-group-item">
                <div className="text-center">
                    {this.props.description}
                </div>
                <img className="img-rounded col-centered submission-item" src={this.props.imgUrl} />
                {comments}
            </div>
        );
    }
});

module.exports = SubmissionImage;
