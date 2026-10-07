import axios from 'axios';
import { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';

function Department() {

    const [form, setForm] = useState({
        DepartmentCode: '',
        DepartmentName: '',
        GrossSalary: '',
        TotalDeduction: ''
    });

    const [departments, setDepartments] = useState([]);

    const [editing, setEditing] = useState(false);

    const [currentId, setCurrentId] = useState('');

    // FETCH DATA
    const fetchDepartments = async () => {

        try {

            const res = await axios.get(
                'http://localhost:5000/departments'
            );

            setDepartments(res.data);

        } catch (error) {

            console.log(error.message);

        }
    };

    useEffect(() => {

        fetchDepartments();

    }, []);

    // HANDLE INPUT
    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    // ADD OR UPDATE
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await axios.put(
                    `http://localhost:5000/departments/${currentId}`,
                    form
                );

                alert('Department Updated');

            } else {

                await axios.post(
                    'http://localhost:5000/departments',
                    form
                );

                alert('Department Added');
            }

            setForm({
                DepartmentCode: '',
                DepartmentName: '',
                GrossSalary: '',
                TotalDeduction: ''
            });

            setEditing(false);

            fetchDepartments();

        } catch (error) {

            console.log(error);

        }
    };

    // DELETE
    const handleDelete = async (id) => {

        try {

            await axios.delete(
                `http://localhost:5000/departments/${id}`
            );

            alert('Department Deleted');

            fetchDepartments();

        } catch (error) {

            console.log(error);

        }
    };

    // EDIT
    const handleEdit = (dept) => {

        setForm(dept);

        setEditing(true);

        setCurrentId(dept.DepartmentCode);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Department Management
                </h1>

                {/* FORM */}
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-6 rounded-xl shadow-md mb-10"
                >

                    <div className="grid grid-cols-2 gap-5">

                        <input
                            type="text"
                            name="DepartmentCode"
                            placeholder="Department Code"
                            value={form.DepartmentCode}
                            onChange={handleChange}
                            disabled={editing}
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="text"
                            name="DepartmentName"
                            placeholder="Department Name"
                            value={form.DepartmentName}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            name="GrossSalary"
                            placeholder="Gross Salary"
                            value={form.GrossSalary}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                        />

                        <input
                            type="number"
                            name="TotalDeduction"
                            placeholder="Total Deduction"
                            value={form.TotalDeduction}
                            onChange={handleChange}
                            className="border p-3 rounded-lg"
                        />

                    </div>

                    <button
                        type="submit"
                        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                        {editing ? 'Update' : 'Add'} Department
                    </button>

                </form>

                {/* TABLE */}
                <div className="bg-white p-6 rounded-xl shadow-md">

                    <table className="w-full border">

                        <thead className="bg-gray-200">

                            <tr>

                                <th className="p-3 border">
                                    Code
                                </th>

                                <th className="p-3 border">
                                    Name
                                </th>

                                <th className="p-3 border">
                                    Gross Salary
                                </th>

                                <th className="p-3 border">
                                    Deduction
                                </th>

                                <th className="p-3 border">
                                    Actions
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {departments.map((dept) => (

                                <tr key={dept.DepartmentCode}>

                                    <td className="p-3 border">
                                        {dept.DepartmentCode}
                                    </td>

                                    <td className="p-3 border">
                                        {dept.DepartmentName}
                                    </td>

                                    <td className="p-3 border">
                                        {dept.GrossSalary}
                                    </td>

                                    <td className="p-3 border">
                                        {dept.TotalDeduction}
                                    </td>

                                    <td className="p-3 border space-x-2">

                                        <button
                                            onClick={() => handleEdit(dept)}
                                            className="bg-green-600 text-white px-4 py-2 rounded-lg"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => handleDelete(dept.DepartmentCode)}
                                            className="bg-red-600 text-white px-4 py-2 rounded-lg"
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

export default Department;