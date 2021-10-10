// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

const MockComponent = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <div>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <div role="contentinfo">{count}</div>
    </div>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<MockComponent />)

  const count = screen.getByRole('contentinfo')

  expect(count).toHaveTextContent('0')

  userEvent.click(screen.getByText('increment'))
  expect(count).toHaveTextContent('1')

  userEvent.click(screen.getByText('decrement'))
  userEvent.click(screen.getByText('0'))
})

/* eslint no-unused-vars:0 */
