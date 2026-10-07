import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

function Employee() {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);

    const [phoneError, setPhoneError] = useState("");

    const [form, setForm] = useState({
        FirstName: '',
        LastName: '',
        Position: '',
        Address: '',
        Telephone: '',
        Gender: '',
        HiredDate: '',
        DepartmentCode: ''
    });

    const [editing, setEditing] = useState(false);
    const [editId, setEditId] = useState(null);

    // ================= PHONE VALIDATION =================
    const validatePhone = (phone) => {

        // Allowed formats:
        // 07XXXXXXXX
        // 2507XXXXXXXX
        // +2507XXXXXXXX

        const phoneRegex = /^(07|2507|\+2507)[0-9]{8}$/;
        return phoneRegex.test(phone);
    };

    // ================= FETCH EMPLOYEES =================
    const fetchEmployees = async () => {
        try {
            const res = await axios.get('http://localhost:5000/employees');
            setEmployees(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    // ================= FETCH DEPARTMENTS =================
    const fetchDepartments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/departments');
            setDepartments(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmployees();
        fetchDepartments();
    }, []);

    // ================= HANDLE INPUT =================
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value
        });

        // LIVE PHONE VALIDATION
        if (name === "Telephone") {
            if (!validatePhone(value)) {
                setPhoneError("Invalid phone number format");
            } else {
                setPhoneError("");
            }
        }
    };

    // ================= ADD / UPDATE =================
    const handleSubmit = async (e) => {
        e.preventDefault();

        // FINAL VALIDATION BEFORE SEND
        if (!validatePhone(form.Telephone)) {
            alert("Invalid phone number! Use 07XXXXXXXX or +2507XXXXXXXX");
            return;
        }

        try {

            if (editing) {
                await axios.put(
                    `http://localhost:5000/employees/${editId}`,
                    form
                );

                alert('Employee Updated Successfully');

            } else {
                await axios.post(
                    'http://localhost:5000/employees',
                    form
                );

                alert('Employee Added Successfully');
            }

            setForm({
                FirstName: '',
                LastName: '',
                Position: '',
                Address: '',
                Telephone: '',
                Gender: '',
                HiredDate: '',
                DepartmentCode: ''
            });

            setEditing(false);
            setEditId(null);
            setPhoneError("");

            fetchEmployees();

        } catch (error) {
            console.log("error", error);
        }
    };

    // ================= DELETE =================
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/employees/${id}`);
            alert('Employee Deleted');
            fetchEmployees();
        } catch (error) {
            console.log(error);
        }
    };

    // ================= EDIT =================
    const handleEdit = (emp) => {
        setForm({
            FirstName: emp.FirstName,
            LastName: emp.LastName,
            Position: emp.Position,
            Address: emp.Address,
            Telephone: emp.Telephone,
            Gender: emp.Gender,
            HiredDate: emp.HiredDate,
            DepartmentCode: emp.DepartmentCode
        });

        setEditing(true);
        setEditId(emp.EmployeeNumber);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Employee Management
                </h1>

                {/* ================= FORM ================= */}
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md mb-10">

                    <div className="grid grid-cols-2 gap-4">

                        <input
                            name="FirstName"
                            value={form.FirstName}
                            onChange={handleChange}
                            placeholder="Enter First Name"
                            className="border p-3 rounded"
                        />

                        <input
                            name="LastName"
                            value={form.LastName}
                            onChange={handleChange}
                            placeholder="Enter Last Name"
                            className="border p-3 rounded"
                        />

                        <input
                            name="Position"
                            value={form.Position}
                            onChange={handleChange}
                            placeholder="Enter Position"
                            className="border p-3 rounded"
                        />

                        <input
                            name="Address"
                            value={form.Address}
                            onChange={handleChange}
                            placeholder="Enter Address"
                            className="border p-3 rounded"
                        />

                        {/* PHONE */}
                        <div>
                            <input
                                name="Telephone"
                                value={form.Telephone}
                                onChange={handleChange}
                                placeholder="Enter Phone Number"
                                className="border p-3 rounded w-full"
                            />

                            {/* validation message */}
                            {phoneError && (
                                <p className="text-red-500 text-sm">
                                    {phoneError}
                                </p>
                            )}
                        </div>

                        <select
                            name="Gender"
                            value={form.Gender}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>

                        <input
                            type="date"
                            name="HiredDate"
                            value={form.HiredDate}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        />

                        <select
                            name="DepartmentCode"
                            value={form.DepartmentCode}
                            onChange={handleChange}
                            className="border p-3 rounded"
                        >
                            <option value="">Select Department</option>

                            {departments.map(dep => (
                                <option
                                    key={dep.DepartmentCode}
                                    value={dep.DepartmentCode}
                                >
                                    {dep.DepartmentName}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button
                        type="submit"
                        className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
                    >
                        Save Employee
                    </button>

                </form>

                {/* ================= TABLE ================= */}
                <div className="bg-white p-6 rounded-xl shadow-md">

                    <table className="w-full border">

                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Position</th>
                                <th className="border p-2">Department</th>
                                <th className="border p-2">Phone</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {employees.map(emp => (
                                <tr key={emp.EmployeeNumber}>

                                    <td className="border p-2">
                                        {emp.FirstName} {emp.LastName}
                                    </td>

                                    <td className="border p-2">
                                        {emp.Position}
                                    </td>

                                    <td className="border p-2">
                                        {emp.DepartmentName}
                                    </td>

                                    <td className="border p-2">
                                        {emp.Telephone}
                                    </td>

                                    <td className="border p-2 space-x-2">

                                        <button
                                            onClick={() => handleEdit(emp)}
                                            className="bg-green-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(emp.EmployeeNumber)}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>

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

export default Employee;