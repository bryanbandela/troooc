const Transaction = require('../Models/transactionModels');


//@description  Get all transactions done by specific user
//@route        GET /api/transactions/
//@access       Private
const getTransactions = async (req, res) => {
    
    const transactions = await Transaction.find({user: req.user});
    if (transactions) {
    res.json({transactions: transactions});
    }
}

//@description  Get single transaction
//@route        Get /api/transactions/:id
//@access       Private
const getTransaction = async (req, res) => {
    const {id} = req.params;
    try {
        const transaction = await Transaction.findById(id);
    if (transaction) {
    res.json({transaction: transaction});
    } else {
        res.json({message: "transaction not found"})
    }
        
    } catch (error) {
        console.log(error);
        throw new Error("Transaction not found")
    }
    
}

//@description  Create a single transaction
//@route        Post /api/transactions
//@access       Private
const createTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
    if (transaction) {
    res.json({transaction: transaction});
    } 
    } catch (error) {
        console.log("Creation failed");
        res.status(404);
        console.log( error);
    }
}


//@description  Update single transaction
//@route        PUT /api/transactions/:id
//@access       Private
const updateTransaction = async (req, res) => {
    
    try {
        const transaction = await Transaction.findOne(req.params.id);
        if (transaction) {
            transaction.type = req.body.type || transaction.type,
            transaction.category = req.body.category || transaction.category,
            transaction.name = req.body.name || transaction.name,
            transaction.amount = req.body.amount || transaction.amount
        }
        const updatedTransaction = await transaction.save();
        res.json({
            id: updatedTransaction._id,
            type: updatedTransaction._type,
            category: updatedTransaction._category,
            name: updatedTransaction._name,
            amount: updatedTransaction._amount,
        })
    } catch (error) {
        console.log(error);
        res.status(404);
        throw new Error("Transaction failed to update")
    }
}


//@description  Delete single transaction
//@route        DELETE /api/transactions/:id
//@access       Private
const deleteTransaction = async (req,res) => {
    
    const transaction = await User.findById(req.params.id);
    if (transaction) {
    await transaction.remove();
    res.json({ message: 'Transaction removed' });
  } else {
    res.status(404);
    throw new Error('Transaction not found');
  }
}

module.exports = { getTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction };