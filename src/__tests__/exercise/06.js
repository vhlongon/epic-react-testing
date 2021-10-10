// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import Location from '../../examples/location'

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

const deferred = () => {
  let resolve; 
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 35,
      longitude: 139,
    },
  }
  const {promise, resolve} = deferred()
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {
      promise.then(() => callback(fakePosition))
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  await act(async () => {
    resolve()
    await promise
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays error message when not able to retrieve location', async () => {
  const error = {
    message: 'poop',
  }
  const {promise, reject} = deferred()
  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    callback => {},
    errorCallback => {
      promise.catch(() => errorCallback(error))
    },
  )

  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  try {
    await act(async () => {
      reject()
      await promise
    })

    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

    expect(screen.getByText('poop')).toBeInTheDocument()
  } catch (error) {}
})
