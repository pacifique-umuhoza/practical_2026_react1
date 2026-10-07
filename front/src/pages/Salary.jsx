import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

function Salary() {

    const [salary, setSalary] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [form, setForm] = useState({
        EmployeeNumber: '',
        Month: ''
    });

    // FETCH SALARY
    const fetchSalary = async () => {
        const res = await axios.get('http://localhost:5000/salary');
        setSalary(res.data);
    };

    // FETCH EMPLOYEES
    const fetchEmployees = async () => {
        const res = await axios.get('http://localhost:5000/employees');
        setEmployees(res.data);
    };

    useEffect(() => {
        fetchSalary();
        fetchEmployees();
    }, []);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        await axios.post('http://localhost:5000/salary', form);

        alert('Salary Generated');

        setForm({
            EmployeeNumber: '',
            Month: ''
        });

        fetchSalary();
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Salary Management
                </h1>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-md mb-10"
                >

                    <select
                        name="EmployeeNumber"
                        value={form.EmployeeNumber}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    >
                        <option value="">Select Employee</option>

                        {employees.map(emp => (
                            <option
                                key={emp.EmployeeNumber}
                                value={emp.EmployeeNumber}
                            >
                                {emp.FirstName} {emp.LastName}
                            </option>
                        ))}
                    </select>

                    <input
                        type="month"
                        name="Month"
                        value={form.Month}
                        onChange={handleChange}
                        className="border p-3 rounded w-full mb-4"
                    />

                    <button
                        className="bg-purple-600 text-white px-6 py-3 rounded-lg"
                    >
                        Generate Salary
                    </button>

                </form>

                {/* TABLE */}
                <div className="bg-white p-6 rounded-xl shadow-md">

                    <table className="w-full border">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Employee</th>
                                <th className="border p-2">Department</th>
                                <th className="border p-2">Gross</th>
                                <th className="border p-2">Deduction</th>
                                <th className="border p-2">Net Salary</th>
                                <th className="border p-2">Month</th>
                            </tr>
                        </thead>

                        <tbody>

                            {salary.map(s => (
                                <tr key={s.SalaryID}>

                                    <td className="border p-2">
                                        {s.FirstName} {s.LastName}
                                    </td>

                                    <td className="border p-2">
                                        {s.DepartmentName}
                                    </td>

                                    <td className="border p-2">
                                        {s.GrossSalary}
                                    </td>

                                    <td className="border p-2">
                                        {s.TotalDeduction}
                                    </td>

                                    <td className="border p-2 font-bold text-green-600">
                                        {s.NetSalary}
                                    </td>

                                    <td className="border p-2">
                                        {s.Month}
                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Salary;