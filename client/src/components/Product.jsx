import Button  from "react-bootstrap/Button";
import Card from "react-bootstrap/Card"
import {Link} from "react-router-dom"
import Rating from "../components/Rating"
const Product = (props) =>{

    const{product} = props;

    return(
        <Card >
                <Link to={`/product/${product.slug}`}>
                    <img src={product.image} className="card-img-top" alt={product.name}/>
                </Link>
                <Card.Body>
                <Link to={`/product/${product.slug}`}>
                <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating rating={product.rating} numReviews={product.numReviews} />
                <Card.Text>${product.price}</Card.Text>
                <Button>Add to cart</Button>
                </Card.Body>
            {/* <div className="product-info"> 
                
                <p><strong>{product.price}</strong>
                </p>
                <button>Add to cart</button>
                </div> */}
            </Card> 
    )
}

export default Product;