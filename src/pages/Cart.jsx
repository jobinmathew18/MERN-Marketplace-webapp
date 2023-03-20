import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from 'react-stripe-checkout'
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom"; 
import { deleteItem } from "../redux/cartRedux";
import { updatecart } from "../redux/apiCalls";

const KEY = process.env.REACT_APP_STRIPE;   

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px; 
  ${mobile({ padding: "10px", marginBlock: "30px" })} 
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const TopButton = styled.button`
  padding: 20px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "#2C3333" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"}; 
  ${mobile({ padding: "10px" })}
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
  ${mobile({ marginBlock: "20px" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
  padding: 10px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const RemoveItem = styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ece5e5;
  font-weight: 500;
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
  margin-right: 90px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #2c3333;
  color: white;
  font-weight: 600;
  cursor: pointer;
  border: none;
`;


const Cart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart);


  const [stripeToken, setStripeToken] = useState(null)
  const navigate = useNavigate()

  const onToken = (token)=>{
    setStripeToken(token)
  }

  // console.log(stripeToken)     

  useEffect(() => {
    const makeRequest = async () => {
      try { 
        const res = await userRequest.post("/checkout/payment", { 
          // source: stripeToken.id, 
          amount: cartItems.total * 100                         //sending to req.body
        }); 
        // console.log(res.data)
        navigate('/success', {data: res.data})
      } catch(error) {
        console.log(error)
      }
    }; 
    stripeToken && cartItems.total>=1 && makeRequest();
  }, [stripeToken, cartItems.total, navigate]);

  const handleRemove = async (id)=>{
    try {
      await userRequest.put(`/carts/delete/${id}`)
      dispatch(deleteItem(id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleQuantity = async (info)=>{
    updatecart(info, dispatch)
  }
 
  return (
    <Container>
      <Announcement />
      <Navbar />
      <Wrapper>
        <Title>YOUR BAG</Title> 
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>SHOPPING BAG(2)</TopText>
            <TopText>Your Wishlist</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cartItems.products.map((product) => (
              <Product key={product._id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product.productId}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b> {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={()=>{handleQuantity({condition: 'inc', productId: product.productId})}}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=>{handleQuantity({condition: 'dec', productId: product.productId})}}/>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {product.price * product.quantity}
                  </ProductPrice>
                  <RemoveItem onClick={()=>{handleRemove(product.productId)}}>Remove</RemoveItem>
                </PriceDetail>
              </Product>
              
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>${cartItems.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$-5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>${cartItems.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Marketplace"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cartItems.total}`}
              amount={cartItems.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>CHECKOUT NOW</Button>  
            </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
