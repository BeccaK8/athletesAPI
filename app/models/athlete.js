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
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
	},
	{
		timestamps: true,
        toObject: { virtuals: true },
        toJSON: { virtuals: true },
	}
)

athleteSchema.virtual('fullTitle').get(function() {
	return `${this.name} the ${this.sport} Player`
})

athleteSchema.virtual('status').get(function() {
	return (this.active) ? 'Still playing' : 'Retired (and hopefully living the good life!)'
})

module.exports = mongoose.model('Athlete', athleteSchema)
