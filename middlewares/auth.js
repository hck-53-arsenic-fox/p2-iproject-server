const { admin } = require("../auth/auth.firebase");

const authz = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "UNAUTHORIZED" };
    }

    const verify = await admin.auth().verifyIdToken(access_token);

    if (!verify) {
      throw { name: "UNAUTHORIZED" };
    }
    req.user = {
        id: verify.user_id,
        email: verify.email
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {authz}
