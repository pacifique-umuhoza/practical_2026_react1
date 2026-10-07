import axios from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {

    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const res = await axios.post(
                'http://localhost:5000/login',
                form
            );

            // SAVE TOKEN
            localStorage.setItem(
                'token',
                res.data.token
            );

            alert(res.data.message);

            navigate('/dashboard');

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                'Login failed'
            );
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">

                <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
                    Login
                </h1>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold duration-300"
                    >
                        Login
                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 ml-2 hover:underline"
                    >
                        Register
                    </Link>

                </p>

            </div>

        </div>
    );
}

export default Login;