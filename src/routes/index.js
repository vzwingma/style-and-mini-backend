function setupRoutes(app) {
    app.get('/api/status', (req, res) => {
        res.json({ statut: 'true' });
    });

    app.get('/api/goodbye', (req, res) => {
        res.json({ message: 'Goodbye, World!' });
    });
}

module.exports = setupRoutes;