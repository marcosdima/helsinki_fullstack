import deepFreeze from 'deep-freeze'
import anecdoteReducer from '../reducers/anecdoteReducer'
import { voteAnecdote, createAnecdote, setReset } from '../reducers/anecdoteReducer'
import filterReducer, { changeFilter } from '../reducers/filterReducer'
import { example } from './test_helper'

describe('Lets test the anecdotes!', () => {
    test('you can vote an anecdote', () => {
        const state = example()
        const action = voteAnecdote(state[0].id)
        deepFreeze(state)
    
        const result = anecdoteReducer(state, action)
        expect(result[0].votes).toBe(state[0].votes + 1)
    })
    
    test('you can create one', () => {
        const state = example()
        const newOne = 'I was hit by a truck'
        const action = createAnecdote(newOne)
        deepFreeze(state)
        const result = anecdoteReducer(state, action)
        expect(result).toHaveLength(state.length + 1)
        expect(result.map(anecdote => anecdote.content)).toContain(newOne)
    })
    
    test('the anecdotes can be reseted', () => {
        const state = example()
        const action = setReset()
        deepFreeze(state)
        const result = anecdoteReducer(state, action)
        expect(result).toHaveLength(0)
    })

    test('the anecdotes are sorted by votes', () => {
        const state = example()
        const most_voted = 'The most voted anecdote'
        const action = createAnecdote(most_voted)
        deepFreeze(state)

        let result = anecdoteReducer(state, action)
        expect(result.map(anecdote => anecdote.content)).toContain(most_voted)
        
        const anecdote = result.find(anecdote => anecdote.content === most_voted)
        result = anecdoteReducer(result, voteAnecdote(anecdote.id))
        result = anecdoteReducer(result, voteAnecdote(anecdote.id))
        result = anecdoteReducer(result, voteAnecdote(anecdote.id))
        console.log(result)
        expect(result[0].id).toBe(anecdote.id)
        expect(result[0].votes).toBe(3)
    })
})

describe('Lets test the filters!', () => { 
    test('can be changed', () => {
        const filter = ''
        const newFilter = 'Now has to be THIS'

        deepFreeze(filter)
        const res = filterReducer(filter, changeFilter(newFilter))

        expect(res).toBe('Now has to be THIS')
    })
 })
