import './App.css';
import Home from './Pages/Home';
import { Routes, Route} from "react-router-dom"
import ProductPage from './Pages/ProductDetails';
import IndividualProduct from './Pages/IndividualProduct';


function App() {
  return (
    <div className="App">
      <Routes> 
       <Route path="/" element ={<Home/>}/>
       <Route path='/productdetails/:title' element={<IndividualProduct/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
