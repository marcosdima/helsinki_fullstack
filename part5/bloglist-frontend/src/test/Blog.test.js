import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import BlogForm from '../components/BlogForm'
import helper from './test_helper'

describe('Blog Component Test', () => {
    let container
    let user
    let mockHandler

    beforeEach(() => {
        mockHandler = jest.fn()
        container = render(<Blog blog={helper.example_blog()} like={mockHandler} />).container
        user = userEvent.setup()
    }) 
    test('at the begining show title...', () => {
        const title = screen.getByText('A test blog')
        expect(title).toBeDefined()
    })
    test('and nothing else.', () => {
        const body_of_blog = container.querySelector('.toggle-on')
        expect(body_of_blog).toHaveStyle('display: none')
    })
    test('unless you click DA button', async () => {
        const DA_button = screen.getByText('view')
        const body_of_blog = container.querySelector('.toggle-on')
        await user.click(DA_button)

        expect(body_of_blog).not.toHaveStyle('display: none')
    })
    test('ah, two clicks to like!', async () => {
        const like_button = screen.getByText('like')

        await user.click(like_button)
        
        expect(mockHandler).toHaveBeenCalledTimes(1);

        await user.click(like_button)

        expect(mockHandler.mock.calls).toHaveLength(2)
    })
})

describe('Blog Form test', () => {
    let container
    let user
    let createBlog

    beforeEach(() => {
        createBlog = jest.fn()
        container = render(<BlogForm create={createBlog} />).container
        user = userEvent.setup()
    }) 
    test('Adding a new Blog', async () => {
        const input_title = screen.getByPlaceholderText('Enter a title...')
        const input_author = screen.getByPlaceholderText('Enter a author...')
        const input_url = screen.getByPlaceholderText('Enter a url...')
        const sendButton = screen.getByText('create')

        const title = 'testing a form author...'
        const author = 'testing a form title...'
        const url = 'testing a form url...'

        await user.type(input_title, title);
        await user.type(input_author, author);
        await user.type(input_url, url);
        await user.click(sendButton)

        expect(createBlog.mock.calls).toHaveLength(1)
        const form = createBlog.mock.calls[0][0]
        expect(form.title).toBe(title)
        expect(form.author).toBe(author)
        expect(form.url).toBe(url)
    })
})