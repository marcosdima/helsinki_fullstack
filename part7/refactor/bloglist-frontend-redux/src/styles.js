import styled from 'styled-components'
import { Link } from 'react-router-dom'

const brown = '#978568'
const green = '#919768'
const red = '#976E68'

export const Button = styled.button`
  background: ${green};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 10px;
  cursor: pointer
`

export const Body = styled.div`
    background: ${red};
    border-radius: 10%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 10px;
`

export const Title = styled.h1`
    background: ${brown};
    padding: 20px;
    border-radius: 10% 30%;
    width: fit-content;
    text-align: center;
    align-self: center
`

export const Bar = styled.div`
    background: ${brown};
    padding: 20px 0px 20px 0px;
    width: 95%;
    margin: 20px;
    align-self: start
`

export const LinkStyled = styled(Link)`
    background: ${red};
    border: solid;
    border-radius: 20%;
    margin: 5px;
`