const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/welcome', ensureAuthenticated, async (req, res) =>{
if(req.user){
  let Alpha = await req.user;
  res.render('admin',{
    data:Alpha
  })
}else{
  res.sendStatus(204);
}
})
module.exports = router;