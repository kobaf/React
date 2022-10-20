import { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem,
    Button, Modal, ModalHeader, ModalBody,
    Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

    function RenderComments({ comments }) {
        if (comments != null) {
            const commentsList = comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p> -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                );            
            });
                return (
                <div>   
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {commentsList}
                    </ul>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    const DishDetail = (props) => {
        return (
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr />
                </div>                
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish} />
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} />
                    <CommentForm/>
                </div>
            </div>
            </div>
        );
    }

    function RenderDish({ dish }) {
        if (dish != null) {
            return (
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    )
            }
            else {
                return <div></div>
            }
        }

    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !(val) || (val.length <= len);
    const minLength = (len) => (val) => val && (val.length >= len);
        

    class CommentForm extends Component {

            constructor(props) {
                super(props);
                this.state = {
                    isModalOpen: false
                };
                this.toggleModal = this.toggleModal.bind(this);
                this.handleSubmit = this.handleSubmit.bind(this);
            }
        
            toggleModal() {
                this.setState({ isModalOpen: !this.state.isModalOpen });
            }
        
            handleSubmit(values) {
                this.toggleModal();
                alert(JSON.stringify(values));
            }
        
            render() {
                const closeBtn = (
                    <button className="close" onClick={this.toggleModal} type="button">
                      &times;
                    </button>
                  );
                return(
                    <>
                <Button outline onClick={this.toggleModal}><i class="fa fa-pencil"></i> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal} close={closeBtn}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={12}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5" selected>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your Name</Label>
                            <Col md={12}>
                            <Control.text model=".name" id="name" name="name"
                                innerRef={(input) => this.name = input} 
                                validators={{
                                    required, minLength: minLength(3), maxLength: maxLength(15)
                                }}
                                placeholder="Your Name"
                                className="form-control"/>
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: ' Required',
                                        minLength: ' Must be greater than 2 characters',
                                        maxLength: ' Must be 15 characters or less'
                                    }}
                                />
        
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                    rows="5"
                                    className="form-control" />
                            </Col>
                        </Row>
                        
                        <Button type="submit" value="submit" color="primary">Submit Comment</Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </>
                );
            }
        }
        

export default DishDetail;