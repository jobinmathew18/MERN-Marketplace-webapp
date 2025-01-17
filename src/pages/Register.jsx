import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { userRequest } from "../requestMethods";
import { mobile } from "../responsive";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ background: "#F7F1E5" })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "90%" })}
`;

const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 500;
`;

const Register = () => {
  const navigate = useNavigate()
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  const handleRegister = async () => {
    try {
      if (password.current.value === confirmPassword.current.value) {
         await userRequest.post("/auth/register", {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
        });
        navigate('/login')
      }else{
        console.log("password doesn't match") 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input placeholder="First name" />
          <Input placeholder="Last name" />
          <Input placeholder="Usrname" ref={username} />
          <Input placeholder="Email" ref={email} />
          <Input placeholder="Password" ref={password} />
          <Input placeholder="Confirm Password" ref={confirmPassword} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleRegister} type="submit">
            CREATE
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
