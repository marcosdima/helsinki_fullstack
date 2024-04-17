import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Selector from 'react-select'

export const Bar = styled.div`
    background: gray;
    padding: 20px 0px 20px 0px;
    width: 95%;
    margin: 20px;
    align-self: start
`

export const StyledLink = styled(Link)`
    background: gray;
    padding: 20px 0px 20px 0px;
    width: 95%;
    margin: 20px;
    align-self: start
`

export const SelectorStyle = styled(Selector)`
    width: fit-content
`