import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { data } from './data/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :req-body'
	)
);

app.get('/api/persons/:id', (req, res) => {
	const person = data.find((person) => person.id == Number(req.params.id));
	if (person) {
		res.send(person);
	} else {
		res.status(404).end('Person not found');
	}
});

app.get('/api/persons', (req, res) => {
	res.send(data);
});

app.get('/info', (req, res) => {
	const currentDate = new Date().toLocaleString();
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	res.send(
		` <div>
        <p>Phonebook has info for ${data.length} people</p>
      </div>
      <div>
        <p>${currentDate} (${timeZone})</p>
      </div>`
	);
});

app.post('/api/persons', (req, res) => {
	const body = req.body;

	if (!body.name || !body.number) {
		res.status(400).send({ error: 'The name or number is missing' });
	} else if (data.find((person) => person.name == body.name)) {
		res.status(409).send({ error: 'name must be unique' });
	}

	const newPerson = { name: body.name, number: body.number };
	data.push(newPerson);
	res.status(201).send(newPerson);
});

app.delete('/api/persons/:id', (req, res) => {
	data.splice(Number(req.params.id), 1);
	res.status(204).end('Person deleted');
});

app.use(unknownEndpoint);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
