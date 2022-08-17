import { createContext } from 'react'

interface ContextProps {
  sideMenuOpen: boolean;
  isAddingEntry: boolean;
  isDragging: boolean;

  // Methos
  closeSideMenu: () => void;
  openSideMenu: () => void;
  startDragging: () => void
  endDragging: () => void
  setIsAddingEntry: (isAdding: boolean) => void
}

export const UIContext = createContext({} as ContextProps)
