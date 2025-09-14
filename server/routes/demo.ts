import { Router, RequestHandler } from "express";
import axios from "axios";

const router = Router();

// --- Google Callback ---
export const googleCallback: RequestHandler = async (req, res) => {
  try {
    const { code } = req.query;

    const response = await axios.post("https://oauth2.googleapis.com/token", {
      code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: process.env.GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    });

    const { access_token } = response.data;

    const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.redirect(
      `${process.env.FRONTEND_URL}/landing?user=${encodeURIComponent(
        JSON.stringify(userInfo.data)
      )}`
    );
  } catch (err: any) {
    console.error("Google OAuth error:", err.response?.data || err.message);
    res.status(500).json({ error: "Google OAuth failed" });
  }
};

// --- GitHub Callback ---
export const githubCallback: RequestHandler = async (req, res) => {
  try {
    const { code } = req.query;

    const tokenResponse = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GITHUB_REDIRECT_URI,
      },
      { headers: { Accept: "application/json" } }
    );

    const { access_token } = tokenResponse.data;

    const userResponse = await axios.get("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    res.redirect(
      `${process.env.FRONTEND_URL}/landing?user=${encodeURIComponent(
        JSON.stringify(userResponse.data)
      )}`
    );
  } catch (err: any) {
    console.error("GitHub OAuth error:", err.response?.data || err.message);
    res.status(500).json({ error: "GitHub OAuth failed" });
  }
};

// --- Entry points ---
router.get("/google", (req, res) => {
  const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&response_type=code&scope=openid%20email%20profile`;
  res.redirect(redirectUri);
});

router.get("/google/callback", googleCallback);

router.get("/github", (req, res) => {
  const redirectUri = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${process.env.GITHUB_REDIRECT_URI}&scope=user`;
  res.redirect(redirectUri);
});

router.get("/github/callback", githubCallback);

export default router;
