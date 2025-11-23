import NavbarLogged from "../../components/shared/NavbarLogged";

const Home = () => {
    return (
        <>
            <NavbarLogged />

            <div className="container py-4 py-md-5">

                <h1 className="fw-bold mb-4 text-center text-md-start">
                    Bem-vindo ao Sweetiefy 🎂
                </h1>

                <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: "600px" }}>
                    <h5 className="mb-3 text-center text-md-start">Home</h5>
                    <p className="text-center text-md-start">
                        Aqui você pode acessar ingredientes, receitas, configurações e muito mais.
                    </p>
                    <div className="mt-3 d-flex flex-column flex-sm-row justify-content-center justify-content-md-start">
                        <button className="btn btn-primary mb-2 mb-sm-0 me-sm-2">
                            Minhas Receitas
                        </button>
                        <button className="btn btn-secondary">
                            Configurações
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Home;
