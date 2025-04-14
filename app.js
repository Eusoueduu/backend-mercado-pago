// Substitua 'YOUR_PUBLIC_KEY' pela sua chave pública real do Mercado Pago
// A linha abaixo não é mais necessária se você for redirecionar automaticamente
// const mp = new MercadoPago('YOUR_PUBLIC_KEY', { locale: "pt-BR" });

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        const orderData = {
            title: "formulario",
            quantity: 1,
            price: 5,
        };

        const response = await fetch("http://localhost:3000/create_preference", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderData),
        });

        const preference = await response.json();

        // ✅ Redireciona automaticamente para o checkout
        window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${preference.id}`;

    } catch (error) {
        console.error("Erro ao criar preferência:", error);
        alert("Erro ao iniciar pagamento.");
    }
});
