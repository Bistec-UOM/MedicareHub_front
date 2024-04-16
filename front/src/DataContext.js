import React from 'react'
import { useState } from 'react'

let Contxt=React.createContext()

export function DataContext({children}){
    
    const [varA,setvarA]=useState('')
    
    return (
        <DataContext.Provider value={{varA,setvarA}}>
        {children}
        </DataContext.Provider>
  )
}

export default Contxt