import React, { useState } from 'react';
import styles from '../../assets/css/Login.module.css';
import { Toaster, toast } from "sonner";
import { Link } from 'react-router-dom';

function Login() {
    const [cdenf, setCdenf] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const buttonClicked = e.nativeEvent.submitter.value;
        if (buttonClicked === "Entrar") {
            try {
                const response = await fetch('http://localhost:3000/agente/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ cdenf, senha }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Login bem-sucedido:', result);
                    toast.success("Login bem-sucedido!");
                } else {
                    console.error('Erro ao fazer login');
                    toast.error("Erro ao fazer login");
                }
                <Link to="/analista" />;
            } catch (error) {
                toast.error("Erro ao enviar dados");
                console.error('Erro ao enviar dados:', error);
            }
        }
    };

    return (
        <div className={styles.loginContainer}>
            <Toaster richColors />
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="cdenf">Cdenf:</label>
                    <input
                        type="text"
                        id="cdenf"
                        value={cdenf}
                        onChange={(e) => setCdenf(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </div>

                <input
                    type="submit"
                    value="Entrar"
                    className={styles.primaryButton}
                />
            </form>
        </div>
    );
}

export default Login;
