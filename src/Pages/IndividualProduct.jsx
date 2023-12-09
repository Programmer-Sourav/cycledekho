import { useParams } from "react-router";
import "./productpage.css"

import React, { useContext, useEffect, useState } from 'react';
import { ApplicationContext } from "../Provider/ApplicationContext";
import Swiper from "swiper";

export default function IndividualProduct () {
    //imageSrc, title, description, buttonText, buttonUrl

    const { title } = useParams();
    const { cycles, addToCart} = useContext(ApplicationContext);

    console.log(123, cycles)
    const images = [
        { id: 1, url: "https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0" },
        { id: 2, url: "https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0" },
      ];
      

    
    const individualData = getData()

    function getData(){
        const product = cycles.find((cycle) => cycle.productName === title);
        return product;
    }

    const buyNow = (itemId) =>{
      
    }

    const onButtonClick = (color) =>{

    }


  return (
  <div class="container">
  <div class="image">
    <img src="https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0" alt="Image description" height="300px" width="512px"/>
   
  </div>
  <div class="content">
    <h2 class="title">{individualData.productName}</h2>
    <p class="description"><strong>Description: </strong>{individualData.productDescription}</p>
    <p><strong>Brand: </strong>{individualData.brandDetails.brand}</p>
    <strong>Colors: </strong> {individualData.colors.map((color)=>(
        <button onClick={onButtonClick(color)} style={{background: color, color: "white", padding: "4px", height:"40px", width:"40px", borderRadius: "50%" }}>{color}</button>
    ))}
    <div>
     <p><strong>Price:</strong>: INR. {individualData.price}</p>   
    <button onClick={()=>{buyNow(individualData.id)}} style={{background: "blue", color: "white", padding: "4px", height:"40px", width:"128px", borderRadius: "8px" }}>Buy Now</button>
    <button onClick={()=>{buyNow(individualData.id)}} style={{background: "green", color: "white", padding: "4px", height:"40px", width:"128px", borderRadius: "8px" }}>Add To Cart</button>
    </div>
  </div>
</div>
  );
};


