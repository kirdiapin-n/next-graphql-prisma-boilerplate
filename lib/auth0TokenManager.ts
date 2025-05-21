let cachedToken: string | null = null;
let tokenExpiresAt: number | null = null;

export async function getManagementApiToken(): Promise<string> {
  const now = Date.now();

  // Если токен ещё не истёк — вернуть его
  if (cachedToken && tokenExpiresAt && now < tokenExpiresAt) {
    return cachedToken;
  }

  // Запрос нового токена
  const response = await fetch(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      grant_type: "client_credentials",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
    }),
  }).then((res) => res.json());

  const { access_token, expires_in } = response;

  cachedToken = access_token;
  tokenExpiresAt = now + expires_in * 1000 - 60_000; // вычитаем 1 минуту "на запас"

  return access_token;
}
