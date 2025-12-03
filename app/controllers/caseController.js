const Case = require('../models/Case');
const Customer = require('../models/Customer');
const User = require('../models/User');


exports.getCases = async (req, res) => {
    try {
        const cases = await Case.find()
            .populate('customer', 'name email phone')
            .populate('assignedTo', 'username role')
            .sort({ createdAt: -1 });
        
        res.json({
            success: true,
            count: cases.length,
            data: cases
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.getCase = async (req, res) => {
    try {
        const caseItem = await Case.findById(req.params.id)
            .populate('customer', 'name email phone company')
            .populate('assignedTo', 'username role');

        if (!caseItem) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.json({
            success: true,
            data: caseItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Create case
exports.createCase = async (req, res) => {
    try {
        const caseItem = await Case.create(req.body);
        
        // Populate the created case
        const populatedCase = await Case.findById(caseItem._id)
            .populate('customer', 'name email phone')
            .populate('assignedTo', 'username role');

        res.status(201).json({
            success: true,
            data: populatedCase
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};
// Update case

exports.updateCase = async (req, res) => {
    try {
        const caseItem = await Case.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate('customer', 'name email phone')
         .populate('assignedTo', 'username role');

        if (!caseItem) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.json({
            success: true,
            data: caseItem
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// Delete case


exports.deleteCase = async (req, res) => {
    try {
        const caseItem = await Case.findByIdAndDelete(req.params.id);

        if (!caseItem) {
            return res.status(404).json({
                success: false,
                message: 'Case not found'
            });
        }

        res.json({
            success: true,
            message: 'Case deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};