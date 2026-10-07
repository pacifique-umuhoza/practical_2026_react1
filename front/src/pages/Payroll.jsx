import axios from 'axios';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';

function Payroll() {

    const [month, setMonth] = useState('');
    const [data, setData] = useState([]);

    const fetchPayroll = async () => {

        if (!month) return alert("Select month");

        const res = await axios.get(
            `http://localhost:5000/payroll/${month}`
        );

        setData(res.data);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Monthly Payroll Report
                </h1>

                {/* FILTER */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-6">

                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border p-3 rounded mr-4"
                    />

                    <button
                        onClick={fetchPayroll}
                        className="bg-blue-600 text-white px-6 py-3 rounded"
                    >
                        Generate Report
                    </button>

                </div>

                {/* TABLE */}
                <div className="bg-white p-6 rounded-xl shadow-md">

                    <table className="w-full border">

                        <thead className="bg-gray-200">

                            <tr>
                                <th className="border p-2">First Name</th>
                                <th className="border p-2">Last Name</th>
                                <th className="border p-2">Position</th>
                                <th className="border p-2">Department</th>
                                <th className="border p-2">Net Salary</th>
                                <th className="border p-2">Month</th>
                            </tr>

                        </thead>

                        <tbody>

                            {data.map((item, index) => (
                                <tr key={index}>

                                    <td className="border p-2">
                                        {item.FirstName}
                                    </td>

                                    <td className="border p-2">
                                        {item.LastName}
                                    </td>

                                    <td className="border p-2">
                                        {item.Position}
                                    </td>

                                    <td className="border p-2">
                                        {item.DepartmentName}
                                    </td>

                                    <td className="border p-2 font-bold text-green-600">
                                        {item.NetSalary}
                                    </td>

                                    <td className="border p-2">
                                        {item.Month}
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

export default Payroll;