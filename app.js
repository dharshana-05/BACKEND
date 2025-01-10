var express = require("express");

//moongose import
const mongoose = require('mongoose');
const { v4: uuidv4 } = require("uuid"); // Import uuid
const app = express();
//Middleware
app.use(express.json())

//Set up default mongoose connection->mongoose.connect
mongoose.connect("mongodb://localhost:27017/expense").then(() => {
    console.log("Connected to database");
});

//schema->new mongoose.schema
const expenseSchema = new mongoose.Schema({
    id: { type: String, requied: true, unique: true },
    title: { type: String, required: true },
    amount: { type: Number, required: true }

})

//model->mongoose.model
const Expenses = mongoose.model("Expenses", expenseSchema);

//get->small amt of data using header
//post->body field->huge amount of data
app.get("/api/expenses", async (req, res) => {
    try {
        const expenses = await Expenses.find();
        res.status(200).json(expenses)
    } catch (error) {
        res.status(500).json()({ message: "Failed to fetch expenses" });
    }
});
app.get("/api/expenses/:id",async(req,res)=>{
    try{
        const{id}=req.params; 
        const expense=await Expenses.findOne({id});
    if(!expense){
        return res.status(404).json({message:"Expense not found"});
    }
res.status(200).json(expense);
 }catch(error){
    res.status(500).json({message:"Error in Fetching expenses"})
 }
});
app.post("/api/expenses", async (req, res) => {
    const { title, amount } = req.body;
    try {
        const newExpense = new Expenses({
            id: uuidv4(),
            title, //title==title:title
            amount: amount, //amount==amount:amount
        });
        const savedExpense = await newExpense.save()
        res.status(200).json(savedExpense)
    } catch (err) {
        res.status(500).json()({ message: "Error in creating expense" });
    }
});

//put
app.put("/api/expenses/:id",async(req,res)=>{
    const {id}=req.params;
    const{title,amount}=req.body;
    try{
        const updateExpenses=await Expenses.findOneAndUpdate(
        {id},
        {title,amount},
)
if(!updateExpenses){
    return res.status(404).json({message:"Expense not found"})
}
res.status(200).json(updateExpenses);
    }
    catch(error)
    {
   res.status(500).json({ message: "Error in updating data"});
    }
});

//delete
app.delete("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedExpense = await Expenses.findOneAndDelete(id);

        if (!deletedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully", deletedExpense });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error in deleting expense" });
    }
});
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**const students=[
    {
        name:"suriya",
        age:20,
        roll:1,
    },
    {
        name:"vijay",
        age:21,
        roll:2
    },
];
app.get("/api/sayhello",(req,res)=>{
    res.send("Hello CCE");
    res.end();
});
app.get("/api/students",(req,res)=>{
    const {rollno}={req,res}
    res.status(200).json({name:"Avinash",age:25});
}); **/
app.listen(3000, () => {
    console.log("Server is running on port 3000");

})