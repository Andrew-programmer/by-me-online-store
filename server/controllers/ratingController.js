const {Rating} = require('../models/models');
const {getUserIdFromJWT} = require('./functions');

class RatingController {
    async create(req, res){
        try {
            const {rate} = req.body;
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            const rating = await Rating.create({
                rate,
                userId,
                deviceId
            })

            res.status(200).json({rating});
        } catch (e) {
            res.status(400).json({message: 'Create rating error'});
        }
    }

    async getOne(req, res) {
        try {
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            const rating = await Rating.findOne({
                where: {
                    deviceId,
                    userId
                }
            })

            res.status(200).json({rating})
        } catch (e) {
            res.status(400).json({message: 'Get rating error'})
        }
    }

    async update(req, res) {
        try {
            const {rate} = req.body;
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            const rating = await Rating.update({
                rate
            }, {
                where: {
                    userId,
                    deviceId
                }
            })

            res.status(200).json({rating})
        } catch (e) {
            res.status(400).json({message: 'Get rating error'})
        }
    }

    async delete(req, res) {
        try {
            const {deviceId} = req.query;
            const userId = getUserIdFromJWT(req.headers.authorization);

            await Rating.destroy({
                where: {
                    userId,
                    deviceId
                }
            })

            res.status(200).json({message: 'Delete rating success'});

        } catch (e) {
            res.status(400).json({message: 'Get rating error'})
        }
    }
}

module.exports = new RatingController();
