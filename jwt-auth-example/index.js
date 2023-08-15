const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const secretKey = 'yourSecretKeyHere';

// Serve the HTML and CSS files
app.use(express.static(path.join(__dirname, '')));

// Simulated user database
const users = [
  { id: 1, username: 'user1', password: 'pass1' },
  { id: 2, username: 'user2', password: 'pass2' },
];

// Login route
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Protected route
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Protected route accessed successfully!' });
});

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token not provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.userId = decoded.id;
    next();
  });
}

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
