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
const Notification = ({ text, color }) => {
    const notif = {
        color: `${color}`,

        background: "lightgrey",
        fontSize: "10px",
        borderStyle: "solid",
        borderRadius: "5px",
        padding: "10px",
        marginBottom: "10px"
    }
    if (text) {
        return (
            <div style={notif}>
                <h1>{text}</h1>
            </div>
        )

    }
    else {
        return (<></>)
    }

}
const App = () => {
    const [persons, setPersons] = useState([])
    const [visible, setVisible] = useState([])
    const [error, setError] = useState(null)
    const [color, setColor] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newName, setNewName] = useState('')
    const [searchField, setSearch] = useState('')
    useEffect(() => {

        const disp = []

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




    }, [])
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
                        setError(`Changed the number of ${newName}`)
                        setColor("green")
                        setTimeout(() => {
                            setError(null)
                        }, 3000)

                    })
                    .catch((err) => {
                        const data = persons
                        for (let i = 0; i < persons.length; i++) {

                            if (data[i].name === newName) {

                                const data = visible.filter((info, ind) => ind !== i)
                                const list = persons.filter((info) => info.name !== newName)
                                setPersons(list)
                                setVisible(data)
                            }
                        }


                        //The method to get the exact same error message from the backend:}
                        setError(`${err.response.data.error}`)
                        setColor("red")
                        setTimeout(() => {
                            setError(null)
                        }, 3000)

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
                    setError(`Added ${newName}`)
                    setColor("green")
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
                })
                .catch((err) => {

                    setError(`${err.response.data.error}`)
                    setColor("red")
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
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

        const index = list.map((info) => info.id)
        if (window.confirm(`Delete ${Info.name} ?`)) {
            phoneServise.remove(Info.id)
                .then((response) => {



                    setVisible(visibility.filter((info, ind) => ind !== index))
                    setPersons(list.filter((info) => info.id !== Info.id))

                })
                .catch((err) => {
                    console.log({ error: err.message })

                    setError(`${err.response.data.error}`)
                    setPersons(persons)
                    setVisible(visible)
                    setColor('red')
                    setTimeout(() => {
                        setError(null)
                    }, 3000)
                })
        }


    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification text={error} color={color} />
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