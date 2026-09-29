const { MongoClient } = require('mongodb');

async function runCRUD() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected successfully to MongoDB!");

    const db = client.db("student");
    const collection = db.collection("student");

    // ==========================================
    // 1. CREATE - Insert Multiple Documents
    // ==========================================
    console.log("\n--- 1. CREATE ---");

    const insertResult = await collection.insertMany([
      {
        name: "Rahul",
        age: 21,
        course: "Computer Science"
      },
      {
        name: "Priya",
        age: 20,
        course: "Information Technology"
      },
      {
        name: "Arjun",
        age: 22,
        course: "Electronics"
      },
      {
        name: "Sneha",
        age: 21,
        course: "Computer Science"
      },
      {
        name: "Kiran",
        age: 23,
        course: "Mechanical Engineering"
      },
      {
        name: "Anjali",
        age: 20,
        course: "Artificial Intelligence"
      }
    ]);

    console.log("Number of documents inserted:",
                insertResult.insertedCount);

    console.log("Inserted IDs:",
                insertResult.insertedIds);


    // ==========================================
    // 2. READ - Find All Documents
    // ==========================================
    console.log("\n--- 2. READ ---");

    const students = await collection.find({}).toArray();

    console.log("All students:");

    students.forEach((student) => {
      console.log(student);
    });


    // ==========================================
    // 3. UPDATE - Update Rahul's Age
    // ==========================================
    console.log("\n--- 3. UPDATE ---");

    const updateResult = await collection.updateOne(
      { name: "Rahul" },
      { $set: { age: 22 } }
    );

    console.log("Updated documents count:",
                updateResult.modifiedCount);

    const updatedStudent = await collection.findOne({
      name: "Rahul"
    });

    console.log("Rahul after update:",
                updatedStudent);


    // ==========================================
    // 4. DELETE - Delete One Student
    // ==========================================
    /*
    console.log("\n--- 4. DELETE ---");

    const deleteResult = await collection.deleteOne({
      name: "Kiran"
    });

    console.log("Deleted documents count:",
                deleteResult.deletedCount);
    */

  } catch (err) {
    console.error("An error occurred:", err);

  } finally {
    await client.close();
    console.log("\nConnection closed.");
  }
}

runCRUD().catch(console.dir);