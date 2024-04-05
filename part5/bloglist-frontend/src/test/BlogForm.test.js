import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'

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