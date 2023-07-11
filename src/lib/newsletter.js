export const subscribe = async ({ email, name, token }) => {
  const contactInfo = {
    "First Name": name,
    "Contact Email": email
  };

  const body = `resfmt=JSON&listkey=${
    process.env.Z_LIST_KEY
  }&contactinfo=${encodeURIComponent(JSON.stringify(contactInfo))}`;

  const response = await fetch(
    "https://campaigns.zoho.com/api/v1.1/json/listsubscribe",
    {
      method: "POST",
      body,
      headers: {
        Authorization: `Zoho-oauthtoken ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );
  return await response.json();
};

export const refreshAccessToken = async () => {
  const url = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.Z_REFRESH_TOKEN}&client_id=${process.env.Z_CLIENT_ID}&client_secret=${process.env.Z_CLIENT_SECRET}&grant_type=refresh_token`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return await response.json();
};
