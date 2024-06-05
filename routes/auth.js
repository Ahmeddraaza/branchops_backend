const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")
const Users = require("../models/Employees")
const Orders = require("../models/order")
const Product = require("../models/Product")
const moment = require('moment')


router.get('/revenuebymonth', async(req, res) => {
  try {
    var revenuebymonth = {};
    const orders = await Orders.find();
    orders.forEach(order => {
      const month = order.createdAt.toISOString().split('-')[1];
      if (revenuebymonth[month]) {
        revenuebymonth[month] += order.total_amount;
      } else {
        revenuebymonth[month] = order.total_amount;
      }
    });
    res.json(revenuebymonth);
    
  } catch (error) {
    console.error(error);
  }



})
router.get('/dailysaleslatestweek', async (req, res) => {
  try {
    const dailySales = Array(7).fill(0);
    const today = moment().startOf('day');
    const startOfWeek = today.clone().startOf('isoWeek');

    const orders = await Orders.find({
      createdAt: {
        $gte: startOfWeek.toDate(),
        $lt: today.toDate()
      }
    });

    orders.forEach(order => {
      const dayOfWeek = moment(order.createdAt).isoWeekday() - 1;
      dailySales[dayOfWeek] += order.total_amount;
    });

    res.json(  dailySales);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});


router.get('/revenue', async(req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    var orders = await Orders.find();
    orders = orders.filter(order => order.createdAt.toISOString().split('T')[0] === today);
    var revenue = 0;
    orders.forEach(order => revenue += order.total_amount);
    res.json(revenue);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }


})


router.get('/count', async(req, res) => {

  try {
    const today = new Date().toISOString().split('T')[0];
    console.log(today)   
    var orders = await Orders.find();
    orders = orders.filter(order => order.createdAt.toISOString().split('T')[0] === today);
    var revenue = 0;
    orders.forEach(order => revenue += order.total_amount);
    res.json({count:orders.length,revenue:revenue});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  
  
  
  }

});

router.get("/checkproducts",async(req,res)=>{
  try {
    var products=await Product.find();
  products=products.filter(product=>product.quantity<5)
  return res.json(products)
  } catch (error) {
    console.error(error)
  }
})
router.get("/getemployees",async(req,res)=>{

try {
  return res.json(await Users.find())
} catch (error) {
  console.error(error)
}

})

router.get("/getproducts",async(req,res)=>{

  try{ return res.json(await Product.find())  }
  catch(error){
console.error(error)  
  }
})

router.post("/signUp", async (req, res) => {
  try {
    const {  userType, userId, name,email,phone, password, } = req.body;

    let user = await Users.findOne({ email });
    if (user) return res.json({ msg: "USER EXISTS" });

    await Users.create({
      email,
      password: await bcrypt.hash(password, 5),
      userType,
      userId,
      name,
      phone
    });

    return res.json({ msg: "CREATED" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;


router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Users.findOne({ email });
      if (!user) return res.json({ msg: "USER NOT FOUND" });
  
      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) return res.json({ msg: "WRONG PASSWORD" });
  
      const token = jwt.sign(
        {
          _id: user._id,
          email,
          createdAt: new Date(),
          userType: user.userType
        },
        "MY_SECRET",
        { expiresIn: "1d" }
      );
  
      res.json({
        msg: "LOGGED IN",
        token,
        userType:user.userType
      });
    } catch (error) {
      console.error(error);
    }
  });
  router.get("/getOrders", async (req, res) => {

    try {
        
        const orders = await Orders.find();
        res.json(orders);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
      }
    });

router.post('/addorders', async (req, res) => {

      try {
        const { customerName, products} = req.body;

        // Check if products array is empty or not provided
        if (!products || products.length === 0) {
            return res.status(400).json({ msg: 'Products array cannot be empty' });
        }

        // Create a new order
        const order = new Order({ customerName, products});

        // Save the order
        await order.save();
        console.log('Order saved with total_amount:', order.total_amount);

        res.status(201).json({ msg: 'Order created successfully', order, total_amount: order.total_amount });
    } catch (error) {
      console.error('Error while creating order:', error.message);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
});
  
  router.post('/addproducts', async (req, res) => {
    try {
        const {prod_id ,Product_name,Product_Brand, quantity, price } = req.body;
        await Product.create({...req.body})
        res.json({ msg: 'Product created successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Server error' });
    }
});






    

/*router.post('/signup', async (req, res) => {
try {
    const checking = await collection.findOne({ name: req.body.name });

    if (checking) {
        // User already exists
        return res.send("User details already exist");
    }

    // User doesn't exist, insert data into MongoDB
    const newUser = new collection({
        name: req.body.name,
        password: await bcrypt.hash(req.body.password, 3)
    });
    
    // Validation for the 'name' field
    const nameRegex = /^(?=.*[A-Z])(?=.*[@#$%^&+=!]).*$/;
    if (!nameRegex.test(newUser.name)) {
        // Handle validation error, for example, send an error response
        return res.status(400).json({ error: "Name must contain one uppercase letter and a special character." });
    }
    
    // Continue with the rest of your code if validation passes
    // ...
    
    

    await newUser.save();
    return res.json({ msg: "CREATED" })

} catch (error) {
    // Handle errors more gracefully
    console.error(error);
    res.status(500).send("Internal Server Error");
}
});
*/


module.exports = router