import express from 'express';

const router = express.Router();

router.get('/',(req,res) => {
    res.send("Ok from router");
})
export default router;