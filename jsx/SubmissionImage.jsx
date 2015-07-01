var React = require('react');
var Thumbnail = require('react-bootstrap').Thumbnail;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var Modal = require('react-bootstrap').Modal;
var Glyphicon = require('react-bootstrap').Glyphicon;

var EnbigenedImageModel = React.createClass({

    getInitialState: function(){
        return { showModal: false };
    },

    close: function(){
        this.setState({ showModal: false });
    },

    open: function(){
        this.setState({ showModal: true });
    },

    render: function() {

        var glyph;
        var award;
        if(this.props.award) {
            glyph =  <Glyphicon glyph='star' title={this.props.award}/>
            award = <p>Awarded: {this.props.award}</p>;
            }

            return (
                <div>
                    <h4> {glyph}Item #{this.props.itemNumber}</h4>
                    {award}
                    <Button
                        bsStyle='primary'
                        bsSize='medium'
                        onClick={this.open}
                        >
                        More
                    </Button>

                    <Modal show={this.state.showModal} onHide={this.close} bsSize='large' aria-labelledby='contained-modal-title-lg'>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.description}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="img-rounded col-centered submission-item" src={this.props.img} />
                            {this.props.comments}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.close}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
    });

    var SubmissionImage = React.createClass({
        render: function () {
            var comments;
            if(this.props.comments) {
                comments = this.props.comments.map(function (comment) {
                    var key = Date.now() + comment;
                    return (
                        <div className="text-center" key={key}>{comment}</div>
                    );
                });
            }
            return (

                <Col xs={6} md={4} lg={5}>
                    <Thumbnail src={this.props.imgUrl}>
                        <EnbigenedImageModel
                            img={this.props.imgUrl}
                            comments={comments}
                            description={this.props.description}
                            itemNumber={this.props.itemNumber}
                            award={this.props.award}/>
                    </Thumbnail>
                </Col>
            );
        }
    });

    module.exports = SubmissionImage;
