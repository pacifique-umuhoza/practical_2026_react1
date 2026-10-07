import axios from 'axios';
import { useEffect, useState } from 'react';

import Sidebar from '../components/Sidebar';

function Payslip() {

    const [employees, setEmployees] = useState([]);
    const [employeeId, setEmployeeId] = useState('');
    const [month, setMonth] = useState('');
    const [data, setData] = useState(null);

    // FETCH EMPLOYEES
    useEffect(() => {

        fetchEmployees();

    }, []);

    const fetchEmployees = async () => {

        try {

            const res = await axios.get(
                'http://localhost:5000/employees'
            );

            setEmployees(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    // GENERATE PAYSLIP
    const generatePayslip = async () => {

        if (!employeeId || !month) {

            alert("Please select employee and month");

            return;
        }

        try {

            const res = await axios.get(
                `http://localhost:5000/payslip/${employeeId}/${month}`
            );

            setData(res.data);

        } catch (error) {

            alert(error.response?.data?.message || "Error");
        }
    };

    // PRINT FUNCTION
    const handlePrint = () => {

        window.print();
    };

    return (

        <div className="flex min-h-screen bg-gray-100">

            {/* SIDEBAR */}
            <Sidebar />

            {/* CONTENT */}
            <div className="flex-1 p-10">

                <h1 className="text-3xl font-bold mb-6">
                    Employee Payslip
                </h1>

                {/* FORM */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex flex-wrap gap-4">

                    {/* EMPLOYEE SELECT */}
                    <select
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        className="border p-3 rounded w-64"
                    >

                        <option value="">
                            Select Employee
                        </option>

                        {employees.map((emp) => (

                            <option
                                key={emp.EmployeeNumber}
                                value={emp.EmployeeNumber}
                            >
                                {emp.FirstName} {emp.LastName}
                            </option>

                        ))}

                    </select>

                    {/* MONTH */}
                    <input
                        type="month"
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border p-3 rounded"
                    />

                    {/* BUTTON */}
                    <button
                        onClick={generatePayslip}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded"
                    >
                        Generate Payslip
                    </button>

                </div>

                {/* PAYSLIP */}
                {data && (

                    <div className="bg-white p-8 rounded-xl shadow-md max-w-2xl">

                        <div className="flex justify-between items-center mb-6">

                            <div>
                                <h2 className="text-2xl font-bold">
                                    SmartPark Payslip
                                </h2>

                                <p className="text-gray-500">
                                    Employee Salary Report
                                </p>
                            </div>

                            <button
                                onClick={handlePrint}
                                className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded"
                            >
                                Print
                            </button>

                        </div>

                        <hr className="mb-6" />

                        {/* EMPLOYEE DETAILS */}
                        <div className="grid grid-cols-2 gap-4 mb-6">

                            <div>
                                <p className="font-semibold">
                                    First Name
                                </p>

                                <p>{data.FirstName}</p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Last Name
                                </p>

                                <p>{data.LastName}</p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Position
                                </p>

                                <p>{data.Position}</p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Department
                                </p>

                                <p>{data.DepartmentName}</p>
                            </div>

                            <div>
                                <p className="font-semibold">
                                    Month
                                </p>

                                <p>{data.Month}</p>
                            </div>

                        </div>

                        <hr className="mb-6" />

                        {/* SALARY DETAILS */}
                        <div className="space-y-4">

                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    Gross Salary
                                </span>

                                <span>
                                    {data.GrossSalary} RWF
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-semibold">
                                    Total Deduction
                                </span>

                                <span>
                                    {data.TotalDeduction} RWF
                                </span>
                            </div>

                            <div className="flex justify-between text-xl font-bold text-green-600 border-t pt-4">
                                <span>
                                    Net Salary
                                </span>

                                <span>
                                    {data.NetSalary} RWF
                                </span>
                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>
    );
}

export default Payslip;