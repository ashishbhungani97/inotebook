const cors = require('cors');
const connectToMongo = require('./db');
const express = require('express')
connectToMongo();


const app = express()
const port = 3001

app.use(cors({
  origin: '*'
}));

app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
