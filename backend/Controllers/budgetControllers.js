const Budget = require('../Models/budgetModels');


//@description  Get all budgets done by specific user
//@route        GET /api/budgets/
//@access       Private
const getBudgets = async (req, res) => {
    
    const budgets = await Transaction.find({user: req.user});
    if (budgets) {
    res.json({budgets: budgets});
    }
}

//@description  Get single budget
//@route        Get /api/budgets/:id
//@access       Private
const getBudget = async (req, res) => {
    const {id} = req.params;
    try {
        const budget = await Budget.findById(id);
    if (budget) {
    res.json({budget: budget});
    } else {
        res.json({message: "budget not found"})
    }
        
    } catch (error) {
        console.log(error);
        throw new Error("Budget not found")
    }
    
}

//@description  Create a single budget
//@route        Post /api/budgets
//@access       Private
const createBudget = async (req, res) => {
    try {
        const budget = await Budget.create(req.body);
    if (budget) {
    res.json({budget: budget});
    } 
    } catch (error) {
        console.log("Creation failed");
        res.status(404);
        console.log( error);
    }
}


//@description  Update single budget
//@route        PUT /api/budgets/:id
//@access       Private
const updateBudget = async (req, res) => {
    
    try {
        const budget = await Budget.findOne(req.params.id);
        if (budget) {
            budget.type = req.body.type || budget.type,
            budget.category = req.body.category || budget.category,
            budget.name = req.body.name || budget.name,
            budget.amount = req.body.amount || budget.amount
        }
        const updatedBudget = await budget.save();
        res.json({
            id: updatedBudget._id,
            type: updatedBudget._type,
            category: updatedBudget._category,
            name: updatedBudget._name,
            amount: updatedBudget._amount,
        })
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Budget failed to update")
    }
}


//@description  Delete single budget
//@route        DELETE /api/budgets/:id
//@access       Private
const deleteBudget = async (req,res) => {
    
    const budget = await User.findById(req.params.id);
    if (budget) {
    await budget.remove();
    res.json({ message: 'Budget removed' });
  } else {
    res.status(404);
    throw new Error('Budget not found');
  }
}

module.exports = { getBudgets, getBudget, createBudget, updateBudget, deleteBudget };