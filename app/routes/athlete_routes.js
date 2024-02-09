const express = require('express')
const passport = require('passport')

const Athlete = require('../models/athlete')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()

// INDEX
// GET /athletes
router.get('/athletes', (req, res, next) => {
	Athlete.find().sort( { "sport": 1, "name": 1 })
		.then((athletes) => {
			return athletes.map((athlete) => athlete.toObject())
		})
		.then((athletes) => res.status(200).json({ athletes: athletes }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// SHOW
// GET /athletes/5a7db6c74d55bc51bdf39793
router.get('/athletes/:id', (req, res, next) => {
	// req.params.id will be set based on the `:id` in the route
	Athlete.findById(req.params.id)
		.then(handle404)
		// if `findById` is succesful, respond with 200 and "athlete" JSON
		.then((athlete) => res.status(200).json({ athlete: athlete.toObject() }))
		// if an error occurs, pass it to the handler
		.catch(next)
})

// CREATE
// POST /athletes
router.post('/athletes', requireToken, (req, res, next) => {
	// set owner of new athlete to be current user
	req.body.athlete.owner = req.user.id

	Athlete.create(req.body.athlete)
		// respond to succesful `create` with status 201 and JSON of new "athlete"
		.then((athlete) => {
			res.status(201).json({ athlete: athlete.toObject() })
		})
		// if an error occurs, pass it off to our error handler
		.catch(next)
})

// UPDATE
// PATCH /athletes/5a7db6c74d55bc51bdf39793
router.patch('/athletes/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.athlete.owner
    
	Athlete.findById(req.params.id)
        .then(handle404)
        .then((athlete) => {
            requireOwnership(req, athlete)

            // add back nullable fields in order to force them to clear out
            if (!req.body.athlete.currentTeam) req.body.athlete.currentTeam = ''
            if (!req.body.athlete.jerseyNumber) req.body.athlete.jerseyNumber = null

            return athlete.updateOne(req.body.athlete)
        })
        // if that succeeded, return 204 and no JSON
        .then((athlete) => res.sendStatus(204))
        // if an error occurs, pass it to the handler
        .catch(next)
})

// DESTROY
// DELETE /athletes/5a7db6c74d55bc51bdf39793
router.delete('/athletes/:id', requireToken, (req, res, next) => {
	Athlete.findById(req.params.id)
		.then(handle404)
		.then((athlete) => {
			// throw an error if current user doesn't own `athlete`
			requireOwnership(req, athlete)
			// delete the athlete ONLY IF the above didn't throw
			athlete.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})

module.exports = router
