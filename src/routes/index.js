function setupRoutes(app) {
    app.get('/api/hello', (req, res) => {
        res.json({ message: 'Hello, World!' });
    });

    app.get('/api/goodbye', (req, res) => {
        res.json({ message: 'Goodbye, World!' });
    });
}

module.exports = setupRoutes;