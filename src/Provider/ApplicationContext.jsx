import { createContext, useEffect, useReducer } from "react";
import ecommerceReducer, { ECOMMERCE_ACTIONS, initialState } from "../reducer/ecommerceReducer";
import {getAllCyclesFromDatabase, getAllCategories} from "../apis/remote"
export const ApplicationContext = createContext()


export default function ApplicationProvider({children}){

    const [state, dispatch] = useReducer(ecommerceReducer, initialState)

    useEffect(()=>{getAllCyclesFromDatabase(dispatch)},[])

    useEffect(()=>{getAllCategories(dispatch)}, [])


    const onChangeColor = (color) =>{
      dispatch({type: ECOMMERCE_ACTIONS.CHECK_COLOR, payload: color})
    }

    const onChangeCategory = (category) =>{
      dispatch({type: ECOMMERCE_ACTIONS.CHECK_CATEGORIES, payload: category})
    }

    const onChangeGender = (gender) =>{
      dispatch({type: ECOMMERCE_ACTIONS.GENDER_LIST, payload: gender})
    }

    const onChangeReview = (reviewBoolean) =>{
      dispatch({type: ECOMMERCE_ACTIONS.SORT_BY_REVIEW, payload: reviewBoolean})
    }

    const onChangePrice = (priceBoolean) =>{
      dispatch({type: ECOMMERCE_ACTIONS.SORT_BY_PRICE, payload: priceBoolean})
    }


    const addToCart = (product) =>{
      dispatch({type: ECOMMERCE_ACTIONS.ADD_TO_CART, payload: product})
    }

    

  
    return(
     <ApplicationContext.Provider value={{categories: state.categories, checkedCategories: state.checkedCategories ,
       cycles: state.allCycles, colorState: state.checkedColor, onChangeColor, onChangeCategory,  
       filteredList: state.filteredList, dispatch, genderState: state.gender, onChangeGender,  reviewState: state.sortByReview, 
       priceState: state.sortByReview,
       onChangeReview, onChangePrice, 
       cartState: state.cart, addToCart,
      recentlyViewed: state.recentlyViewedList}}>{children}</ApplicationContext.Provider>
    )
}