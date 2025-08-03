const { default: mongoose } = require('mongoose');
const Rate = require('../models/rateSchema');

// POST 
exports.createRate = async (req, res) => {
  const { metal, purity, rate, rateDate } = req.body;
  if (!metal || !purity || !rate || !rateDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newRate = await Rate.create({ metal, purity, rate, rateDate });
    res.status(201).json(newRate);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//get all
exports.getAllpurity = async (req, res) => {
  try {
    const { metal, purity } = req.query;

    const query = {};
    if (metal) query.metal = { $regex: new RegExp(metal, 'i') };
    if (purity) query.purity = { $regex: new RegExp(purity, 'i') };

    const result = await Rate.find(query);
    res.status(200).json({ purity: result });
  } catch (error) {
    console.error('Failed to fetch purity:', error);
    res.status(500).json({ message: 'Server error while fetching purity' });
  }
};

// get user with id 

exports.getPurityById = async (req, res) => {
  const {id} = req.params

   if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid purity ID.' });
  }
  try {
    const purity = await Rate.findById(id);
    if (!purity) return res.status(404).json({ message: 'Purity not found' });

    res.status(200).json({
      message: 'Purity fetched successfully.',
      purity,
    });
  } catch (error) {
    console.error('Error fetching purity by ID:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};



//update

exports.purityUpdate= async(req, res) => {
    const { metal, purity,rate,rateDate } = req.body;
    const { id } = req.params;
    try {
        const updatedPurity = await Rate.findByIdAndUpdate(id, { metal, purity,rate,rateDate }, { new: true });
        if (!updatedPurity) {
            return res.status(404).json({ message: 'Purity not found.' });
        }
        res.status(200).json({
            message: 'Purity updated successfully.',
            purity: updatedPurity
        });
    } catch (error) {
        console.error('Error updating purity:', error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}


exports.getLatestRate = async (req, res) => {
  const { metal, purity } = req.query;

  try {
    const latestRate = await Rate.findOne({ metal, purity }).sort({ rateDate: -1 });
    res.json(latestRate || null);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// GET 
exports.getRateHistory = async (req, res) => {
  const { metal, purity } = req.query;

  try {
    const history = await Rate.find({ metal, purity }).sort({ rateDate: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};


// delete

exports.purityDelete = async (req, res) => {
  try {
    const deletedPurity = await Rate.findByIdAndDelete(req.params.id);
    if (!deletedPurity) {
      return res.status(404).json({ message: 'Purity not found.' });
    }

    res.status(200).json({ message: 'Purity deleted successfully.' });
  } catch (error) {
    console.error('Error deleting purity:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
}


// search purity

exports.serachPurity = async(req,res)=>{
  const { metal, purity } = req.query;

  const query = {};
  if (metal) query.metal = metal;
  if (purity) query.purity = purity;

  const rates = await Rate.find(query).sort({ rateDate: -1 });
  res.json(rates);
}


// display rate
exports.getLatestRate = async (req, res) => {
  try {
    const { metal, purity } = req.query;

    const latest = await Rate.findOne({ metal, purity })
      .sort({ rateDate: -1 }); 

    if (!latest) {
      return res.status(404).json({ message: 'No rate found' });
    }

    res.status(200).json(latest);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching latest rate' });
  }
};


// history

exports.getRateHistory = async (req, res) => {
  try {
    const { metal, purity } = req.query;
    console.log('Searching rates for:', metal, purity); 
    const rates = await Rate.find({ metal, purity }).sort({ rateDate: -1 });
  console.log('Found history:', rates.length); 
    res.status(200).json({ history: rates });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching rate history' });
  }
};
