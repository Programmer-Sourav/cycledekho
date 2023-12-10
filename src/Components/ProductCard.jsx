import { useContext } from "react"
import { useNavigate } from "react-router"
import { ApplicationContext } from "../Provider/ApplicationContext"
import { ECOMMERCE_ACTIONS } from "../reducer/ecommerceReducer"


export default function ProductCard({title, price, image, item}){

    const navigate = useNavigate()
    const { recentlyViewed , dispatch, addToCart, cycles} = useContext(ApplicationContext)

    const goToDetails = (title, price, image) =>{
       let obj = {title: title, price: price, image: image}  
       navigate(`/productdetails/${title}`)
       dispatch({type: ECOMMERCE_ACTIONS.RECENTLY_VIEWED, payload: obj})
      
    }
   
    return(
        <div className="productcardalignment" >
            <img src={image} alt={title} height="128px" width="128px" />
            <h4>{title}</h4>
            <p>Rs. {price}</p>
            <button onClick={()=>{addToCart(item)}}>Add To Cart</button>
            <button onClick={()=>{goToDetails(title, price, image)}}>View Details</button>
        </div>
    )
}