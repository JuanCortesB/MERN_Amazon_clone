// import data from "../data";
// import { Link } from "react-router-dom";
import { useEffect, useReducer, } from "react";
import axios from "axios"
import logger from "use-reducer-logger"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Product from "../components/Product";
import {Helmet} from "react-helmet-async"
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
// messagebox para colocar una caja con un mensjae de error cuando no carguen los productos
// helmet es para que en la pestaña de la pagina , salga el nombre de la pagina donde se está actualmente
// loadingbox es para que se vea la animacion de "loading" mientras se cargan los productos


const reducer = (state, action) =>{
    switch(action.type) {
        case "FETCH_REQUEST":
            return{...state,
            loading: true};
        case "FETCH_SUCCESS":
            return{...state,
            products: action.payload,
            loading: false};
        case "FETCH_FAIL":
            return {...state,
            loading: false,
            error: action.payload};
        default:
            return state;
    }
}

const HomeScreen = () =>{
    const [{loading, error, products}, dispatch] = useReducer(logger(reducer), {
        products: [],
        loading: true,
        error: "",
    })
    // const [products, setProducts] = useState([]);
    useEffect( () =>{
        const fetchData = async () => {
            dispatch({type: "FETCH_REQUEST"})
            try{
                const result = await axios.get("/api/products")
                dispatch({type: "FETCH_SUCCESS", payload: result.data})
            } catch (err){
                dispatch({type: "FETCH_FAIL", payload: err.message})
            }
            // setProducts(result.data)
        
        }
        fetchData()
    }, [])
    return( 
       <div>
        <Helmet>
            <title>Amazone</title>
        </Helmet>
         <h1>Featured Products</h1>
        <div className="products">
        {
            loading ?( <LoadingBox/>)
            :
            error?(<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
            <Row>
                {products.map( (product) => (
            <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}/>
            </Col>
            ))}
            </Row>
        )}
        </div>
       </div>
    )
}

export default HomeScreen;