const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(cors());

// JWT SECRET
const JWT_SECRET = 'your_super_secret_key';

// DATABASE CONNECTION
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'epms'
});
pool.getConnection()
.then(() => {
    console.log("Database connected");
})
.catch((err) => {
    console.log(err);
});

// ========================= REGISTER =========================
app.post('/register', async (req, res) => {

    try {

        const { username, password } = req.body;

        // VALIDATION
        if (!username || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
            
        }

        // CHECK IF USER EXISTS
        const [existingUser] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // INSERT USER
        await pool.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
});


// ========================= LOGIN =========================
app.post('/login', async (req, res) => {

    try {

        const { username, password } = req.body;

        // VALIDATION
        if (!username || !password) {
            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        // CHECK USER
        const [rows] = await pool.query(
            'SELECT * FROM users WHERE username = ?',
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        const user = rows[0];

        // COMPARE PASSWORD
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password'
            });
        }

        // CREATE TOKEN
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server error'
        });
    }
});


// ========================= AUTH MIDDLEWARE =========================
const authenticateToken = (req, res, next) => {

    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            message: 'Access denied'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {

        if (err) {
            return res.status(403).json({
                message: 'Invalid token'
            });
        }

        req.user = user;

        next();
    });
};


// ========================= PROTECTED ROUTE =========================
app.get('/dashboard', authenticateToken, (req, res) => {

    res.json({
        message: 'Welcome to dashboard',
        user: req.user
    });
});
///////////////////////////////////////////////////
// ================= DEPARTMENT CRUD =================

