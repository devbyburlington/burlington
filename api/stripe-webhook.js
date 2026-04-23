const crypto = require('crypto');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Read raw body
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const rawBody = Buffer.concat(chunks).toString('utf8');

  // Verify signature
  const sig = req.headers['stripe-signature'];
  if (!sig) {
    return res.status(400).json({ error: 'No signature' });
  }

  try {
    const elements = sig.split(',').reduce((acc, item) => {
      const [key, value] = item.split('=');
      acc[key] = value;
      return acc;
    }, {});

    const timestamp = elements.t;
    const expectedSig = elements.v1;

    const signedPayload = timestamp + '.' + rawBody;
    const computedSig = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(signedPayload)
      .digest('hex');

    if (!crypto.timingSafeEqual(Buffer.from(expectedSig), Buffer.from(computedSig))) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Reject if timestamp older than 5 minutes
    if (Math.abs(Date.now() / 1000 - parseInt(timestamp)) > 300) {
      return res.status(400).json({ error: 'Timestamp too old' });
    }

    const event = JSON.parse(rawBody);

    if (event.type === 'checkout.session.completed') {
      // Payment confirmed — log or process as needed
      return res.status(200).json({ received: true });
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    return res.status(400).json({ error: 'Webhook error' });
  }
};
