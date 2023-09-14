// importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const {startDatabase} = require('./database/mongo');
const {insertBrngy, getBrngy} = require('./database/brngy');
const {deleteBrngy, updateBrngy} = require('./database/brngy');


const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));


app.get('/', async (req, res) => {
   res.send(await getBrngy);
});


app.post('/', async (req, res) => {
   const newBrgy = req.body;
   await insertBrngy(newBrgy);
   res.send({ message: 'New barangay inserted.' });
});


app.delete('/:id', async (req, res) => {
   await deleteBrngy(req.params.id);
   res.send({ message: 'Barangay removed.' });
});


app.put('/:id', async (req, res) => {
   const updatedBrgy = req.body;
   await updateBrngy(req.params.id, updatedBrgy);
   res.send({ message: 'Barangay updated.' });
});


startDatabase().then(async () => {
   await insertBrngys({title: 'Database!'});

   // start the server
   app.listen(8000, async () => {
     console.log('listening on port 8000');
   });
});

