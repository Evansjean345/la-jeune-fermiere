import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginAdminUrl} from '../url';
import axios from 'axios';
import { Link } from 'react-router-dom'
const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogin = async () => {
    let response;

    // Première tentative avec loginAdminUrl
    try {
      response = await axios.post(loginAdminUrl, {
        username: username,
        password: password,
      });
      console.log("Admin login success:", response.data);

      // Si la connexion admin est réussie
      if (response?.data?.token) {
        window.localStorage.setItem('adminAccess', JSON.stringify(
          {
            token: response?.data?.token,
            
          }
        ));
        return navigate('/dashboard/accueil');
      }
    } catch (err) {
      setError('Erreur de connexion. Veuillez vérifier vos identifiants.');
    }
  };
  return (
    <>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex flex-col rounded-2xl shadow-lg max-w-3xl w-full p-5 items-center">

          {/* Tabs */}
          <div className='flex'>
            <div className="md:w-1/2 w-full px-8 md:px-16">
              <h2 className="font-bold text-2xl text-[#002D74] text-center">CONNEXION</h2>
             
              <form action="" className="flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                {error !== '' &&
                  (
                    <div className="mt-3 text-xs flex justify-between items-center text-red-700">
                      <p>{error}</p>
                    </div>
                  )
                }
                <input
                  className="p-2 mt-8 rounded-xl border"
                  type="text"
                  name="username"
                  placeholder="Nom d'utilisateur"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className="relative">
                  <input
                    className="p-2 rounded-xl border w-full"
                    type={show ? "text" : "password"}
                    name="password"
                    placeholder="Mot de passe"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    fill="gray"
                    className={show ? "bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" : "bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"}
                    viewBox="0 0 16 16"
                    onClick={(e) => setShow(!show)}
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
                <button type='submit' className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">
                  Connexion
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OU</p>
                <hr className="border-gray-400" />
              </div>

              <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
                <p>Voulez vous commander un article?</p>
                <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">
                  <Link to={"/"}>
                    Faire une commande
                  </Link>
                </button>
              </div>
            </div>

            {/* image */}
            <div className="md:block hidden w-1/2">
              <img
                className="rounded-2xl"
                src="/images/login.jpg"
              />
            </div>
          </div>
          {/* form */}


          {/* Copyright */}
          <div className="mt-auto text-center text-sm text-gray-500 w-full">
            © 2024 CSN. Tout droit réservé.
          </div>
        </div>
      </section>

    </>
  );
};

export default Login;