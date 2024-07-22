import mongoose from "mongoose";

// Connect MongoDB

// a function to connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://adakingmary:l8fLnQjwZHBdRKf0@cluster0.tryobxo.mongodb.net/Mongoose-checkpoint?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log(`MongoDb connected Successfully`);
    console.log("creating user document");
    findPeopleByName();
  } catch (error) {
    console.log(`Error: ${error.message}`);
    ProcessingInstruction.exit(1);
  }
};

connectDB();

// Task 1 A person prototype
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  age: {
    type: String,
    required: true,
  },

  favoriteFoods: [String],
});

// Task 2 create a person model
const Person = mongoose.model("Person", personSchema);

// Task 2b: create a person document
async function createPerson() {
  try {
    const person = new Person({
      name: "John",
      age: 37,
      favoriteFoods: ["Pizza", "Hamburger"],
    });
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
}

// Task 3: Create many people with `Model.create()`
const createManyPeople = async () => {
  let arrayOfPeople = [
    { name: "Yusuf", age: 107, favoriteFoods: ["Noodle", "Rice", "Eba"] },
    { name: "Aisha", age: 27, favoriteFoods: ["Pepper Soup", "meat", "pasta"] },
    { name: "Fatima", age: 17, favoriteFoods: ["Pizza", "Hamburger", "Eba"] },
  ];

  try {
    const result = await Person.create(arrayOfPeople);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

// Task 4: Use Model.find() to Search Your Database
const findPeopleByName = async () => {
  try {
    const person = await Person.find({ name: "Yusuf" });
    console.log(person);
  } catch (erro) {
    console.log(errr);
  }
};

// Task 5: Use Model.findOne() to Return a Single Matching Document from Your Database
const findOnePerson = async () => {
  try {
    const person = await Person.findOne({ favoriteFoods: "Pizza" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 6: Use Model.findById() to Search Your Database By _id and Return a Single Document
const findPersonById = async () => {
  try {
    const person = await Person.findById("66914d99a2a92afcd8502f35");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 7: Perform Classic Updates by Running Find, Edit, then Save
const findEditThenSave = async () => {
  try {
    const person = await Person.findById("66914d99a2a92afcd8502f35");
    person.favoriteFoods.push("Hamburger");
    await person.save();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 8: Perform New Updates on a Document Using `model.findOneAndUpdate()`
const findAndUpdate = async () => {
  try {
    const person = await Person.findOneAndUpdate(
      { name: "Yusuf" },
      { age: 1000 },
      { new: true }
    );
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 9: Delete One Document Using `model.findByIdAndRemove`
const removePersonById = async () => {
  try {
    const person = await Person.findByIdAndDelete("66914d99a2a92afcd8502f35");
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 10: MongoDB and Mongoose - Delete Many Documents with `model.remove()`
const removeManyPeople = async () => {
  try {
    const person = await Person.deleteMany({ name: "Mary" });
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};

// Task 11: Chain Search Query Helpers to Narrow Search Results
const queryChain = async () => {
  try {
    const person = await Person.find({ favoriteFoods: "Pizza" })
      .sort({ name: "asc" })
      .limit(2)
      .select("-age")
      .exec();
    console.log(person);
  } catch (error) {
    console.log(error);
  }
};
