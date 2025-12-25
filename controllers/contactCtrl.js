/*
Name of the module: Contact Section

Date of module Creation: 01/11/2021
Author of the module: Mohit Prajapati

What the module does: Accepts queries/suggestions
*/

const contactCtrl = {
    // Contact form (mail sending removed)
    postRequest: async (req, res) => {
        try {
            res.json({ msg: "Thank you for your suggestion/query!" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = contactCtrl;