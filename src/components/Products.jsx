import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  ${mobile({ justifyContent: "center" })}
`;

function Products({ cat, filters, sort }) {
  // console.log(cat,filters,sort)

  const [products, setProducts] = useState([]);
  // console.log(products)
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : `http://localhost:5000/api/products`
        );
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      //to understand this logic look into jsTut/objectFunctions/questions
      setFilteredProducts(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) => {
            return item[key].includes(value);
          })
        )
      );
  }, [products, cat, filters]);

  useEffect(()=>{
    if(sort === 'newest'){
      setFilteredProducts(prev=> [...prev].sort((a,b)=> a.createdAt - b.createdAt))
    }
    else if(sort === 'asc'){
      setFilteredProducts(prev=> [...prev].sort((a,b)=> a.price - b.price))
    }
    else{
      setFilteredProducts(prev=> [...prev].sort((a,b)=> b.price - a.price))
    }
  }, [sort])

  return (
    <Container>
      {cat ? filteredProducts.map((item) => (
        <Product item={item} key={item.id} />
      )) : 
      products.slice(0,11).map((item) => (
        <Product item={item} key={item.id} />
      ))}
    </Container>
  );
}

export default Products;
