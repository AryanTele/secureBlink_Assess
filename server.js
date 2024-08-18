const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json());

let processedData = []; // Placeholder for processed data from Python

// Route to get the processed data
app.get("/data", (req, res) => {
  res.json(processedData);
});

// Route to receive and save new data
app.post("/data", (req, res) => {
  // Check if body is not provided
  if (!req.body) {
    return res.status(400).send("No data provided");
  }

  // If the body is an array, update `processedData`
  if (Array.isArray(req.body)) {
    processedData = req.body;
  } else if (typeof req.body === "object") {
    // If the body is an object, add it to the `processedData` array
    processedData.push(req.body);
  } else {
    return res.status(400).send("Invalid data format");
  }

  // Save the data to a JSON file
  const timestamp = Date.now();
  const filePath = path.join(__dirname, `data_${timestamp}.json`);

  fs.writeFile(filePath, JSON.stringify(processedData, null, 4), (err) => {
    if (err) {
      console.error("Error writing data to file", err);
      return res.status(500).send("Error saving data to file");
    }
    console.log(`Data saved to file: ${filePath}`);
  });

  res.send("Data received, processed, and saved to file");
});

// Route to list users as HTML
app.get("/users", (req, res) => {
  const html = `
    <ul>
      ${processedData.map((user) => `<li>${user.Cust_name}</li>`).join("")}
    </ul>
  `;
  res.send(html);
});

// Route to get a specific user by ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = processedData.find((user) => user.id === id);

  if (!user) {
    return res.status(404).send("User not found");
  }

  res.json(user);
});

// Route to add a new user
app.post("/users", (req, res) => {
  const body = req.body;

  if (!body.id || !body.Cust_name) {
    return res.status(400).send("Missing required fields: id, Cust_name");
  }

  processedData.push(body);

  const filePath = path.join(__dirname, `data_${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(processedData, null, 4), (err) => {
    if (err) {
      console.error("Error writing data to file", err);
      return res.status(500).send("Error saving data to file");
    }
    res.json({ message: "User added", user: body });
  });
});

// Route to update a user by ID (PUT method)
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const updatedUser = req.body;

  const userIndex = processedData.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  processedData[userIndex] = { id, ...updatedUser };

  const filePath = path.join(__dirname, `data_${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(processedData, null, 4), (err) => {
    if (err) {
      console.error("Error writing data to file", err);
      return res.status(500).send("Error saving data to file");
    }
    res.json({ message: "User updated", user: processedData[userIndex] });
  });
});

// Route to delete a user by ID
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const userIndex = processedData.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    return res.status(404).send("User not found");
  }

  const deletedUser = processedData.splice(userIndex, 1);

  const filePath = path.join(__dirname, `data_${Date.now()}.json`);
  fs.writeFile(filePath, JSON.stringify(processedData, null, 4), (err) => {
    if (err) {
      console.error("Error writing data to file", err);
      return res.status(500).send("Error saving data to file");
    }
    res.json({ message: "User deleted", user: deletedUser });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
