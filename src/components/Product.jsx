import styled from "styled-components";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  FavoriteBorderOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(rgb(0, 0, 0, 0), rgb(0, 0, 0, 0.1));
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  border-radius: 10px;
  transition: all 0.3s ease; 
  cursor: pointer;
`;

const Container = styled.div`
  /* flex: 1; */
  margin: 20px 5px;
  min-width: 280px;
  height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  padding: 10px;
  border-radius: 10px;
  position: relative;

  /* when you hover over container then turn info opacity to 1 */
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  z-index: 2;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.2s ease;

  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon>
          <ShoppingCartOutlined />
        </Icon>
        <Icon>
          <Link to={`/product/${item._id}`} style={{textDecoration:"none", color:"black"}}>
            <SearchOutlined />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

export default Product;
