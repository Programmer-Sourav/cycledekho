import React, { useContext, useState } from 'react';
import './cartstylesheet.css'; 
import { ApplicationContext } from '../Provider/ApplicationContext';
import { ECOMMERCE_ACTIONS } from '../reducer/ecommerceReducer';

const ShoppingCart = () => {
   
    const { cartState, dispatch } = useContext(ApplicationContext)
    const [couponVal, setCoupon] = useState("")
    const [couponAvailed, setCouponAvailed] = useState(0)

    const coupons = [{id: 1, couponCode: "AWESOME30", discount: "300", expiryDate: "31-12-2023"},
                     {id: 2, couponCode: "AWESOME40", discount: "400", expiryDate: "08-12-2023"},
                     {id: 3, couponCode: "AWESOME20", discount: "125", expiryDate: "10-12-2023"}]
  
    const handleIncrement = (_id) => {
      dispatch({type: ECOMMERCE_ACTIONS.ADD_TO_CART, payload: _id})
    };
  
    const handleDecrement = (id) => {
      dispatch({type: ECOMMERCE_ACTIONS.DEC_CART, payload: id})
    };

    const applyCoupon = () =>{
       calculateValidityOfCoupon()
    }

    const onCouponChange = (e) =>{
       setCoupon(e.target.value)
    }

    function calculateValidityOfCoupon(incomingCouponCode){
        if(couponVal){
        const coupon = coupons.find((couponItem)=>(couponItem.couponCode===couponVal))
        const parts = coupon.expiryDate.split("-")
        const expiryDateISO = parts[2] + "-" + parts[1] +"-" + parts[0]

        const convertedExpiryDate = new Date(expiryDateISO + "T00:00:00Z")
        const today = new Date();
        const convertedToday = new Date(today.toISOString().slice(0, 10) + "T00:00:00Z");

      

        if (convertedToday <= convertedExpiryDate) {
           console.log("Coupon is still valid!", coupon.discount);
           setCouponAvailed(coupon.discount)
          } else {
            console.log("Coupon has expired!");
          
            return false;
          }
        }

    }
  
    let totalAmt, totalDiscountedPrice, totalPayable;

    if(couponAvailed>0){
        totalAmt = calculateTotal(cartState)
        totalDiscountedPrice = calculateDiscount(cartState, couponAvailed)
        totalPayable = calculateTotalPayable(totalAmt, totalDiscountedPrice)
    }
    else{
    totalAmt = calculateTotal(cartState)
    totalDiscountedPrice = calculateDiscount(cartState, 0)
    totalPayable = calculateTotalPayable(totalAmt, totalDiscountedPrice)
    }
   
    return (
      <div className="container">
        <div className="scrollableList">
          <ul>
            {cartState.map((item) => (
              <li key={item._id} className="itemCard">
                <img src={item.image} alt={item.productName} className="productImage" />
                <div className="productInfo">
                  <h3>{item.productName}</h3>
                  <p>{item.productDescription}</p>
                  <p>Rs. {item.price}</p>
                </div>
                <div className="quantityControls">
                  <button onClick={() => handleDecrement(item._id)}>-</button>
                  <input type="text" value={item.quantity}  />
                  <button onClick={() => handleIncrement(item._id)}>+</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="fixedDetails">
          <h2>Price Details</h2>
          <section>
            <p>Price: ₹{totalAmt}</p>
            <p>Discount (10% fixed): -₹{totalDiscountedPrice}</p>
            <p>Delivery Charges (fixed) : ₹50</p>
            <hr />
            <p>Total: ₹{totalPayable}</p>
          </section>
  
          <label htmlFor="coupon">Apply Coupon:</label>
          <input type="text" id="coupon" name="coupon" value={couponVal} onChange={(e)=>{onCouponChange(e)}}/>
          <button onClick={()=>{applyCoupon()}} className='applybutton'>Apply</button>
  
          <button id="placeOrder">Place Order</button>
        </div>
      </div>
    );
  };
  

 const calculateTotal = (cartState) =>{
     const total = cartState.reduce((total, cartItem)=>(parseInt(total) + parseInt(cartItem.price)*cartItem.quantity),0)
     return total;
 }

 const calculateDiscount = (cartState, couponDiscount) =>{
     const totalPrice = calculateTotal(cartState)
     let discount ;
     if(couponDiscount>0){
     discount = totalPrice*10/100 + parseInt(couponDiscount);
     console.log(5555, couponDiscount, discount)
     return discount;
     }
     else{
      discount = totalPrice*10/100;
      console.log(5656, discount)
      return discount;
     }
 }

 const calculateTotalPayable = (totalAmt, totalDiscountedPrice) =>{
    const discountedPrice = totalAmt - totalDiscountedPrice;
    return discountedPrice + parseInt(50);
 }
  export default ShoppingCart;