const mongoose = require('mongoose')

const athleteSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		sport: {
			type: String,
			required: true,
		},
		position: {
			type: String,
			required: true,
		},
		currentTeam: {
			type: String,
		},
		jerseyNumber: {
			type: Number,
		},
		active: {
			type: Boolean,
			required: true,
			default: true
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Athlete', athleteSchema)
