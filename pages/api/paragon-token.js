import { getLoggedInUser } from "../../lib/auth";

export default function handler(req, res) {
  const user = getLoggedInUser();
  res.status(200).json({ paragonUserToken: user.paragonUserToken });
}
