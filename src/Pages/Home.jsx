import React, { useContext, useEffect, useState } from "react";
import SlikSlider from "react-slick";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Button,
  Menu,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Paper,
  FormControl,
  FormGroup,
  Checkbox,
  Slider,
  RadioGroup,
  Radio,
  Box,
  FormControlLabel
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StoreIcon from "@mui/icons-material/Store";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductCard from "../Components/ProductCard";
import { ApplicationContext } from "../Provider/ApplicationContext";
import { FilterList } from "@mui/icons-material";





function Home() {

  const { cycles , categories, colorState, onChangeColor, 
    onChangeCategory, checkedCategories, genderState, onChangeGender,
    onChangeReview, onChangePrice, reviewState, priceState, recentlyViewed} = useContext(ApplicationContext)

    const [recentViews, setRecentViews] = useState([])
  
  const getCategoryTitles = (category) =>{
     switch(category.category){
       case "top":
        return "Top Deals on Cycles";
       case "kids":
        return "Kids Cycles";
       case "bestseller":
        return "Best Sellers"
       case "mountain-rider":
        return "Mountain Bikes" 
       default: return ""    
     }
     
  }

  const getCyclesByCategory = (category) =>{
   const cyclesList = cycles.filter((cycle)=>cycle.category.category===category.category)
   return cyclesList
  }

  let filteredList = cycles;
  if(colorState.length>0){
  //console.log(333, filteredList, colorState)  
filteredList = [...cycles].filter((cycle) => {
  const lowercaseColors = cycle.colors.map((eachColor) => eachColor.toLowerCase());
  const lowercaseColorState = colorState.map((color) => color.toLowerCase());
  const matchingColors = lowercaseColors.filter((c) => lowercaseColorState.includes(c));

  return matchingColors.length > 0;
});

}


  if(checkedCategories.length>0){
    if(filteredList.length===0) {
    filteredList = cycles;
    }
    filteredList = [...filteredList].filter((filteredCycle)=>(
      checkedCategories.includes(filteredCycle.category.category)
    ))
  }
  
  if(reviewState){
    filteredList = [...filteredList].sort((a,b)=>(a.rating>b.rating ? 1: -1))
  }

  if(priceState){
    filteredList = [...filteredList].sort((a,b)=>(a.price>b.price ? 1: -1))
  }

  const filteredListByCat = (category) =>{
   const filteredCyclesList = filteredList.filter((cycle)=>cycle.category.category===category.category)
   return filteredCyclesList
  }

  const [sliderImages, setSliderImages] = useState([
    "https://avoncycles.com/media/wysiwyg/nban-01-1.jpg"
  ]);



  useEffect(()=>{
    console.log(111, recentlyViewed)
    sessionStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  },[])

  useEffect(() => {
    const savedRecentlyViewed = JSON.parse(sessionStorage.getItem('recentlyViewed')) || [];
    setRecentViews(savedRecentlyViewed);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* <AppBar position="fixed">
        <Toolbar>
        <Typography variant="h6" style={{ marginRight: "20px", color: "#fff", fontWeight: "bold" }}>
            MyCycles
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <SearchIcon style={{ color: "#fff" }} />
            <InputBase placeholder="Search" style={{ marginLeft: "10px", flex: 1, fontSize: "18px" }} />
          </div>
          <IconButton color="inherit">
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit">
            <StoreIcon />
          </IconButton>
          <IconButton color="inherit">
            <FavoriteIcon />
          </IconButton>
          <IconButton color="inherit">
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar> */}

      <AppBar position="fixed">
        <Toolbar>
          {/* Stylish Header: "MyCycles" */}
          <Typography variant="h6" style={{ marginRight: "auto", color: "#fff", fontWeight: "bold" }}>
            MyCycles
          </Typography>

          <div style={{ display: "flex", alignItems: "center", marginRight: "auto" }}>
            <SearchIcon style={{ color: "#fff" }} />
            <InputBase
              placeholder="Search"
              style={{ marginLeft: "8px", fontSize: "18px", flexGrow: 1, border: "1px solid #fff", paddingLeft: "8px", width: "376px", color: "#FFF" }}
            />
          </div>
          <IconButton color="inherit"  style={{ marginRight: "16px" }}>
            <AccountCircleIcon />
          </IconButton>
          <IconButton color="inherit" style={{ marginRight: "16px" }}>
            <StoreIcon />
          </IconButton>
          <IconButton color="inherit" style={{ marginRight: "16px" }}>
            <FavoriteIcon />
          </IconButton>
          <IconButton color="inherit" style={{ marginRight: "16px" }}>
            <ShoppingCartIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div style={{ display: "flex", marginTop: "64px", flex: "1" }}>
        <div style={{ flex: "0 0 250px", marginRight: "20px" }}>
<Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
  <Typography variant="h6">Filters</Typography>
  <FormControl component="fieldset">
    <FormGroup>
      <Typography variant="subtitle1">Color</Typography>
      <label>
        <input
          type="checkbox"
          checked={colorState.includes("Red")}
          onChange={(e) => onChangeColor("Red")}
        />
        Red{" "}
      </label>
      <label>
        <input
          type="checkbox"
          checked={colorState.includes("Blue")}
          onChange={(e) => onChangeColor("Blue")}
        />
        Blue
      </label>
      <label>
        <input
          type="checkbox"
          checked={colorState.includes("Green")}
          onChange={(e) => onChangeColor("Green")}
        />
        Green{" "}
      </label>
      <label>
        <input
          type="checkbox"
          checked={colorState.includes("Yellow")}
          onChange={(e) => onChangeColor("Yellow")}
        />
        Yellow{" "}
      </label>
    </FormGroup>
    <FormGroup>
      <Typography variant="subtitle1">Category</Typography>
      <label>
        <input
          type="checkbox"
          value={categories.includes("top")}
          onChange={() => {
            onChangeCategory("top");
          }}
        />
         Top Deals
      </label>
      <label>
        <input
          type="checkbox"
          value={categories.includes("kids")}
          onChange={() => {
            onChangeCategory("kids");
          }}
        />
         Kids Cycles
      </label>
      <label>
        <input
          type="checkbox"
          value={categories.includes("bestseller")}
          onChange={() => {
            onChangeCategory("bestseller");
          }}
        />
        Best Sellers
      </label>
      <label>
      
        <input
          type="checkbox"
          value={categories.includes("mountain-rider")}
          onChange={() => {
            onChangeCategory("mountain-rider");
          }}
        />
          Mountain Bikes
      </label>
    </FormGroup>
    <Typography variant="subtitle1">Price Range</Typography>
    <Slider value={[1000, 20000]} valueLabelDisplay="auto" min={1000} max={20000} step={100} />
    <Typography variant="subtitle1">Sort By</Typography>
    <label>
      <input type="radio" value={reviewState} onChange={(e) => onChangeReview(e.target.value)} />
      Review
    </label>
    <label>
      <input type="radio" value={priceState} onChange={(e) => onChangePrice(e.target.value)} />
      Price
    </label>
    <label>Gender</label>
    <label>
      <input type="radio" value={genderState} onChange={(e) => onChangeGender("Male")} />
      Male
    </label>
    <label>
      <input type="radio" value={genderState} onChange={(e) => onChangeGender("Female")} />
      Female
    </label>
  </FormControl>
</Paper>;

        </div>

        <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
          <Container style={{ flex: 1 }}>
          <SlikSlider {...settings}>
            {sliderImages.map((imageUrl, index) => (
              <div key={index}>
                <img src={imageUrl} alt={`slider-image-${index}`} style={{ width: "100%" }} />
              </div>
            ))}
          </SlikSlider>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Button variant="contained" color="primary">
                  Button 1
                </Button>
                <Menu>
                  <MenuItem>Option 1</MenuItem>
                  <MenuItem>Option 2</MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary">
                  Button 2
                </Button>
                <Menu>
                  <MenuItem>Option 1</MenuItem>
                  <MenuItem>Option 2</MenuItem>
                </Menu>
              </Grid>
              <Grid item xs={4}>
                <Button variant="contained" color="primary">
                  Button 3
                </Button>
                <Menu>
                  <MenuItem>Option 1</MenuItem>
                  <MenuItem>Option 2</MenuItem>
                </Menu>
              </Grid>
            </Grid>
            {categories.map((category) => (
              <Paper
                key={category}
                elevation={3}
                style={{ marginBottom: "20px" }}
              >
                <Typography variant="h5" style={{ padding: "10px" }}>
                  {getCategoryTitles(category)}
                </Typography>
                <Grid container spacing={2}>
                  {filteredList.length===0 ? (getCyclesByCategory(category).length!==0 ? getCyclesByCategory(category).map((product, index) => (
                    <Grid item xs={4} key={`product-${index}`}>
                      <ProductCard
                        title={product.productName}
                        price={product.price}
                        image="https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0"
                      />
                    </Grid>
                  )) : <Grid item xs={4}>No products found in this category</Grid>) : (filteredListByCat(category).length!==0 ?filteredListByCat(category).map((product, index)=>(
                    <Grid item xs={4} key={`product-${index}`}>
                    <ProductCard
                      title={product.productName}
                      price={product.price}
                      image="https://contents.mediadecathlon.com/p2563201/8ef26012c7fe024e92e8a6d8c75e1271/p2563201.jpg?format=auto&quality=70&f=300x0"
                    />
                  </Grid>
                  )) : <Grid item xs={4}>No products found in this category</Grid>)}
                </Grid>
              </Paper>
            ))}
          </Container>
        </div>
      </div>

       {/* Recently Viewed Horizontal List Panel */}
       <Paper elevation={3} style={{ padding: "10px", backgroundColor: "#f0f0f0", margin: "20px 0" }}>
        <Typography variant="h6">Recently Viewed</Typography>
        {recentViews.length>0 && recentViews.map((recent)=>(
            <ProductCard title={recent.title} price = {recent.price} image = {recent.image}/>
        ))}
      </Paper>
  <Paper elevation={3} style={{ padding: "20px", backgroundColor: "#3f51b5", color: "#fff" }}>
  <Typography variant="h6">Contact Info:</Typography>
  <Typography>Email: example@example.com</Typography>
  <Typography>Phone: +123 456 7890</Typography>
  <Typography variant="h6" style={{ marginTop: "10px" }}>
    Useful Links:
  </Typography>
  <Typography>
    <a href="/">Home</a>
  </Typography>
  <Typography>
    <a href="/about">About Us</a>
  </Typography>
  <Typography>
    <a href="/contact">Contact Us</a>
  </Typography>
</Paper>;
    </div>
  );
}

export default Home;
