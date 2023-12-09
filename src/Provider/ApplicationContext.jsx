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

    const onChangeGender = (e) =>{
      dispatch({type: ECOMMERCE_ACTIONS.GENDER_LIST, payload: e.target.value})
    }

    const onChangeReview = (e) =>{
      dispatch({type: ECOMMERCE_ACTIONS.SORT_BY_REVIEW})
    }

    const onChangePrice = (e) =>{
      dispatch({type: ECOMMERCE_ACTIONS.SORT_BY_PRICE})
    }


    const addToCart = (product) =>{
      dispatch({type: ECOMMERCE_ACTIONS.ADD_TO_CART, payload: product})
    }

    const onSearchInputChange = (e) =>{
      dispatch({type: ECOMMERCE_ACTIONS.SEARCH_CHANGE, payload: e.target.value})
    }

  
    return(
     <ApplicationContext.Provider value={{categories: state.categories, checkedCategories: state.checkedCategories ,
       cycles: state.allCycles, colorState: state.checkedColor, onChangeColor, onChangeCategory,  
       filteredList: state.filteredList, dispatch, genderState: state.gender, onChangeGender,  reviewState: state.sortByReview, 
       priceState: state.sortByPrice,
       onChangeReview, onChangePrice, 
       cartState: state.cart, addToCart,
      recentlyViewed: state.recentlyViewedList,
      searchState: state.search, onSearchInputChange}}>{children}</ApplicationContext.Provider>
    )
}