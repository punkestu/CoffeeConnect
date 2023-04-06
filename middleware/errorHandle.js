const { validationResult } = require("express-validator");

module.exports = function(req,res,next){
      const Errors = validationResult(req);
      if(Errors.isEmpty()){
            next();
      }else{
            const errors = Errors.mapped();
            return res.status(400).send({errors});
      }
}