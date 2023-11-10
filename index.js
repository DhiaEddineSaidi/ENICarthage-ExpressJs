const express = require('express')
const app = express()
var cors = require('cors')
const port = 3000

app.use(cors())

me = {
    nom : 'Saidi',
    prenom : 'DhiaEddine',
    age: 31 ,
    dateNaissance : new Date(2023,11,29)
}

app.get('/me', (req, res) => {
    console.log(req)
    res.json(me)
})

app.post('/me', (req,res)=> {
    try {
        console.log(req)
        Object.assign(me, req)
        res.status(200).json('Done !!')    
    } catch (error) {
        res.status(500).json('could not update me !!')
    }
    
        
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
