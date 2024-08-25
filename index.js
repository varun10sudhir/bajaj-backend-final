const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// User information - Hardcoded
const user_id = "john_doe_17091999";
const email = "john@xyz.com";
const roll_number = "ABCD123";

// Route for POST /bfhl
app.post('/bfhl', (req, res) => {
  const data = req.body.data;

  if (!data || !Array.isArray(data)) {
    return res.status(400).json({
      is_success: false,
      user_id: user_id,
      message: "Invalid input. Please provide an array of data."
    });
  }

  const numbers = [];
  const alphabets = [];
  let highestLowercase = null;

  // Process the data
  data.forEach(item => {
    if (!isNaN(item)) {
      numbers.push(item);
    } else if (/^[a-zA-Z]$/.test(item)) {
      alphabets.push(item);
      if (item >= 'a' && item <= 'z') {
        if (!highestLowercase || item > highestLowercase) {
          highestLowercase = item;
        }
      }
    }
  });

  res.json({
    is_success: true,
    user_id: user_id,
    email: email,
    roll_number: roll_number,
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercase ? [highestLowercase] : []
  });
});

// Route for GET /bfhl
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
