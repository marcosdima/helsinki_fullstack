import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import helper from './test_helper'

describe('Blog Component Test', () => {
    let container
    
    beforeEach(() => container = render(<Blog blog={helper.example_blog()} />).container)

    test('at the begining show title...', () => {
        const title = screen.getByText('A test blog')
        expect(title).toBeDefined()
    })
    test('and nothing else.', () => {
        const body_of_blog = container.querySelector('.toggle-on')
        expect(body_of_blog).toHaveStyle('display: none')
    })
})