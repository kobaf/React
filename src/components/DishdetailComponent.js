import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

export default class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(dish) {
        if (dish != null) {
            const comments = dish.comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p> -- {comment.author}, {(new Date(comment.date)).toDateString()}</p>
                    </li>
                );            
            });
                return (
                <div>   
                    <h4>Comments</h4>
                    <ul className='list-unstyled'>
                        {comments}
                    </ul>
                </div>
            )
        }
        else {
            return <div></div>
        }
    }

    renderDish(dish) {
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
    render() {
        return (
            <div className="row">
                <div  className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div  className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish)} 
                </div>
            </div>

        )
        
        

            
    }
}