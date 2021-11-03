const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {

    const { products, email } = req.body;
    const transformedItems = products.map(item => ({
        description: item.description,
        quantity: item.quantity,
        price_data: {
            currency: 'usd',
            unit_amount: item.price * 100,
            product_data: {
                name: item.title,
                images: [item.image]
            }
        }
  }));

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        shipping_rates: ['shr_1J856fF4TDOSFmXiDsw3yFtN'],
        shipping_address_collection: {
            allowed_countries: ['GB', 'US', 'CA']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/success_payment`,
        cancel_url: `${process.env.HOST}/fail_payment`,
        metadata: {
            email,
            images: JSON.stringify(products.map(item => item.image)),
        }
    });
  
    res.json({ id: session.id })
}