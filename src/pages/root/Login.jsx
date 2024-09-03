import React, { useState } from 'react';
import styles from '../../assets/css/Login.module.css';
import { Toaster, toast } from "sonner";
import authService from '../../services/auth.service';

function Login() {
    const [cdenf, setCdenf] = useState('');
    const [senha, setSenha] = useState('');
    const [redirectTo, setRedirectTo] = useState(null);

    let data = {
        cdenf: cdenf,
        senha: senha,
        redirectTo: redirectTo
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const buttonClicked = e.nativeEvent.submitter.value;
        if (buttonClicked === "Entrar") {
            try {
                let res = await authService.authenticate(data);
                console.log("Login", res.data);
                authService.setLoggedUser(res.data);
                setRedirectTo("/");
                
            } catch (error) {
                console.log("error", error);
                toast.error("Erro ao fazer login");
            }
        }
    }
    if(redirectTo){
       window.location.href = redirectTo;
    }
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
