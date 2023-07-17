const jwt = require("jsonwebtoken");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  console.log("AAAAAAAAA",authHeader);
  if (authHeader) {
    console.log("BBBBBBBBBBB");
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      console.log("Token--------",token);
      console.log("SECRET KEY------",process.env.SECRET_KEY);
    
      if (err) 
      {
      console.log("Error--------",err);
      res.status(403).json("Token is not valid!");
      }
      req.user = user;
      console.log("CCCCCCCCCCCCC",user);
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

module.exports = verify;
