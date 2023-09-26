import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function IniciarSesion() {
    const [emailLogin, setEmailLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [errorsLogin, setErrorsLogin] = useState('');

    const navigate = useNavigate();

    const login = e => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', {
            email: emailLogin,
            password: passwordLogin
        }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    setErrorsLogin(res.data.message);
                } else {
                    navigate("/crearsitio")
                }
            })
            .catch(err => console.log(err));

    }

    return (
        <div className='row'>
            <div className='col-8'></div>
            <h1>Bienvenido Nuevamente!</h1>
            <form onSubmit={login}>
                <div className='form-group'>
                    <label htmlFor="emailLogin">Email:</label>
                    <input type="email" name="emailLogin" id="emailLogin" className="form-control" value={emailLogin} onChange={(e) => setEmailLogin(e.target.value)}/>
                </div>
                <div>
                    <label htmlFor="passwordLogin">Contraseña:</label>
                    <input type="password" id="passwordLogin" className="form-control mb-3" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)}/>
                </div>
                <div>
                    {errorsLogin !== "" ? <span className='text-danger'>{errorsLogin}</span> : null}
                </div>
                <input type="submit" value="Iniciar Sesión" className='btn btn-primary' />
            </form>
        </div>
    );
}

export default IniciarSesion;