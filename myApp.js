require('dotenv').config();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
    trim: true, // Removes unnecessary whitespace
  },
  age: {
    type: Number,
    min: 0, // Age cannot be negative
  },
  favoriteFoods: {
    type: [String], // Array of strings
    default: [], // Default to an empty array if not provided
  },
});
let Person = mongoose.model('Person', personSchema);

const arrayOfPeople = [
  { name: 'Alice', age: 28, favoriteFoods: ['salad', 'steak'] },
  { name: 'Bob', age: 35, favoriteFoods: ['pizza', 'pasta'] },
  { name: 'Charlie', age: 22, favoriteFoods: ['chocolate', 'sushi'] },
];

const createAndSavePerson = (done) => {
  // Create a new person instance
  const person = new Person({
    name: "John Doe", // Example name
    age: 25, // Example age
    favoriteFoods: ["pizza", "pasta", "ice cream"], // Example favorite foods
  });

  // Save the instance to the database
  person.save((err, data) => {
    if (err) return done(err); // Pass the error to the callback
    done(null, data); // Pass the saved document to the callback
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  // Use Model.create() to save an array of people
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err); // Pass the error to the callback
    done(null, data); // Pass the created documents to the callback
  });
};


const findPeopleByName = (personName, done) => {
  // Use Model.find() to search for all people with the given name
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err); // Pass the error to the callback
    done(null, data); // Pass the found documents to the callback
  });
};

const findOneByFood = (food, done) => {
  // Use Model.findOne() to find one person with the given favorite food
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err); // Pass the error to the callback
    done(null, data); // Pass the found document to the callback
  });
};


const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
