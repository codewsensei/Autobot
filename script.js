const express = require('express');
const { exec } = require('child_process');
const fs = require('fs');

const app = express();
app.use(express.json());

app.post('/deploy', (req, res) => {
    const code = req.body.code;
    fs.writeFileSync('bot.js', code);
    exec('node bot.js', (err, stdout, stderr) => {
        if (err) return res.json({ error: stderr });
        res.json({ output: stdout });
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
