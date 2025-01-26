const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Dash = require('../../model/Dashboard');

// Helper function to calculate age
const calculateAge = (dateOfBirth) => {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff); // Convert the difference to a Date object
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Subtract 1970 to get the years
};

// Add a dashboard
router.post(
    '/',
    [
        auth,
        check('name', "name is required").not().isEmpty(),
        check('dateOfBirth', "date of birth is required").not().isEmpty(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { name, dateOfBirth } = req.body;
            const age = calculateAge(dateOfBirth);
            console.log(age, "age");


            const newDash = new Dash({
                name,
                dateOfBirth,
                age, // Save the calculated age in the database if needed
            });

            const savedDash = await newDash.save();
            res.json({ ...savedDash.toObject(), age }); // Include age in the response
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

// Update a dashboard
router.put(
    '/:id',
    [auth],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { id } = req.params;
            const { name, dateOfBirth } = req.body;

            const updatedData = {};
            if (name) updatedData.name = name;
            if (dateOfBirth) {
                updatedData.dateOfBirth = dateOfBirth;
                updatedData.age = calculateAge(dateOfBirth); // Recalculate age on update
            }

            const updatedDash = await Dash.findByIdAndUpdate(
                id,
                { $set: updatedData },
                { new: true }
            );

            if (!updatedDash) {
                return res.status(404).json({ msg: "Dashboard entry not found" });
            }

            res.json(updatedDash);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);

router.delete('/:id', auth, async (req, res) => {
    try {
        const deletedDash = await Dash.findByIdAndDelete(req.params.id);

        if (!deletedDash) {
            return res.status(404).json({ msg: "Dashboard entry not found" });
        }

        res.json({ msg: "Dashboard entry deleted successfully", deletedDash });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
