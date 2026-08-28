import { Order } from '../models/order.model.js'
import sendEmail from '../utils/sendMail.js'

const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body
        if (!items || items.length == 0 || !totalAmount || !address) {
            return res.status(400).json({ message: "INVALID ORDER DATA" })
        } else {
            const order = new Order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            })
            await order.save()
        }
        const message = `hello done order`
        await sendEmail(req.user.email, "Order Created", message)
        req.status(201).json({ message: 'order creates successfully' })
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }

}

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('items.productId', 'name price')
        res.json(orders)
    } catch (error) {
        res.status(500).json({ message: 'error while fatching the orders', error })
    }
}

// this if for admin
const getOrders = async(req,res)=>{
     try {
        const orders = await Order.find({}).populate('userId', 'id name')
           res.json(orders)
     } catch (error) {
        
     }
}

// this is also for the admin
const updateOrderStatus =async (req,res)=>{
try {
    const {status}= req.status
    const order = await Order.findById(req.parms.id)
    if(order){
        order.status=status
        await order.save()
        res.json({message:'Order ststus updated', order})
    }else{
        res.status(404).json({message:"oder not found"})
    }
} catch (error) {
    res.ststus(500).json({message:'Error while updating the status',error})
}
}

export{
    createOrder,
    updateOrderStatus,
    getOrders,
    getMyOrders
}