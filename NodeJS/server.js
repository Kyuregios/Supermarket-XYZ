const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'authmarket',
    password: 'authmarket',
    database: 'supermarket'
});

db.connect(err => {
    if (err) throw err;
    console.log('Database connected');
});

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ message: 'No token provided' });
    
    jwt.verify(token.split(' ')[1], 'secretkey', (err, decoded) => {
        if (err) return res.status(500).send({ message: 'Failed to authenticate token' });
        req.userId = decoded.id;
        next();
    });
};

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) throw err;
    });
});

//Ruta de login

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            const user = result[0];
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign({ id: user.id }, 'secretkey', { expiresIn: '1h' });
                res.send({ token });
            } else {
            }
        } else {
        }
    });
});

// Ruta para mostrar usuarios

app.get('/users', verifyToken, (req, res) => {
    const sql = 'SELECT id, username FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Ruta para eliminar usuarios

app.delete('/users/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'User deleted' });
    });
});

// Ruta para actualizar usuarios

app.put('/users/:id', verifyToken, (req, res) => {
    const userId = req.params.id;
    const { username, password } = req.body;
    const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
    db.query(sql, [username, password, userId], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'User updated' });
    });
});

// Ruta para obtener la información del usuario autenticado
app.get('/user', verifyToken, (req, res) => {
  const userId = req.userId;
  const sql = 'SELECT id, username FROM users WHERE id = ?';
  db.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ message: 'User not found' });
    res.send(result[0]);
  });
});

// Ruta para actualizar la información del usuario autenticado
app.put('/user/:id', verifyToken, (req, res) => {
  const userId = req.params.id;
  const { username, password } = req.body;
  const sql = 'UPDATE users SET username = ?, password = ? WHERE id = ?';
  db.query(sql, [username, password, userId], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User updated' });
  });
});

// Ruta para verificar si el usuario es administrador
app.get('/check-admin', verifyToken, (req, res) => {
    const userId = req.userId;
    const sql = 'SELECT username FROM users WHERE id = ?';
    db.query(sql, [userId], (err, result) => {
      if (err) return res.status(500).send(err);
      if (result.length === 0) return res.status(404).send({ message: 'User not found' });
      const isAdmin = result[0].username === 'Admin';
      res.send({ isAdmin });
    });
  });

  // Ruta para obtener la lista de cupones
app.get('/coupons', (req, res) => {
  const sql = 'SELECT id, code, discount FROM coupons';
  db.query(sql, (err, result) => {
    if (err) return res.status(500).send(err);
    res.send(result);
  });
});

// Ruta para eliminar un cupón
app.delete('/coupons/:id', (req, res) => {
  const couponId = req.params.id;
  const sql = 'DELETE FROM coupons WHERE id = ?';
  db.query(sql, [couponId], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Coupon deleted successfully' });
  });
});

// Ruta para actualizar un cupón
app.put('/coupons/:id', (req, res) => {
  const couponId = req.params.id;
  const { code, discount } = req.body;
  const sql = 'UPDATE coupons SET code = ?, discount = ? WHERE id = ?';
  db.query(sql, [code, discount, couponId], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Coupon updated successfully' });
  });
});

// Ruta para crear un nuevo cupón
app.post('/coupons', (req, res) => {
  const { code, discount } = req.body;
  const sql = 'INSERT INTO coupons (code, discount) VALUES (?, ?)';
  db.query(sql, [code, discount], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Coupon created successfully' });
  });
});

// Ruta para obtener todos los productos
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// Ruta para filtrar productos por nombre
app.get('/products/search', (req, res) => {
    const { name } = req.query;
    const sql = 'SELECT * FROM products WHERE name LIKE ?';
    db.query(sql, [`%${name}%`], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
});

// Ruta para eliminar un producto
app.delete('/products/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM products WHERE id = ?';
  db.query(sql, [id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Product deleted successfully' });
  });
});

// Ruta para actualizar un producto
app.put('/products/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const sql = 'UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?';
  db.query(sql, [name, description, price, id], (err, result) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Product updated successfully' });
  });
});

// Route to create a new product
app.post('/products', (req, res) => {
  const { name, description, price } = req.body;
  const sql = 'INSERT INTO products (name, description, price) VALUES (?, ?, ?)';
  db.query(sql, [name, description, price], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});
