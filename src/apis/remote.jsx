import { ECOMMERCE_ACTIONS } from "../reducer/ecommerceReducer"

const baseUrl = "https://backend-app.developersourav.repl.co/"
const allCyclesUrl = `${baseUrl}cycles`
const allCategoryUrl = `${baseUrl}categories`


async function getAllCyclesFromDatabase(dispatch){
    try{
    const response = await fetch(allCyclesUrl)
    const allCycles = await response.json()
    dispatch({type: ECOMMERCE_ACTIONS.DOWNALOD_ALL_CYCLES, payload: allCycles.cycles})
    }
    catch(error){
        throw error
    }
}


async function getAllCategories(dispatch){
    try{
   const response = await fetch(allCategoryUrl)
   const allCategories = await response.json()

   dispatch({type: ECOMMERCE_ACTIONS.ALL_CATEGORIES, payload: allCategories.categories})
    }
    catch(error){
        throw error
    }
}

export { getAllCyclesFromDatabase, getAllCategories };

