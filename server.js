const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const accessTokenSecret= 'youraccesstokensecret';
// const bodyParser = require('body-parser');


app.use(express.json());
app.use(express.urlencoded({
    extended: true
  }));

app.listen(3000, () => {
    console.log('Authentication service started on port 3000');
});

const users = [
    {
        username: 'john',
        password: 'password123admin',
        
    }
];

app.post('/login', (req, res) => {
    
    const { username, password } = req.body;
    const user = users.find(X => { return X.username === username && X.password === password });
    
    if (user) {
       
        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
});