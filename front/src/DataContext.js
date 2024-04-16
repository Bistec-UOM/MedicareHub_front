import React from 'react'
import { useState } from 'react'

let Contxt=React.createContext()

export function DataContext({children}){
    
    const [varA,setvarA]=useState('')
    
    return (
        <Contxt.Provider value={{varA,setvarA}}>
        {children}
        </Contxt.Provider>
  )
}

export default Contxt