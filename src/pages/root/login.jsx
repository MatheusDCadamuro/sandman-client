import React, { useState } from 'react';
import styles from '../../assets/css/Login.module.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // Lógica de autenticação aqui
        console.log('Cdenf:', username);
        console.log('Senha:', password);
    };

    return (
        <div className={styles.loginContainer}>
            <form onSubmit={handleSubmit} className={styles.loginForm}>
                <h2>Login</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="Cdenf">Cdenf:</label>
                    <input
                        type="text"
                        id="Cdenf"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Senha:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={styles.loginButton}>Entrar</button>
                <div className={styles.secondaryButton }>
                <button>Esqueci minha senha</button>
                <button>Ajuda</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
