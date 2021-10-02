// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

const buildLoginForm = ({
  password = faker.internet.password(),
  username = faker.internet.password(),
} = {}) => ({
  password,
  username,
})
test('submitting the form calls onSubmit with username and password', () => {
  const handleSubmit = jest.fn()
  const {username, password} = buildLoginForm({
    username: 'Bruce lee',
    password: 'IIIIAAAH',
  })

  render(<Login onSubmit={handleSubmit} />)

  const userNameInput = screen.getByLabelText(/username/i)
  const passwordInput = screen.getByLabelText(/password/i)
  const submit = screen.getByRole('button', {name: /submit/i})

  userEvent.type(userNameInput, username)
  userEvent.type(passwordInput, password)

  userEvent.click(submit)

  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})
