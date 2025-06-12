const knex = require('../database/connection');

module.exports = {
    async create(req, res) {
        try {
            const { user_id, doctor_id, date, time, status } = req.body;
            
            const appointment = await knex('appointments')
                .insert({
                    user_id,
                    doctor_id,
                    date,
                    time,
                    status: status || 'scheduled'
                })
                .returning('*');

            return res.json(appointment[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async list(req, res) {
        try {
            const { user_id } = req.params;
            
            const appointments = await knex('appointments')
                .where({ user_id })
                .select('*');

            return res.json(appointments);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            
            const appointment = await knex('appointments')
                .where({ id })
                .update({ status })
                .returning('*');

            return res.json(appointment[0]);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}; 