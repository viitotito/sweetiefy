const Home = () => {
    return (
        <div className="container py-5">
            <h1 className="fw-bold mb-4">Bem-vindo ao Sweetiefy 🎂</h1>

            <div className="card p-4 shadow-sm">
                <h5 className="mb-3">Home</h5>
                <p>Aqui você pode acessar ingredientes, receitas, configurações e muito mais.</p>

                <div className="mt-3">
                    <button className="btn btn-primary me-2">Minhas Receitas</button>
                    <button className="btn btn-secondary">Configurações</button>
                </div>
            </div>
        </div>
    );
};

export default Home;