const Drawing = require('../models/image')

const userDrawings = (req,res) => {
    console.log(req.params.id)
    Drawing.find({ owner_googleId: req.params.id })
        .sort({ likes: -1 })
        .then((result) => {
            res.send(result)
        })
}

module.exports = {
    userDrawings
}
