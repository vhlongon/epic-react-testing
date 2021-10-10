// testing custom hooks
// http://localhost:3000/counter-hook

import useCounter from '../../components/use-counter'
import {renderHook, act} from '@testing-library/react-hooks'

test('exposes the count and increment/decrement functions', () => {
  const {result} = renderHook(() => useCounter())
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  const {result} = renderHook(() => useCounter({initialCount: 3}))
  expect(result.current.count).toBe(3)
})

test('allows customization of the step', () => {
  const {result} = renderHook(() => useCounter({step: 2}))
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})
