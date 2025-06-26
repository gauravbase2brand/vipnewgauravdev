import axios from 'axios';
import crypto from 'crypto';

function hashData(data) {
  return data ? crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex') : null;
}

export async function POST(req) {
  try {
    const { eventName, eventId, emails, phones, firstName, lastName, country, userAgent, sourceUrl, products, value, currency } = await req.json();
    // Safely parse total value
    const valueParsed = value ? parseFloat(value.replace(/,/g, '')) : 0;
    // Map product details safely
    const contents = products.map((product) => ({
      id: (product.sku || product.productid || "").toString(),
      title: product.productname || "",
      quantity: product.quantity || 1,
      item_price: product.item_price || parseFloat((product.unit_price || "0").replace(/,/g, "")),
    }));

    const fbPayload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          user_data: {
            em: emails ? [hashData(emails)] : [],
            ph: phones ? [hashData(phones)] : [],
            fn: firstName ? hashData(firstName) : null,
            ln: lastName ? hashData(lastName) : null,
            country: country ? hashData(country) : null,
            client_user_agent: userAgent,
            client_ip_address: req.headers.get('x-forwarded-for') || req.ip || null,
          },
          custom_data: {
            currency: currency || "INR",
            value: valueParsed,
            contents,
            content_type: "product",
          },
          action_source: "website",
          event_source_url: sourceUrl,
          event_id: eventId,
        },
      ],
      access_token: process.env.FB_ACCESS_TOKEN,  // Use your Facebook Access Token here
    };

    const pixel_id = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    const fbResponse = await axios.post(`https://graph.facebook.com/v18.0/${pixel_id}/events`, fbPayload);
      // This should now log the response data

    return new Response(JSON.stringify(fbResponse.data), { status: fbResponse.status });
  } catch (error) {
    console.error('Error in Facebook API Request:', error.message);
    console.error('Error details:', error.response ? error.response.data : 'No response data');
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}