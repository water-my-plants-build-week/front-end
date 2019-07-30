import mockAxios from 'axios'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import { FETCHING_USER_PLANTS_START, FETCHING_USER_PLANTS_SUCCESS, FETCHING_USER_PLANTS_FAILURE, getUserPlants } from './user'
import { BASE_URL } from './index'

const mockStore = configureStore([ thunk ])

describe('getUserPlants', () => {
  test('it should kick off with a loading action', () => {
    const store = mockStore([])

    mockAxios.get.mockImplementationOnce(() => Promise.resolve(

    ))

    expect(mockAxios.get).toHaveBeenCalledWith(`${BASE_URL}/users/1`)

  })
})
