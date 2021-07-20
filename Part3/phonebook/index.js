const express = require('express')

const app = express()
app.use(express.json())
const data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/api/persons', (request, response)=>{
 response.send(JSON.stringify(data))
})
app.get('/info', (request, response)=>{
    
    response.send(
       `<div>
       <p>Phonebook has info for ${data.length} people</p>
       ${new Date()}
       </div>
       
       `
    )
})

app.listen(3001,(request, response)=>{
    console.log("Server started running")
})