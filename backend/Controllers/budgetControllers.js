const Budget = require('../Models/budgetModels');

//@description  Get all budgets done by specific user
//@route        GET /api/budgets/
//@access       Private
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user });
    if (budgets) {
      res.status(200).json({ budgets: budgets });
    } else {
      res.json({ message: 'No budget found' });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: 'Error occured while looking for budgets' });
  }
};

//@description  Get single budget
//@route        Get /api/budgets/:id
//@access       Private
const getBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findById(id);
    if (budget) {
      res.json({ budget: budget });
    } else {
      res.json({ message: 'budget not found' });
    }
  } catch (error) {
    console.log(error);
    throw new Error('Budget not found');
  }
};

//@description  Create a single budget
//@route        Post /api/budgets
//@access       Private
const createBudget = async (req, res) => {
  try {
    const budget = await Budget.create(req.body);
    if (budget) {
      res.json({ budget: budget });
    }
  } catch (error) {
    console.log('Creation failed');
    res.status(404);
    console.log(error);
  }
};

//@description  Update single budget
//@route        PATCH /api/budgets/:id
//@access       Private
const updateBudget = async (req, res) => {
  const { id } = req.params;
  try {
    let budget = await Budget.updateOne({ _id: id }, { $set: req.body });
    if (budget) {
      budget = await Budget.findById(id);
      res.json({
        budget: budget,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error('Budget failed to update');
  }
};

//@description  Delete single budget
//@route        DELETE /api/budgets/:id
//@access       Private
const deleteBudget = async (req, res) => {
  const budget = await Budget.findById(req.params.id);
  if (budget) {
    await budget.remove();
    res.json({ message: 'Budget removed' });
  } else {
    res.status(404);
    throw new Error('Budget not found');
  }
};

module.exports = {
  getBudgets,
  getBudget,
  createBudget,
  updateBudget,
  deleteBudget,
};
