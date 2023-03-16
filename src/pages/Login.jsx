import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { login } from "../redux/apiCalls";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ background: "#F7F1E5" })}
`;

const Wrapper = styled.div`
  width: 35%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
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
  outline: none;
`;

const Link = styled.a`
  font-weight: 300;
  font-size: 13px;
  margin-bottom: 8px;
  color: black;
  text-decoration: none;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 25%;
  border: none;
  padding: 12px 15px;
  background-color: teal;
  color: white;
  cursor: pointer;
  font-weight: 500;
  margin-block: 10px 16px;

  &:disabled {
    cursor: not-allowed;
    color: green;
  }
`;

const Error = styled.span`
  color: red;
  margin-block: 5px;
`

const Login = () => {
  const username = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user); 

  const handleSubmit = (e) => {
    e.preventDefault();
    login(dispatch, {
      username: username.current.value,
      password: password.current.value,  
    });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input placeholder="username" name="username" ref={username} />
          <Input
            placeholder="password"
            type="password"
            name="password"
            ref={password}
          />
          <Button onClick={handleSubmit} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Invalid credentials</Error>}
          <Link href="/">FORGOT PASSWORD?</Link>
          <Link href="/register">CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
