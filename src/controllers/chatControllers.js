const knex = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            const { user_id, doctor_id, message } = req.body;
            
            const chat = await knex('chats')
                .insert({
                    user_id,
                    doctor_id,
                    message,
                    created_at: new Date()
                })
                .returning('*');

            return res.json(chat[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async list(req, res) {
        try {
            const { user_id, doctor_id } = req.params;
            
            const chats = await knex('chats')
                .where({ user_id, doctor_id })
                .orderBy('created_at', 'asc')
                .select('*');

            return res.json(chats);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async listConversations(req, res) {
        try {
            const { user_id } = req.params;
            
            const conversations = await knex('chats')
                .where({ user_id })
                .distinct('doctor_id')
                .select('doctor_id');

            const doctors = await Promise.all(
                conversations.map(async (conv) => {
                    const doctor = await knex('users')
                        .where({ id: conv.doctor_id })
                        .select('id', 'name', 'avatar')
                        .first();
                    return doctor;
                })
            );

            return res.json(doctors);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}; 