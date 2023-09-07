const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
} else {
  const password = process.argv[2];
  const url = `mongodb://nabilfikrisp:${password}@ac-xfei6ct-shard-00-00.ceoyeak.mongodb.net:27017,ac-xfei6ct-shard-00-01.ceoyeak.mongodb.net:27017,ac-xfei6ct-shard-00-02.ceoyeak.mongodb.net:27017/phoneBookApp?ssl=true&replicaSet=atlas-eqcl8i-shard-0&authSource=admin&retryWrites=true&w=majority`;
  mongoose.set('strictQuery', false);
  mongoose
    .connect(url)
    .then(() => console.log('Database connected!'))
    .catch((err) => console.log(err));

  const personSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
  });

  const Person = mongoose.model('Person', personSchema);

  if (process.argv.length === 5) {
    const name = process.argv[3];
    const number = process.argv[4];

    const person = new Person({
      name,
      number,
    });

    person.save().then(() => {
      console.log(`added ${name} number ${number} to phonebook`);
      mongoose.connection.close();
    });
  } else {
    Person.find({}).then((result) => {
      console.log('Phonebook:');
      result.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
  }
}
