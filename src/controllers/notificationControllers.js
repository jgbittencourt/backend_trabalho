const knex = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            const { user_id, title, message, type } = req.body;
            
            const notification = await knex('notifications')
                .insert({
                    user_id,
                    title,
                    message,
                    type,
                    read: false,
                    created_at: new Date()
                })
                .returning('*');

            return res.json(notification[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async list(req, res) {
        try {
            const { user_id } = req.params;
            
            const notifications = await knex('notifications')
                .where({ user_id })
                .orderBy('created_at', 'desc')
                .select('*');

            return res.json(notifications);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async markAsRead(req, res) {
        try {
            const { id } = req.params;
            
            const notification = await knex('notifications')
                .where({ id })
                .update({ read: true })
                .returning('*');

            return res.json(notification[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}; 