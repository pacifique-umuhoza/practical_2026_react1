import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {

    const [employees, setEmployees] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [salary, setSalary] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        try {

            const emp = await axios.get("http://localhost:5000/employees");
            const dep = await axios.get("http://localhost:5000/departments");
            const sal = await axios.get("http://localhost:5000/salary");

            setEmployees(emp.data);
            setDepartments(dep.data);
            setSalary(sal.data);

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">

            <Sidebar />

            <div className="flex-1 p-10">

                {/* HEADER */}
                <h1 className="text-4xl font-bold text-gray-800 mb-2">
                    SmartPark 
                </h1>

                <p className="text-gray-600 mb-8">
                    Employee Payroll Management System Overview
                </p>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Employees */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
                        <h2 className="text-xl font-bold text-gray-700">
                            Employees
                        </h2>
                        <p className="text-3xl font-bold text-blue-600 mt-2">
                            {employees.length}
                        </p>
                    </div>

                    {/* Departments */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
                        <h2 className="text-xl font-bold text-gray-700">
                            Departments
                        </h2>
                        <p className="text-3xl font-bold text-green-600 mt-2">
                            {departments.length}
                        </p>
                    </div>

                    {/* Payroll Records */}
                    <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
                        <h2 className="text-xl font-bold text-gray-700">
                            Payroll Records
                        </h2>
                        <p className="text-3xl font-bold text-purple-600 mt-2">
                            {salary.length}
                        </p>
                    </div>

                </div>

                {/* INFO SECTION */}
                <div className="mt-10 bg-white p-8 rounded-xl shadow-md">

                    <h2 className="text-2xl font-bold mb-4 text-gray-800">
                        Welcome to SmartPark System 
                    </h2>

                   
                    <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="bg-blue-50 p-4 rounded-lg">
                            <h3 className="font-bold text-blue-700">Perform Well</h3>
                            <p className="text-sm text-gray-400">
                                Automates payroll generation and reduces errors.
                            </p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg">
                            <h3 className="font-bold text-green-700"> Data Security</h3>
                            <p className="text-sm text-gray-400">
                                Employee records are safely stored in database.
                            </p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h3 className="font-bold text-purple-700">Reports for all schedule</h3>
                            <p className="text-sm text-gray-600">
                                Generate monthly payroll reports instantly.
                            </p>
                        </div>




                        <div className="bg-yellow-50 p-4 rounded-lg">
                            <h3 className="font-bold text-yellow-700"> Easy Management</h3>
                            <p className="text-sm text-gray-600">
                                Manage employees, departments, and salary in one system.
                            </p>
                        </div>
                        
                    </div>
                    

                </div>
                <div className="mt-10 bg-gray-500 p-8 rounded-xl shadow-md">
                            <p className="font-bold text-black-500 text-sm">@UBARUTA Agnes 2026</p>
                            <p className="">ubarutaagnes4@gmail.com</p> fast Rwanda
                        </div>


            </div>

        </div>
    );
}

export default Dashboard;