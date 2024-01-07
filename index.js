const express = require("express");
const app = express();
const cors = require("cors");
require ("dotenv").config()
const stripe = require("stripe")(`${process.env.STRIPE_SECRET_KEY}`)

app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.post("/create-checkout-session", async (req, res) => {
    const {products} = req.body;

    const lineItems = products.map((product) => ({
        price_data: {
          currency: "RON",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price * 100,
        },
        quantity: product.quantity,
      }));
    
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        shipping_address_collection: {
          allowed_countries: ["RO", "US"],
        },
        phone_number_collection: {
          enabled: "true",
        },
        success_url: `${process.env.FRONTEND_URL}/successful-payment`,
        cancel_url: `${process.env.FRONTEND_URL}`,
      });

      res.json({id: session.id})
})

app.listen(PORT || 3000, () => {
    console.log('The server is running.')
})