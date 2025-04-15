export default async function handler(req, res) {
  const auth = Buffer.from("videosuper-rewcfj2f:vSLKN0vdGXroKFqWtP84MdZGAOr1sErg").toString("base64");

  const response = await fetch("https://api.envato.com/token", {
    method: "POST",
    headers: {
      "Authorization": `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      "grant_type": "client_credentials"
    })
  });

  const data = await response.json();
  res.status(200).json(data);
}