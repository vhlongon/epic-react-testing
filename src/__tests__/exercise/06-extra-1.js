// mocking Browser APIs and modules
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

const fakePosition = {
  coords: {
    latitude: 35,
    longitude: 139,
  },
}

jest.mock('react-use-geolocation')

let setReturnValue
function useMockCurrentPosition() {
  const [value, setValue] = React.useState([])
  setReturnValue = setValue
  return value
}

beforeEach(() => {
  useCurrentPosition.mockImplementation(useMockCurrentPosition)
})

afterEach(() => {
  jest.resetAllMocks()
})

test('displays the users current location', async () => {
  render(<Location />)

  act(() => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
    `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
    `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays error message when not able to retrieve location', () => {
  const error = {
    message: 'poop',
  }

  render(<Location />)
  expect(screen.getByLabelText(/loading/i)).toBeInTheDocument()

  act(() => {
    setReturnValue([undefined, error])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()
  expect(screen.getByText('poop')).toBeInTheDocument()
})
