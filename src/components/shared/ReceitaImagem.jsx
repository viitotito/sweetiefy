import { useState } from "react";

const ReceitaImagem = ({ url, nome }) => {
  const [imagemValida, setImagemValida] = useState(true);

  return (
    <div
      style={{
        width: "80px",
        height: "80px",
        borderRadius: "50%",
        margin: "0 auto 10px",
        overflow: "hidden",
        backgroundColor: "#e0e0e0",
      }}
    >
      {url && imagemValida && (
        <img
          src={url}
          alt={nome}
          onError={() => setImagemValida(false)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      )}
    </div>
  );
};

export default ReceitaImagem;