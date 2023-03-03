import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from "@mui/icons-material";
import styled from "styled-components";
import {mobile} from '../responsive'

const Container = styled.div`
  display: flex;
  padding: 20px;
  ${mobile({flexDirection:"column"})}

`;

const Logo = styled.h1`
    width: fit-content;
    cursor: pointer;
`

const Desc = styled.p`
    margin-block: 20px;
`

const SocialContainer = styled.div`
    display: flex;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${props=> props.color};
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 20px 20px 0;
`

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
    margin-bottom: 30px;
`

const Lists = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
`

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`

const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
  return <Container>
    <Left>
        <Logo>Marketplace</Logo>
        <Desc>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi commodi nulla, saepe, velit reprehenderit totam facere consequuntur enim laborum vel necessitatibus est quod sint. Obcaecati iure vero sequi consectetur illum.
        </Desc>
        <SocialContainer>
            <SocialIcon color="3B5999">
                <Facebook/>
            </SocialIcon>
            <SocialIcon color="E4405F">
                <Instagram/>
            </SocialIcon>
            <SocialIcon color="55ACEE">
                <Twitter/>
            </SocialIcon>
            <SocialIcon color="E60023">
                <Pinterest/>
            </SocialIcon>
        </SocialContainer>
    </Left>
    <Center>
        <Title>Useful Links</Title>
        <Lists>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Men Fashion</ListItem>
            <ListItem>Women Fashion</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
        </Lists>
    </Center>
    <Right>
        <Title>Contact</Title>
        <ContactItem>
            <Room style={{marginRight:"10px"}}/> 622 Dixie Path, South Tobinchester 121007
        </ContactItem>
        <ContactItem><Phone style={{marginRight:"10px"}}/> +1 997 8989 88</ContactItem>
        <ContactItem><MailOutline style={{marginRight:"10px"}}/>contact@gmail.com</ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png"/>
    </Right>
  </Container>;
};

export default Footer;
