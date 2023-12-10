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
    search: "",
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
    REMOVE_FROM_CART: "DELETE_FROM_CART",
    ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
    REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",
    RECENTLY_VIEWED: "RECENTLY_VIEWED",
    SEARCH_CHANGE : "SEARCH_CHANGE",
    DEC_CART: "DEC_CART"

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
            console.log(555, action.payload)
        return {...state, gender : action.payload}  
        case ECOMMERCE_ACTIONS.SORT_BY_PRICE: 
        console.log(444, !state.sortByPrice)  
        return {...state,  sortByPrice: !state.sortByPrice}
        case ECOMMERCE_ACTIONS.SORT_BY_REVIEW:  
        return {...state, sortByReview: !state.sortByReview}    
        case ECOMMERCE_ACTIONS.RECENTLY_VIEWED: 
        return {...state, recentlyViewedList: [...state.recentlyViewedList, action.payload]}
        case ECOMMERCE_ACTIONS.SEARCH_CHANGE: 
        return {...state, search: action.payload}
        case ECOMMERCE_ACTIONS.ADD_TO_CART: 
        const itemId = action.payload;
       
        const isItemInCart = state.cart.find((cartItem) => cartItem._id === itemId) !== undefined;

        
        const updatedCart = state.cart.map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
       
        return {
          ...state,
          cart: isItemInCart ? updatedCart : [...updatedCart, { ...action.payload, quantity: 1 }],
        };

        case ECOMMERCE_ACTIONS.DEC_CART: 
        return {...state, cart: state.cart.map((cartItem)=>(cartItem._id===action.payload ? {...cartItem,  quantity: cartItem.quantity>1 ? cartItem.quantity-1 : 1} : cartItem))}


        
        case "DEFAULT": 
        return state;
    }
    
}