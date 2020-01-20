const express = require('express');
const router=express.Router();


const { ensureAuthenticated } = require('../../config/auth');
//**************** Route To For Role ****************//

router.get('/',ensureAuthenticated,(req,res)=>{
  let alpha =  req.user
  if(alpha.role==='user')
  {
      res.redirect('/user/')
  }
  else if(alpha.role==='admin')
  {
    res.redirect('/api/admin/dashboard')
  }
  else if(alpha.role==='agent')
  {
    res.redirect('/api/agents/dashboard')
  }
})
module.exports=router;