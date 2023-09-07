import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { data } from './data/index.js';
import { Person } from './database/mongo.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// middleware
morgan.token('req-body', (req) => JSON.stringify(req.body));

app.use(express.json());
app.use(cors());
app.use(express.static('dist'));

app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :req-body'
	)
);

// routes
app.get('/api/persons/:id', (req, res, next) => {
	Person.findById(req.params.id)
		.then((person) => {
			if (person) {
				res.json(person);
			} else {
				res.status(404).end();
			}
		})
		.catch((err) => next(err));
});

app.get('/api/persons', (req, res, next) => {
	Person.find({})
		.then((persons) => res.json(persons))
		.catch((err) => next(err));
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

app.post('/api/persons', (req, res, next) => {
	const body = req.body;

	// if (!body.name || !body.number) {
	// 	res.status(400).send({ error: 'The name or number is missing' });
	// } else if (data.find((person) => person.name == body.name)) {
	// 	res.status(409).send({ error: 'name must be unique' });
	// }

	const newPerson = new Person({ name: body.name, number: body.number });

	newPerson
		.save()
		.then((result) => {
			res.status(201).json(result);
		})
		.catch((err) => next(err));
});

app.put('/api/persons/:id', (req, res, next) => {
	const body = req.body;

	if (!body.name || !body.number) {
		res.status(400).send({ error: 'The name or number is missing' });
	}

	const newPerson = { name: body.name, number: body.number };

	Person.findByIdAndUpdate(req.params.id, newPerson, { new: true })
		.then((updatedNote) => {
			res.json(updatedNote);
		})
		.catch((err) => next(err));
});

app.delete('/api/persons/:id', (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(() => {
			res.status(204).end();
		})
		.catch((err) => next(err));
});

// error handler
const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' });
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message });
	}

	next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

// starting server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
