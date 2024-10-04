const crypto = require('crypto');
const planModel = require('../model/planModel');
const userModel = require('../model/userModel');


const createSubscription = async (req, res) => {
    
    

    const secret = process.env.LEMONSQUEEZY_SIGNING_SECRET;

    const hmac = crypto.createHmac('sha256', secret);
    const digest = Buffer.from(hmac.update(req.rawBody).digest('hex'), 'utf8');
    const signature = Buffer.from(req.get('X-Signature') || '', 'utf8');

    if (!crypto.timingSafeEqual(digest, signature)) {
        return res.status(401).send('Invalid signature.');
    }

    const data = req.body;

    const user_id = data.meta.custom_data.user_id;
    const plan_id = data.meta.custom_data.plan_id;
    const renews_at = data.data.attributes.renews_at
    const customer_id = data.data.attributes.customer_id

    const plan = await planModel.findById(plan_id);
    if (!plan) {
        return res.status(404).json({
            status: false,
            message: 'Plan not found'
        });
    }

    const user = await userModel.findById(user_id);
    if (!user) {
        return res.status(404).json({
            status: false,
            message: 'User not found'
        });
    }

    user.plan_id = plan._id;
    user.will_expire = renews_at
    user.data = {
        ...plan.data,
        customer_id: customer_id
    };
    await user.save();

    return res.status(200).json({
        status: true,
        message: 'Subscription created successfully'
    });
    
}

module.exports = {
    createSubscription
}