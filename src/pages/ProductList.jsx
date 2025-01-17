import { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import {mobile} from '../responsive'

const Container = styled.div`
`;

const Title = styled.h1`
  margin: 20px 30px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px 30px;
  ${mobile({width:"200px", display:"flex", flexDirection:"column"})}
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({margin:"0 0 10px 0", fontSize:"17px"})}
`;

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({marginBottom:"10px"})}
`;

const Option = styled.option``;




const ProductList = () => {
  const location = useLocation();
  // console.log(location.pathname.split('/')[2])
  const cat = location.pathname.split('/')[2];
  const [filters, setFilters] = useState({})
  const [sort, setSort] = useState("newest")

  const handleFilters = (e)=>{
    const value = e.target.value
    // console.log(e.target.name)
    setFilters({
      ...filters,
      [e.target.name]: value,         //this will override the previous value of that particular key because there can be only one key with a particular name.
    })
  }

  // console.log(filters)
  // console.log(sort)

  return (
    <Container>
      <Announcement />
      <Navbar />
      <Title>{cat.toUpperCase()}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter Products</FilterText>
          <Select name="color" onChange={handleFilters}>         {/*we have set "name" to uniquely identify each handlefilters function.  */}
            <Option disabled selected>
              Color
            </Option>
            <Option>white</Option>
            <Option>black</Option>
            <Option>red</Option>
            <Option>Blue</Option>
            <Option>yellow</Option>
            <Option>green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled selected>
              Size
            </Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort Products:</FilterText>
          <Select onChange={(e)=> setSort(e.target.value)}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products cat={cat} filters={filters} sort={sort} />
      <Newsletter /> 
      <Footer />
    </Container>
  );
};

export default ProductList;
