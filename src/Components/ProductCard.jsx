import { useContext } from "react"
import { useNavigate } from "react-router"
import { ApplicationContext } from "../Provider/ApplicationContext"
import { ECOMMERCE_ACTIONS } from "../reducer/ecommerceReducer"


export default function ProductCard({title, price, image}){

    const navigate = useNavigate()
    const { recentlyViewed , dispatch} = useContext(ApplicationContext)

    const goToDetails = (title, price, image) =>{
        //let path = `/productdetails/${title}`;
       let obj = {title: title, price: price, image: image}  
       navigate(`/productdetails/${title}`)
       dispatch({type: ECOMMERCE_ACTIONS.RECENTLY_VIEWED, payload: obj})
      
    }

    return(
        <div className="productcardalignment" onClick={()=>{goToDetails(title, price, image)}} >
            <img src={image} alt={title} height="128px" width="128px" />
            <h4>{title}</h4>
            <p>{price}</p>
        </div>
    )
}