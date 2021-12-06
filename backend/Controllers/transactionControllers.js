const Transaction = require('../Models/transactionModels');


//@description  Get all transactions done by specific user
//@route        GET /api/transactions/
//@access       Private
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({user: req.user});
    if (transactions) {
    res.status(200).json({transactions: transactions});
    } else {
        res.json({message: "No transaction found"})
    }
    } catch (error) {
        console.log(error);
        res.status(400).json({message: "Error occured while looking for transaction"})
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
//@route        PATCH /api/transactions/:id
//@access       Private
const updateTransaction = async (req, res) => {
    const {id} = req.params;
    try {
        let transaction = await Transaction.updateOne(
            {_id: id},
             {$set: req.body});
        if (transaction) {
            transaction = await Transaction.findById(id);
            res.json({
            transaction: transaction
        });
        }
        
    } catch (error) {
        console.log(error);
        res.status(404).json({message: "Failed to update"});
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