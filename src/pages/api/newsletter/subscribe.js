import { subscribe, refreshAccessToken } from "lib/newsletter";

export default async (req, res) => {
  const { email, name } = req.body;

  if (req.method !== "POST") {
    return res.status(400).json({ error: "Only POST requests allowed" });
  }

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const { access_token: token } = await refreshAccessToken();
    const response = await subscribe({
      email,
      name,
      token
    });

    if (response.status === "success") {
      const alreadyExist = /already exists/gi.test(response.message);
      if (alreadyExist) {
        return res.status(201).json({
          status: "ALREADY_EXISTS"
        });
      }
      return res.status(201).json({ status: "SUCCESS" });
    } else {
      res.status(500).json({ error: response.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message || error.toString() });
  }
};
