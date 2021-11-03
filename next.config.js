module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com', 'graph.facebook.com', 'lh3.googleusercontent.com']
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLICK_KEY
  }
}
