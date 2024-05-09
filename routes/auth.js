const bcrypt = require("bcrypt");
var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken")
const Users = require("../models/Employees")
const Orders = require("../models/order")
const Product = require("../models/Product")


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
    const { email, password } = req.body;

    let user = await Users.findOne({ email });
    if (user) return res.json({ msg: "USER EXISTS" });

    await Users.create({
      ...req.body,
      password: await bcrypt.hash(password, 5),
    });

    return res.json({ msg: "CREATED" });
  } catch (error) {
    console.error(error);
  }
});

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


          const { customerName, products, total_amount } = req.body;
          const product = [];
          for (let i = 0; i < products.length; i++) {
            console.log(products[i]);
              product[i] = await Product.findOne({ Product_name: products[i] });
              if (!product) return res.json({ msg: "Product not found" });
          }
  

          const newOrder = new Orders({
              customerName,
              products: product.map(product => product._id),
              total_amount,
              
          });
  
          const savedOrder = await newOrder.save();
          res.status(201).json(savedOrder);
      } catch (err) {
          console.error('Error creating order:', err);
          res.status(500).json({ error: 'Server error' });
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