// GET ALL DEPARTMENTS
app.get('/departments', async (req, res) => {

    try {

        const [rows] = await pool.query(
            'SELECT * FROM department'
        );

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});


// ADD DEPARTMENT
app.post('/departments', async (req, res) => {

    try {

        const {
            DepartmentCode,
            DepartmentName,
            GrossSalary,
            TotalDeduction
        } = req.body;

        await pool.query(
            `INSERT INTO department
            (DepartmentCode, DepartmentName, GrossSalary, TotalDeduction)
            VALUES (?, ?, ?, ?)`,
            [
                DepartmentCode,
                DepartmentName,
                GrossSalary,
                TotalDeduction
            ]
        );

        res.json({
            message: 'Department Added Successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});


// UPDATE DEPARTMENT
app.put('/departments/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            DepartmentName,
            GrossSalary,
            TotalDeduction
        } = req.body;

        await pool.query(
            `UPDATE department
            SET
            DepartmentName = ?,
            GrossSalary = ?,
            TotalDeduction = ?
            WHERE DepartmentCode = ?`,
            [
                DepartmentName,
                GrossSalary,
                TotalDeduction,
                id
            ]
        );

        res.json({
            message: 'Department Updated Successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});


// DELETE DEPARTMENT
app.delete('/departments/:id', async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            'DELETE FROM department WHERE DepartmentCode = ?',
            [id]
        );

        res.json({
            message: 'Department Deleted Successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});
///////////////////////////////////////////////
// ================= EMPLOYEE CRUD =================

// GET ALL EMPLOYEES
app.get('/employees', async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT e.*, d.DepartmentName
            FROM employee e
            JOIN department d ON e.DepartmentCode = d.DepartmentCode
        `);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: 'Server Error' });
    }
});


// ADD EMPLOYEE
app.post('/employees', async (req, res) => {

    try {

        const {
            FirstName,
            LastName,
            Position,
            Address,
            Telephone,
            Gender,
            HiredDate,
            DepartmentCode
        } = req.body;

        await pool.query(`
            INSERT INTO employee
            (FirstName, LastName, Position, Address, Telephone, Gender, HiredDate, DepartmentCode)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
            FirstName,
            LastName,
            Position,
            Address,
            Telephone,
            Gender,
            HiredDate,
            DepartmentCode
        ]);

        res.json({ message: 'Employee Added Successfully' });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: 'Server Error' });
    }
});


// DELETE EMPLOYEE
app.delete('/employees/:id', async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            'DELETE FROM employee WHERE EmployeeNumber = ?',
            [id]
        );

        res.json({ message: 'Employee Deleted Successfully' });

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: 'Server Error' });
    }
});
// ================= UPDATE EMPLOYEE =================
app.put('/employees/:id', async (req, res) => {

    try {

        const { id } = req.params;

        const {
            FirstName,
            LastName,
            Position,
            Address,
            Telephone,
            Gender,
            HiredDate,
            DepartmentCode
        } = req.body;

        await pool.query(`
            UPDATE employee
            SET
                FirstName = ?,
                LastName = ?,
                Position = ?,
                Address = ?,
                Telephone = ?,
                Gender = ?,
                HiredDate = ?,
                DepartmentCode = ?
            WHERE EmployeeNumber = ?
        `, [
            FirstName,
            LastName,
            Position,
            Address,
            Telephone,
            Gender,
            HiredDate,
            DepartmentCode,
            id
        ]);

        res.json({
            message: 'Employee Updated Successfully'
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});
//salary
app.get('/salary', async (req, res) => {

    try {

        const [rows] = await pool.query(`
            SELECT 
                s.SalaryID,
                e.FirstName,
                e.LastName,
                d.DepartmentName,
                d.GrossSalary,
                d.TotalDeduction,
                (d.GrossSalary - d.TotalDeduction) AS NetSalary,
                s.Month
            FROM salary s
            JOIN employee e ON s.EmployeeNumber = e.EmployeeNumber
            JOIN department d ON e.DepartmentCode = d.DepartmentCode
        `);

        res.json(rows);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
app.post('/salary', async (req, res) => {

    try {

        const { EmployeeNumber, Month } = req.body;

        // GET EMPLOYEE + DEPARTMENT
        const [rows] = await pool.query(`
            SELECT e.EmployeeNumber, d.GrossSalary, d.TotalDeduction
            FROM employee e
            JOIN department d ON e.DepartmentCode = d.DepartmentCode
            WHERE e.EmployeeNumber = ?
        `, [EmployeeNumber]);

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        const data = rows[0];

        const netSalary = data.GrossSalary - data.TotalDeduction;

        await pool.query(`
            INSERT INTO salary
            (EmployeeNumber, GrossSalary, TotalDeduction, NetSalary, Month)
            VALUES (?, ?, ?, ?, ?)
        `, [
            EmployeeNumber,
            data.GrossSalary,
            data.TotalDeduction,
            netSalary,
            Month
        ]);

        res.json({ message: 'Salary Generated Successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
});
/////REPORT
app.get('/payroll/:month', async (req, res) => {

    try {

        const { month } = req.params;

        const [rows] = await pool.query(`
            SELECT 
                e.FirstName,
                e.LastName,
                e.Position,
                d.DepartmentName,
                (d.GrossSalary - d.TotalDeduction) AS NetSalary,
                s.Month
            FROM salary s
            JOIN employee e ON s.EmployeeNumber = e.EmployeeNumber
            JOIN department d ON e.DepartmentCode = d.DepartmentCode
            WHERE s.Month = ?
        `, [month]);

        res.json(rows);

    } catch (error) {

        console.log(error);

        res.status(500).json({ message: 'Server Error' });
    }
});
//bill
app.get('/payslip/:employeeId/:month', async (req, res) => {

    try {

        const { employeeId, month } = req.params;

        const [rows] = await pool.query(`
            SELECT 
                e.FirstName,
                e.LastName,
                e.Position,
                d.DepartmentName,
                d.GrossSalary,
                d.TotalDeduction,
                (d.GrossSalary - d.TotalDeduction) AS NetSalary,
                s.Month
            FROM salary s
            JOIN employee e ON s.EmployeeNumber = e.EmployeeNumber
            JOIN department d ON e.DepartmentCode = d.DepartmentCode
            WHERE s.EmployeeNumber = ? AND s.Month = ?
        `, [employeeId, month]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Payslip not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Server Error"
        });
    }
});
// ========================= START SERVER =========================
app.listen(5000, () => {
    console.log('Server running on port 5000');
});