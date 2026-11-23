const { MongoClient } = require("mongodb");

const URI = "mongodb://localhost:27017";
const client = new MongoClient(URI);

// You will understand this boilerplate in session 6.
// For now, your job is to fill in the seven TODOs below.

async function main() {
  await client.connect();
  const users = client.db("blog_db").collection("users");

  await users.deleteMany({});

  // TODO 1: insert a user with an embedded address object.
  // The address must have at least a city and a country field.
  await users.insertOne({
    name: "Maxx",
    email: "maxx@example.com",
    address: { city: "Paris", country: "France" },
  });

  // TODO 2: insert a user with a skills array containing at least 3 items.
  await users.insertOne({
    name: "Laxu",
    email: "laxu@example.com",
    skills: ["JavaScript", "MongoDB", "Node.js"],
  });

  // TODO 3: use insertMany to insert at least 5 users in a single call.
  // Requirements:
  //   - At least 2 users must have address.country set to "France"
  //   - At least 2 users must have a skills array with at least 1 item
  await users.insertMany([
    {
      name: "Prashnu",
      email: "prashnu@example.com",
      address: { city: "Lyon", country: "France" },
    },
    {
      name: "Sagar",
      email: "sagar@example.com",
      address: { city: "Marseille", country: "France" },
      skills: ["Python", "SQL"],
    },
    {
      name: "Ghale",
      email: "ghale@example.com",
      address: { city: "Kathmandu", country: "Nepal" },
      skills: ["Docker", "Linux"],
    },
    {
      name: "Kiran",
      email: "kiran@example.com",
      address: { city: "Nice", country: "France" },
    },
    {
      name: "Nima",
      email: "nima@example.com",
      address: { city: "Pokhara", country: "Nepal" },
      skills: ["React"],
    },
  ]);

  // TODO 4: retrieve all documents and log each user's name.
  const allUsers = await users.find().toArray();
  console.log("--- All Users ---");
  allUsers.forEach((user) => console.log(user.name));

  // TODO 5: use dot notation to find the user whose address.city is "Paris" and log the result.
  const parisUser = await users.findOne({ "address.city": "Paris" });
  console.log("\n--- User in Paris ---");
  console.log(parisUser);

  // TODO 6: find all users whose address.country is "France" and log their names.
  const frenchUsers = await users.find({ "address.country": "France" }).toArray();
  console.log("\n--- Users in France ---");
  frenchUsers.forEach((user) => console.log(user.name));

  // TODO 7: find all users who have a skills field and log their names.
  const skilledUsers = await users.find({ skills: { $exists: true } }).toArray();
  console.log("\n--- Users with Skills ---");
  skilledUsers.forEach((user) => console.log(user.name));

  await client.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
