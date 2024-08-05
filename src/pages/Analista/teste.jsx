import React from 'react';
import logo from '../../assets/images/Logo.png';

const divStyle = {
    color: 'blue',
    background: 'red',
  };

const ModificarAnalista = () => (
    <>
        <title>Modificar Analista</title>
        <meta charSet="utf-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
        />

        <img src={logo} alt="imagem" />

        <link rel="stylesheet" href="assets/css/main.css" />
        <noscript>
            &lt;link rel="stylesheet" href="assets/css/noscript.css" /&gt;
        </noscript>
        {/* Wrapper */}
        <div id="wrapper">
            {/* Header */}
            <header id="header">
                <div className="inner">
                    {/* Logo */}
                    <a href="index.html" className="logo">
                        <span className="symbol">
                            <img src="/assets/images/Logo.png" alt="" />
                        </span>
                        <span className="title">Sandman</span>
                    </a>
                    {/* Nav */}
                    <nav>
                        <ul>
                            <li>
                                <a href="#menu">Menu</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            {/* Menu */}
            <nav id="menu" style={divStyle}>
                <h2>Menu</h2>
                <ul>
                    <li>
                        <a href="Analista.html">Modificar Analista</a>
                    </li>
                    <li>
                        <a href="Paciente.html">Adicionar Exame</a>
                    </li>
                    <li>
                        <a href="generic.html">Procurar Laudo</a>
                    </li>
                    <li>
                        <a href="elements.html">Ajuda</a>
                    </li>
                </ul>
            </nav>
            {/* Main */}
            <div id="main">
                <div className="inner">
                    <h1>Analista</h1>
                    {/* <span class="image main"><img src="images/pic13.jpg" alt="" /></span> */}
                    <p /> Bem-vindo à nossa página dedicada à gestão de analistas. Aqui,
                    você tem o controle total para adicionar ou remover novos analistas
                    conforme necessário. esta página foi projetada para facilitar esse
                    processo. Sinta-se à vontade para realizar as alterações necessárias e
                    garantir que sua equipe esteja sempre atualizada.
                    <p />
                </div>
            </div>
            <footer id="footer">
                <div className="inner">
                    {/* Form */}
                    <section>
                        <h2>Dados Analista</h2>
                        <form method="post" action="#">
                            <div className="row gtr-uniform background-color-red">
                                <div className="col-12">
                                    <textarea
                                        type="text"
                                        name="demo-Nome"
                                        id="demo-Nome"
                                        placeholder="Nome"
                                        rows={6}
                                        defaultValue={""}
                                    />
                                </div>
                                <div className="col-6 col-12-xsmall">
                                    <input
                                        type="text"
                                        name="demo-CDEnf"
                                        id="demo-CDEnf"
                                        defaultValue=""
                                        placeholder="CDEnf"
                                    />
                                </div>
                                <div className="col-6 col-12-xsmall">
                                    <input
                                        type="email"
                                        name="demo-email"
                                        id="demo-email"
                                        defaultValue=""
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="col-6 col-12-xsmall">
                                    <input
                                        type="password"
                                        name="demo-senha"
                                        id="demo-senha"
                                        defaultValue=""
                                        placeholder="Senha"
                                    />
                                </div>
                                <div className="col-6 col-12-xsmall">
                                    <input
                                        type="password"
                                        name="demo-senha"
                                        id="demo-senha"
                                        defaultValue=""
                                        placeholder="Confirmar Senha"
                                    />
                                </div>
                                <div className="col-6 col-12-small">
                                    <input type="checkbox" id="demo-copy" name="demo-copy" />
                                    <label htmlFor="demo-copy">Administrador</label>
                                </div>
                                <div className="col-12">
                                    <ul className="actions">
                                        <li>
                                            <input
                                                type="submit"
                                                defaultValue="Cadastrar"
                                                className="primary"
                                            />
                                        </li>
                                        <li>
                                            <input
                                                type="submit"
                                                defaultValue="Editar"
                                                className="primary"
                                            />
                                        </li>
                                        <li>
                                            <input type="submit" defaultValue="Excluir" />
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </footer>
        </div>
        {/* Scripts */}
    </>
);

export default ModificarAnalista;
