import styles from "../styles/Item.module.css";
//import ItemCard from "./ItemCard";

import { db } from "../firebaseInit";
import { collection, doc, getDocs, query, orderBy, startAt, endAt } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CustomProductContext, { useProductValue } from "../productContext";

import ProductCard from "./ProductCard";
import { getInitialState, productSelector, SearchFilter } from "./redux/reducers/productReducer";

 function Home()  {

  const dispatch = useDispatch();
  const products = useSelector(productSelector)
    //const [products, setProducts] = useState([])
    const [searchText, setSearchText] = useState(""); // Input box text
    const [selectedCategories, setSelectedCategories] = useState([]); // Checkbox categories
    const [allProducts, setAllProducts] = useState([]);
    const [price, setPrice] = useState(15000); // Default price

    //const { products, setProducts,fetchProducts} = useProductValue()
    
    useEffect(()=>{        
      //  fetchProducts()
      dispatch(getInitialState())
      console.log(products)
    },[])


    useEffect(() => {
      console.log("Dispatching with:", searchText, selectedCategories, price);
      dispatch(SearchFilter({ searchText, selectedCategories, price }));
  }, [searchText, selectedCategories, price]); // ✅ This ensures updated state is used
  

      // ✅ Handle Category Selection
    const handleCheckboxChange = (category) => {
      setSelectedCategories((prev) => {
        const updatedCategories = prev.includes(category)
            ? prev.filter((c) => c !== category)
            : [...prev, category];
    
        console.log("Updated Categories:", updatedCategories);
        setSelectedCategories(updatedCategories) // ✅ Logs the correct value
        return updatedCategories;
    });
    
     // onFilterChange({ price, categories: selectedCategories });
  };

  // ✅ Handle Price Change
  const handlePriceChange = (event) => {
      const newPrice = Number(event.target.value);
      setPrice(newPrice);
  }



        
  return (
    <div>
      
      <div className={styles.left_div}>
        <h1> Filter</h1>
         {/* 🔥 Price Slider */}
         <div className="mt-4">
                <label className="block text-gray-700 font-medium text-center">Price: {price}</label>
                <input
                    type="range"
                    min="0"
                    max="50000"
                    value={price}
                    onChange={handlePriceChange}
                    className="w-full mt-2 cursor-pointer accent-blue-500"
                />
            </div>

            {/* 🔥 Category Filters */}
            <h3 className="mt-6 text-gray-800 font-semibold text-center">Category</h3>
            <div className="mt-2 flex flex-col gap-2">
                {["Men's Clothing", "Women's Clothing", "Jewellery", "Electronics"].map((category) => (
                    <div>
                    <label key={category} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCheckboxChange(category)}
                            className="accent-blue-600 w-5 h-5"
                        />
                        <span className="text-gray-700">{category}</span>
                    </label>
                    </div>
                ))}
            </div>

      </div>
      <input className={styles.searchholder} value={searchText} placeholder="Search By Name"  onChange={(e)=> { setSearchText(e.target.value)}}/>

    <div className={styles.wrapper_div}>
   {   products.map((d) => ( 
       <ProductCard key={d.id} id={d.id} name={d.Name} price={d.Price} imageurl={d.ImageUrl} />
      ))
    }
    </div>
    </div>

  );
}

 

export default Home;
