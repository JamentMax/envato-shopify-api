export default async function handler(req, res) {
  const auth = Buffer.from("videosuper-rewcfj2f:vSLKN0vdGXroKFqWtP84MdZGAOr1sErg").toString("base64");

  // 1. Ottieni token
  const tokenRes = await fetch("https://api.envato.com/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ "grant_type": "client_credentials" })
  });

  const tokenData = await tokenRes.json();
  const accessToken = tokenData.access_token;
  console.log("Access Token:", accessToken);
  // 2. Ottieni lista video da Envato
  const query = req.query.q || "promo"; // parola chiave
  const videoRes = await fetch(`https://api.envato.com/v1/discovery/search/search/item?q=${query}&site=elements&category=video`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const videoData = await videoRes.json();
  res.status(200).json(videoData);
}