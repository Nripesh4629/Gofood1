const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data;
    
    
    const orderDataWithDate = [{ Order_date: req.body.order_date }, ...data];

    try {
        
        let eId = await Order.findOne({ 'email': req.body.email });
        if (!eId) {
            
            await Order.create({
                email: req.body.email,
                order_data: [orderDataWithDate]
            });
            return res.status(200).json({ success: true });
        } else {
            // Update the existing user's order data
            await Order.findOneAndUpdate(
                { email: req.body.email },
                { $push: { order_data: orderDataWithDate } }
            );
            return res.status(200).json({ success: true });
        }
    } catch (error) {
        // console.error("Error while processing the order:", error.message);
        return res.status(500).send({ error: "Server Error", message: error.message });
    }
});

router.post('/myOrderData', async (req, res) => {
try{
    let myData = await Order.findOne({'email':req.body.email})
    res.json({orderData:myData})
} catch(error){
res.send("server Error",error.message)
}
})

module.exports = router;
