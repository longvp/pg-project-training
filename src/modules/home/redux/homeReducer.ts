import { ActionType, createCustomAction, getType } from 'typesafe-actions'

export interface HomeState {
  isToggleSidebar: boolean
  isShowModal: boolean
}

export const setToggleSidebar = createCustomAction('home/setToggleSidebar')

export const setShowModal = createCustomAction('home/setShowModal', (data: boolean) => ({
  data,
}))

const initialState = {
  isToggleSidebar: false,
  isShowModal: false,
}

const actions = { setToggleSidebar, setShowModal }

type Action = ActionType<typeof actions>

export default function reducer(state: HomeState = initialState, action: Action) {
  switch (action.type) {
    case getType(setToggleSidebar):
      return { ...state, isToggleSidebar: !state.isToggleSidebar }
    case getType(setShowModal):
      return { ...state, isShowModal: action.data }
    default:
      return state
  }
}
