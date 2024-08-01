import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setAdminToken } from '../../store/reducers/authReducer';
import { useAuthLoginMutation } from '../../store/services/authService'; 

const Adminlogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState([]);
  const [login, response] = useAuthLoginMutation();

  const handleInputs = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const AdminLoginFunction = (e) => {
    e.preventDefault();
    login(state);
  };

  useEffect(() => {
    if (response.isSuccess) {
      localStorage.setItem('admin-token', response.data.token);
      dispatch(setAdminToken(response.data.token));
      navigate('/admin');
    } else if (response.isError) {
      setErrors(response.error.data.errors || []);
      console.log(response.error);
    }
  }, [response, dispatch, navigate]);

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/homebg.jpg')" }}>
      <div className="absolute top-4 right-4">
        <Link to="/login" className="px-4 py-2 border rounded-md text-white backdrop-blur-sm hover:bg-white hover:text-black transition 200">User Page</Link>
      </div>

      <motion.div initial={{ opacity: 0, x: "-100vw" }} animate={{ opacity: 1, x: 0 }}>
        <div className="relative flex flex-col items-center justify-center w-[400px] max-w-md p-8 bg-opacity-10 border border-white rounded-lg backdrop-blur-sm">
          <h1 className="mb-6 text-2xl font-bold text-white">Admin Login</h1>
          <form className="w-full space-y-4" onSubmit={AdminLoginFunction}>
            <div>
              <label className="block text-white">Email</label>
              <input
                type="text"
                name="email"
                className="w-full px-4 py-2 mt-1 text-white bg-black bg-opacity-30 border border-white rounded focus:outline-none focus:ring-2 focus:ring-slate-50 focus:border-transparent"
                onChange={handleInputs}
                value={state.email}
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label className="block text-white">Password</label>
              <input
                type="password"
                name="password"
                className="w-full px-4 py-2 mt-1 mb-3 text-white bg-black bg-opacity-30 border border-white rounded focus:outline-none focus:ring-2 focus:ring-slate-50 focus:border-transparent"
                onChange={handleInputs}
                value={state.password}
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-bold text-white border rounded hover:bg-white/50 transition 200 hover:border-3 shadow-inner"
            >
              Login
            </button>
          </form>
          {errors.length > 0 && (
            <div className="mt-4 text-red-500">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <p className="mt-4 text-white">
            If you are not Admin? <Link to="/contact" className="text-blue-400">Contact us</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Adminlogin;
