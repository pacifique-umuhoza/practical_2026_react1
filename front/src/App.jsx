import { Routes, Route, Navigate } from 'react-router-dom';

import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employee from './pages/Employee';
import Payroll from './pages/Payroll';
import Department from './pages/Department';
import Salary from './pages/Salary';

import Payslip from './pages/Payslip';
function App() {

    return (
        <Routes>

            <Route
                path="/register"
                element={<Register />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/dashboard"
                element={<Dashboard />}
            />

            <Route
                path="/employee"
                element={<Employee />}
            />

            <Route
                path="/department"
                element={<Department />}
            />

            <Route
                path="/salary"
                element={<Salary />}
            />
             <Route
                path="/payroll"
                element={<Payroll/>}
            />
            <Route
                path="/payslip"
                element={<Payslip/>}
            />

            <Route
                path="*"
                element={<Navigate to="/login" />}
            />
           

        </Routes>
    );
}

export default App;