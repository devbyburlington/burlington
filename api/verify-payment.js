const crypto = require('crypto');

module.exports = async (req, res) => {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://burlingtonconsult.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  // Rate limit: reject if no session_id or wrong format
  const sessionId = req.query.session_id;
  if (!sessionId || !sessionId.startsWith('cs_') || sessionId.length > 200) {
    return res.status(400).json({ valid: false, reason: 'Invalid session' });
  }

  // Read Stripe key from environment variable
  const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  if (!STRIPE_SECRET_KEY) {
    return res.status(500).json({ valid: false, reason: 'Server configuration error' });
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/checkout/sessions/' + sessionId, {
      headers: {
        'Authorization': 'Basic ' + Buffer.from(STRIPE_SECRET_KEY + ':').toString('base64')
      }
    });

    if (!response.ok) {
      return res.status(200).json({ valid: false, reason: 'Session not found' });
    }

    const session = await response.json();

    if (session.payment_status === 'paid') {
      return res.status(200).json({
        valid: true,
        email: session.customer_details?.email || null
      });
    } else {
      return res.status(200).json({ valid: false, reason: 'Not paid' });
    }
  } catch (err) {
    return res.status(500).json({ valid: false, reason: 'Verification failed' });
  }
};
