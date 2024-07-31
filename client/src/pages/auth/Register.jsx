import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8080/api/register', formData);
      console.log(res.data);
      navigate('/home');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/homebg.jpg')" }}>
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute top-4 right-4">
        <Link to="/login-admin" className="px-4 py-2 border rounded-md text-white backdrop-blur-sm hover:bg-white hover:text-black transition 200">Admin Page</Link>
      </div>

      <motion.div
        initial={{ opacity: 0, x: "-100vw" }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="relative flex flex-col items-center justify-center w-[400px] max-w-md p-8 bg-opacity-10 border border-white rounded-lg backdrop-blur-sm">
          <h1 className="mb-6 text-2xl font-bold text-white">Register</h1>
          <form className="w-full space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-white">Username</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={onChange}
                className="w-full px-4 py-2 mt-1 text-white bg-black bg-opacity-30 border border-white rounded focus:outline-none focus:ring-2 focus:ring-slate-50 focus:border-transparent"
                placeholder="Enter your username"
              />
            </div>
            <div>
              <label className="block text-white">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={onChange}
                className="w-full px-4 py-2 mt-1 text-white bg-black bg-opacity-30 border border-white rounded focus:outline-none focus:ring-2 focus:ring-slate-50 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChange}
                className="w-full px-4 py-2 mt-1 mb-3 text-white bg-black bg-opacity-30 border border-white rounded focus:outline-none focus:ring-2 focus:ring-slate-50 focus:border-transparent"
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white border rounded hover:bg-white/50 transition 200 hover:border-3 shadow-inner"
            >
              Register
            </button>
          </form>
          <p className="mt-4 text-white">
            Already have an account? <Link to="/login" className="text-blue-400">Login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
