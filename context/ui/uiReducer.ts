import { UIState } from './';

type UIActionType =
  | { type: 'UI - Open Sidebar' }
  | { type: 'UI - Close Sidebar' }
  | { type: 'UI - Start Dragging' }
  | { type: 'UI - End Dragging' }
  | { type: 'UI - Adding Entry', payload: boolean }

export const uiReducer = ( state: UIState, action: UIActionType ): UIState => {
  switch (action.type) {
    case 'UI - Open Sidebar':
      return {
        ...state,
        sideMenuOpen: true
      }

    case 'UI - Close Sidebar':
      return {
        ...state,
        sideMenuOpen: false
      }

    case 'UI - Adding Entry':
      return {
        ...state,
        isAddingEntry: action.payload
      }

    case 'UI - Start Dragging':
      return {
        ...state,
        isDragging: true
      }

    case 'UI - End Dragging':
      return {
        ...state,
        isDragging: false
      }

    default:
      return state
  }
}
