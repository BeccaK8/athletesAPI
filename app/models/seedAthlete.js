// Initial Seed load of Athletes
// The command to run is: `npm run seed`

const mongoose = require('mongoose');
const Athlete = require('./athlete');
const db = require('../../config/db');

const startAthletes = [
    { name: 'Kyle Tucker', sport: 'Baseball', position: 'Outfielder', currentTeam: 'Houston Astros', jerseyNumber: 3, active: true},
    { name: 'Mike Ditka', sport: 'Football', position: 'Tight End', jerseyNumber: 89, active: false},
    { name: 'Michael Jordan', sport: 'Basketball', position: 'Guard/Forward', jerseyNumber: 23, active: false},
    { name: 'Aliyah Boston', sport: 'Basketball', position: 'Center', currentTeam: 'Indiana Fever', jerseyNumber: 7, active: true},
]

mongoose.connect(db, {useNewUrlParser: true})
    .then(() => {
        Athlete.deleteMany({ owner: null })
            .then(deletedAthletes => {
                console.log('deleted athletes in seed script: ', deletedAthletes);

                Athlete.create(startAthletes)
                    .then(newAthletes => {
                        console.log('new athletes added to db: \n', newAthletes);
                        mongoose.connection.close();
                    })
                    .catch(error => {
                        console.log('an error has occurred: \n', error);
                        mongoose.connection.close();
                    })
            })
            .catch(error => {
                console.log('an error has occurred: \n', error);
                mongoose.connection.close();
            })
    })
    .catch(error => {
        console.log('an error has occurred: \n', error);
        mongoose.connection.close();
    })