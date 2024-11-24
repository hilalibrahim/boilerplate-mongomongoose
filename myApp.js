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
  Person.findById(personId, (err, data) => {
    if (err) {
      return done(err); // Pass the error to the callback
    }
    done(null, data); // Pass the found document to the callback
  });
};


const findEditThenSave = (personId, done) => {
  Person.findById(personId, (err, person) => {
    if (err) {
      return done(err); // Handle error if person not found
    }

    // Add "hamburger" to the favoriteFoods array
    person.favoriteFoods.push("hamburger");

    // Save the updated person document
    person.save((err, updatedPerson) => {
      if (err) {
        return done(err); // Handle error while saving
      }
      done(null, updatedPerson); // Pass the updated document to the callback
    });
  });
};


const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName }, // Search by name
    { age: 20 },          // Update the age to 20
    { new: true },        // Return the updated document
    (err, updatedPerson) => {
      if (err) {
        return done(err); // Handle error if something goes wrong
      }
      done(null, updatedPerson); // Pass the updated document to the callback
    }
  );
};


const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, deletedPerson) => {
    if (err) {
      return done(err); // Handle error if something goes wrong
    }
    done(null, deletedPerson); // Return the removed document (if any)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary"; // This can be any name you wish to remove
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) {
      return done(err); // Handle any error
    }
    done(null, result); // Return the result object containing the outcome of the operation
  });
};


const queryChain = (done) => {
  const foodToSearch = "burrito"; // Specify the food to search for

  // Create the query with method chaining
  Person.find({ favoriteFoods: foodToSearch })  // Find people who like the specified food
    .sort({ name: 1 })                          // Sort by name in ascending order
    .limit(2)                                   // Limit to 2 results
    .select('-age')                             // Exclude the age field from the results
    .exec((err, data) => {                      // Execute the query and pass the callback
      if (err) {
        return done(err);                        // Handle error
      }
      done(null, data);                          // Return the result (array of people)
    });
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
