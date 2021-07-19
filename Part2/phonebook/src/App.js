import React, { useState } from 'react'
const Persons = (props) => {
    const listOfPeople = props.list
    const listOfDisplayData = props.display
    const OverallInfo = listOfPeople.map((info, index) => {
        return { name: info.name, number: info.number, visible: listOfDisplayData[index] }
    })
    if (OverallInfo.length) {
        const curate = OverallInfo.filter((info) => {
            return info.visible === true
        })
        const list = curate.map((info) => {

            return <p key={info.name}>{info.name}  {info.number}</p>
        })
        return (
            <div>
                {
                    list
                }
            </div>

        )
    }
    else { return <></> }
}
const Filter = ({ searchField, handleSearchField }) => {
    return (
        <div>
            form shown with <input value={searchField} onChange={handleSearchField} />
        </div>
    )
}
const PersonForm = ({ newName, newNumber, handleNameSender, handleNumberSender, handleSubmitSender }) => {
    return (
        <form >
            <div>
                name: <input value={newName} onChange={(event) => handleNameSender(event)} />
            </div>
            <div>number: <input value={newNumber} onChange={(event) => handleNumberSender(event)} /></div>
            <div>
                <button type="submit" onClick={(event) => handleSubmitSender(event)}>add</button>
            </div>
        </form>
    )
}
const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [visible, setVisible] = useState([true, true, true, true])
    const [newNumber, setNewNumber] = useState('')
    const [newName, setNewName] = useState('')
    const [searchField, setSearch] = useState('')
    const handleName = (event) => {

        //I got an error about uncontrolled input and controlled input unitil I updated the state
        setNewName(event.target.value)

    }

    const handleNumber = (event) => {
        event.preventDefault()
        setNewNumber(event.target.value)
    }
    const handleSubmit = (event) => {

        event.preventDefault()
        const listPeople = [...persons]
        const listVisible = [...visible]
        //Directly checking includes of an array of objects is not possible
        const listNames = listPeople.map((info) => info.name)

        if (listNames.includes(newName)) {
            alert(`${newName} is already added to the PhoneBook`)
        }
        else {
            const data = { name: newName, number: newNumber }
            listVisible.push(true)
            listPeople.push(data)
            setPersons(listPeople)
            setVisible(listVisible)

        }

    }
    const handleSearchChange = (event) => {
        event.preventDefault()

        const listPeople = [...persons]

        setSearch(event.target.value)
        const listVisible = [...visible]

        const listToDisplay = listPeople.map((info, index) => {
            var name = info.name.toLowerCase()
            //Setting event.target.value works but searchField is not working it's always 1 step behind the time
            //That's why better to use event.target.value

            if (!name.includes(event.target.value.toLowerCase())) {

                listVisible[index] = false

            }
            else {

                listVisible[index] = true
            }
            return listVisible[index]
        })

        setVisible(listToDisplay)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter searchField={searchField} handleSearchField={(event) => handleSearchChange(event)} />

            <h2>Add a new </h2>

            <PersonForm
                newNmae={newName}
                newNumber={newNumber}
                handleNameSender={(event) => handleName(event)}
                handleNumberSender={(event) => handleNumber(event)}
                handleSubmitSender={(event) => handleSubmit(event)}
            />
            <h2>Numbers</h2>
            <Persons list={persons} display={visible} />

        </div>
    )
}

export default App