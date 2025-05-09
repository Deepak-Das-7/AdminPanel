import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners"; // Import the spinner component
import { useAuth } from "../hooks/useAuth";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("das1@gmail.com");
    const [password, setPassword] = useState("Testing");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); // Add loading state
    const { login } = useAuth(); // Get the login function from context


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true); // Set loading to true when starting the login request
        try {
            const res = await axios.post("https://dech.onrender.com/auth/login", {
                email,
                password,
            });
            login(res.data.data.token, res.data.data.user);

            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Login failed");
        } finally {
            setLoading(false); // Set loading to false after the request is finished
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200">
            <motion.form
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Admin Login</h2>

                {error && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm"
                    >
                        {error}
                    </motion.div>
                )}

                {/* Show loader when logging in */}
                {loading ? (
                    <div className="flex justify-center items-center mb-4">
                        <ClipLoader
                            size={50}
                            color="#4fa94d"
                            loading={loading}
                        />
                    </div>
                ) : (
                    <>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-medium mb-1 text-gray-600">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-all shadow-md"
                        >
                            Login
                        </button>
                    </>
                )}
            </motion.form>
        </div>
    );
};

export default Login;
