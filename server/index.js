import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

// Configuração do client do Mercado Pago com sua chave de acesso
const client = new MercadoPagoConfig({
  accessToken: 'APP_USR-2401450604458042-012510-afdfa76a0844602d4ed87d9f3ea31d4b-243542755'
});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("sou um servidor :) ");
});

app.post("/create_preference", async (req, res) => {
  try {
    // Monta o objeto de preferência com os dados enviados no body da requisição
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: "BRL" // Código ISO 4217 para Real Brasileiro
        }
      ],
      back_urls: {
        success: "http://localhost:5500/formulariopro.html",
        pending: "http://localhost:5500/pendente.html",
        failure: "http://localhost:5500/falha.html"
      },
      auto_return: "approved"
    };

    // Cria a preferência utilizando a SDK do Mercado Pago
    const preference = new Preference(client);
    const result = await preference.create({ body });

    // Retorna o ID da preferência para o front-end
    res.json({
      id: result.id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "erro ao criar preferencia"
    });
  }
});

app.listen(port, () => {
  console.log(`O servidor está funcionado na porta ${port}`);
});
