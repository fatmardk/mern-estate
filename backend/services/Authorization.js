const jwt = require('jsonwebtoken');
require('dotenv').config();

class Authorization {
  authorized(req, res, next) {
    const headerToken = req.headers.authorization;
    if (headerToken) {
      const token = headerToken.split('Bearer ')[1];
      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
      } catch (error) {
        return res.status(401).json({ errors: [{ msg: 'Please add a valid token!' }] });
      }
    } else {
      return res.status(401).json({ errors: [{ msg: 'Please add a token, unauthorized!' }] });
    }
  }
}

module.exports = new Authorization();
