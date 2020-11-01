const getProfile = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
    .then( user => {
        if (user.length){
            res.json(user[0])
        } else {
            res.status(400).json('not found');
        }   
    })
};

const updateImageCount = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=',id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get and update entries'))
};

module.exports = {
    getProfile: getProfile,
    updateImageCount: updateImageCount
};
