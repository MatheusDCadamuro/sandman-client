// Importanto biblioteca responsável por requisições HTTP
import axios from 'axios';

// Definindo a base do url para os endpoints
const apiUrl = "http://localhost:3000/analista/login";

// Definindo o bjeto do serviço
const authService = {

    // Definindo a função de login
    async authenticate(data) {
        const endpoint = `${apiUrl}`
        return axios.post(endpoint, data);
    },

    // Função para salar o usuário logado no local storage
    setLoggedUser(data){
        let parsedData = JSON.stringify(data.token);
        console.log("parsedData", parsedData)
        localStorage.setItem("user", parsedData);
    },

    // Função responsável por recuperar o usuário logado do local storage
    getLoggedUser(){
        let data = localStorage.getItem("user");
        if(!data) return null;
        try {
            let parsedData = JSON.parse(data.token)
            return parsedData
        } catch (error) {
            console.log(error)
            return null
        }
    }
}
// try {
//     const response = await fetch('http://localhost:3000/agente/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ cdenf, senha }),
//     });

//     if (response.ok) {
//         const result = await response.json();
//         console.log('Login bem-sucedido:', result);
//         setToken(result.token);
//         toast.success("Login bem-sucedido!");
//     } else {
//         console.error('Erro ao fazer login');
//         toast.error("Erro ao fazer login");
//     }

// } catch (error) {
//     toast.error("Erro ao enviar dados");
//     console.error('Erro ao enviar dados:', error);
// }
export default authService;