const IngredienteCard = ({ ingrediente }) => {
  return (
    <div
      className="card shadow-sm p-3"
      style={{ width: "250px" }}
    >
      <h5>{ingrediente.nome}</h5>
      <p>Preço: R${Number(ingrediente.preco ?? 0).toFixed(2)}</p>
      <p>Métrica: {ingrediente.metrica}</p>
    </div>
  );
};

export default IngredienteCard;