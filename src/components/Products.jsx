import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'
import {mobile} from '../responsive'

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    ${mobile({justifyContent:"center"})}

`

function Products() {
  return (
    <Container>
        {
            popularProducts.map(item=> (
                <Product item={item} key={item.id}/>
            ))
        }
    </Container>
  )
}

export default Products