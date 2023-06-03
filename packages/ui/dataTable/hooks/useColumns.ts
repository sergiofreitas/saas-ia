import { useState } from 'react'

export const useColumns = () => {
  const [columnVisibility, onColumnVisibilityChange] = useState({})

  return {
    columnVisibility,
    onColumnVisibilityChange,
  }
}
