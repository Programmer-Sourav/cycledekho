export const initialState = {
    allCycles: [],
    cart: [],
    wishlist: [],
    categories: [],
    checkedColor: [],
    checkedCategories: [],
    filteredList: [],
    recentlyViewedList: [],
    gender: "Male",
    sortByReview: false,
    sortByPrice: false,
    totalCartPrice: 0
}

export const ECOMMERCE_ACTIONS = {
    DOWNALOD_ALL_CYCLES: "DOWNALOD_ALL_CYCLES",
    ALL_CATEGORIES: "CATEGORIES",
    CHECK_COLOR: "CHECK_COLOR",
    CHECK_CATEGORIES: "CHECK_CATEGORIES",
    FILTERED_LIST: "FILTERED_LIST",
    GENDER_LIST: "GENDER_LIST", 
    SORT_BY_PRICE: "SORT_BY_PRICE",
    SORT_BY_REVIEW: "SORT_BY_REVIEW",
    ADD_TO_CART: "ADD_TO_CART",
    RECENTLY_VIEWED: "RECENTLY_VIEWED"

}

export default function ecommerceReducer (state, action) {
    switch(action.type){
        case ECOMMERCE_ACTIONS.DOWNALOD_ALL_CYCLES: 
        return { ...state, allCycles: action.payload}
        case ECOMMERCE_ACTIONS.ALL_CATEGORIES: 
        return {...state, categories: action.payload }
        case ECOMMERCE_ACTIONS.CHECK_COLOR: 
        const isColorChecked = state.checkedColor.includes(action.payload)
        return {...state, checkedColor: isColorChecked ? state.checkedColor.filter((color)=>color!==action.payload) : [...state.checkedColor, action.payload]}
        case ECOMMERCE_ACTIONS.CHECK_CATEGORIES: 
        const isCategoriesChecked = state.checkedCategories.includes(action.payload)
        return {...state, checkedCategories: isCategoriesChecked? state.checkedCategories.filter((category)=>category!==action.payload) : [...state.checkedCategories, action.payload]}
        case ECOMMERCE_ACTIONS.FILTERED_LIST: 
        return {...state, filteredList : action.payload}
        case ECOMMERCE_ACTIONS.GENDER_LIST:
        return {...state, gender : action.payload}  
        case ECOMMERCE_ACTIONS.SORT_BY_PRICE: 
        return {...state,  sortByPrice: action.payload}
        case ECOMMERCE_ACTIONS.SORT_BY_REVIEW:
        return {...state, sortByReview: action.payload}  
        case ECOMMERCE_ACTIONS.ADD_TO_CART: 
        return {...state, cart : action.payload}    
        case ECOMMERCE_ACTIONS.RECENTLY_VIEWED: 
        console.log(222, action.payload)
        return {...state, recentlyViewedList: [...state.recentlyViewedList, action.payload]}
        case "DEFAULT": 
        return state;
    }
    
}