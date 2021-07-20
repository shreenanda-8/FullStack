import React, { useEffect, useState } from 'react'

import phoneServise from './servises/phone.js'
const Persons = (props) => {

    const listOfPeople = props.list
    const listOfDisplayData = props.display
    //  const uid = ()=>{
    //         return Date.now().toString(36) + Math.random().toString(36).substr(2);
    //     }
    const OverallInfo = listOfPeople.map((info, index) => {
        return { name: info.name, number: info.number, visible: listOfDisplayData[index], id: info.id }
    })
    if (OverallInfo.length) {
        const curate = OverallInfo.filter((info) => {
            return info.visible === true
        })
        const list = curate.map((info) => {

            return <p key={info.name}>{info.name}  {info.number} <button onClick={() => props.handleDeleteSender(info)}>Delete</button></p>
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
    const [persons, setPersons] = useState([])
    const [visible, setVisible] = useState([])
    const [newNumber, setNewNumber] = useState('')
    const [newName, setNewName] = useState('')
    const [searchField, setSearch] = useState('')
    useEffect(() => {
        function DoTheJob() {
            const disp = visible
            phoneServise.getAll()
                .then((Info) => {


                    for (var i = 0; i < Info.data.length; i++) {
                        disp.push(true)
                    }
                    setVisible(disp)
                    setPersons(Info.data)
                })
                .catch((err) => {
                    console.log({ error: err.message })
                })

        }
        DoTheJob()

    }, [visible])
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
            if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
                const list = persons.map((info) => {
                    if (info.name === newName) {
                        info.number = newNumber
                    }
                    return info
                })
                const info = persons.filter((info) => info.name === newName)

                info[0].number = newNumber
                phoneServise.update(info[0])
                    .then((response) => {
                        setPersons(list)
                    })
            }
        }
        else {
            const data = { name: newName, number: newNumber }
            phoneServise.create(data)
                .then((response) => {
                    listVisible.push(true)

                    listPeople.push(response.data)
                    setPersons(listPeople)
                    setVisible(listVisible)
                })
                .catch((err) => {
                    console.log({ error: err.message })
                })


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
    const handleDelete = (Info) => {

        const list = persons
        const visibility = visible

        const index = list.map((info) => info.id === Info.id)
        if (window.confirm(`Delete ${Info.name} ?`)) {
            phoneServise.remove(Info.id)
                .then((response) => {


                    for (let i = 0; i < index.length; i++) {
                        if (index[i]) {

                            const updated = visibility.filter((info, ind) => ind !== i)
                            setVisible(updated)
                            break
                        }
                    }
                    setPersons(list.filter((info) => info.id !== Info.id))
                })
                .catch((err) => {
                    console.log({ error: err.message })
                })
        }


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
            <Persons list={persons} display={visible} handleDeleteSender={(event) => handleDelete(event)} />

        </div>
    )
}

export default App