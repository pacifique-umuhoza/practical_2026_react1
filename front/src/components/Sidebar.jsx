import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function Sidebar() {
     const navigate = useNavigate();

    const handleLogout = () => {

        // REMOVE TOKEN
        localStorage.removeItem('token');

        // GO TO LOGIN
        navigate('/login');
    };

    return (
        <div className="w-64 min-h-screen bg-gray-900 text-white p-5">

            <h1 className="text-3xl font-bold mb-10">
              welcome to   Smart Park
            </h1>

            <ul className="space-y-4">

                <li>
                    <Link
                        to="/employee"
                        className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
                    >
                        Employee
                    </Link>
                </li>

                <li>
                    <Link
                        to="/department"
                        className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
                    >
                        Department
                    </Link>
                </li>

                <li>
                    <Link
                        to="/salary"
                        className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
                    >
                        Salary
                    </Link>
                </li>
                <li>
                    <Link
                        to="/payroll"
                        className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
                    >
                        Report
                    </Link>
                </li>
                 <li>
                    <Link
                        to="/payslip"
                        className="block bg-gray-800 hover:bg-gray-700 px-4 py-3 rounded-lg"
                    >
                        Getbill
                    </Link>
                </li>
                

            </ul>
         {/* BOTTOM */}
            <div className="mt-auto p-5">

                <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-lg font-semibold duration-300"
                >
                    Logout
                </button>

            </div>


        </div>
    );
}

export default Sidebar;