import express from "express";
import stripe from "stripe";
const router = express.Router();

const newStripe = new stripe(process.env.STRIPE_KEY);

router.post("/payment", (req, res) => {
  const { tokenId, amount } = req.body;
  console.log(req.body);
  newStripe.charges.create(
    {
      source: tokenId,
      amount: amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(404).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

export default router;
