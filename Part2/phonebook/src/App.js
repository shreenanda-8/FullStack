import React, { useState } from 'react'
const Persons = (props)=>{
  const listOfPeople = props.list
  if(listOfPeople.length)
  {
      const curate = listOfPeople.filter((info)=>{
          return info.visible === true
      })
       const list = curate.map((info)=>{
               
                    return <p key = {info.name}>{info.name}  {info.number}</p>
                })
      return(
          <div>
             {
               list
             }
          </div>
          
      )
  }
  else{return <></>}
}
const Filter = ({searchField, handleSearchField})=>{
    return(
        <div>
            form shown with <input value = {searchField} onChange = {handleSearchField}/>
        </div>
    )
}
const PersonFomr = ()=>{
    
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', visible: true },
        { name: 'Ada Lovelace', number: '39-44-5323523', visible: true },
        { name: 'Dan Abramov', number: '12-43-234345', visible: true },
        { name: 'Mary Poppendieck', number: '39-23-6423122', visible: true }
      ])
  const [newNumber, setNewNumber] = useState('')
  const [ newName, setNewName ] = useState('')
  const [searchField, setSearch] = useState('')
const handleName = (event)=>{
   
    //I got an error about uncontrolled input and controlled input unitil I updated the state
     setNewName(event.target.value)
 
}
const handleNumber = (event)=>{
    event.preventDefault()
    setNewNumber(event.target.value)
}
const handleSubmit = (event)=>{
    
  event.preventDefault()
   const listPeople = [...persons]

   //Directly checking includes of an array of objects is not possible
   const listNames = listPeople.map((info)=>info.name)
   
   if(listNames.includes(newName))
   {
       alert(`This guy ${newName} is already exists`)
   } 
   else{
    const data = {name: newName, number: newNumber, visible: true}
    listPeople.push(data)
    setPersons(listPeople)
   }
   
}
const handleSearchChange = (event)=>{
    event.preventDefault()
   
    const listPeople = [...persons]
    
    setSearch(event.target.value)
    const listToDisplay = listPeople.map((info)=>{
        var name = info.name
        //Setting event.target.value works but searchField is not working it's always 1 step behind the time
        //Don't know why
        if(!name.includes(event.target.value))
        {
            info.visible = false
            
        }
        else
        {
            info.visible = true
        }
        return info
    })
     
    setPersons(listToDisplay)    
}
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchField = {searchField} handleSearchField ={(event)=>handleSearchChange(event)}/>
      <form >
        <div>
          name: <input value = {newName} onChange = {(event)=>handleName(event)}/>
        </div>
        <div>number: <input value = {newNumber} onChange = {(event)=>handleNumber(event)}/></div>
        <div>
          <button type="submit" onClick = {(event)=>handleSubmit(event)}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons list = {persons}/>
     
    </div>
  )
}

export default App