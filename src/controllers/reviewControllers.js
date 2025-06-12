const knex = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            const { user_id, doctor_id, rating, comment } = req.body;
            
            const review = await knex('reviews')
                .insert({
                    user_id,
                    doctor_id,
                    rating,
                    comment,
                    created_at: new Date()
                })
                .returning('*');

            return res.json(review[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async list(req, res) {
        try {
            const { doctor_id } = req.params;
            
            const reviews = await knex('reviews')
                .where({ doctor_id })
                .join('users', 'reviews.user_id', 'users.id')
                .select('reviews.*', 'users.name as user_name', 'users.avatar as user_avatar')
                .orderBy('reviews.created_at', 'desc');

            return res.json(reviews);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async getDoctorRating(req, res) {
        try {
            const { doctor_id } = req.params;
            
            const result = await knex('reviews')
                .where({ doctor_id })
                .avg('rating as average_rating')
                .count('id as total_reviews')
                .first();

            return res.json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}; 