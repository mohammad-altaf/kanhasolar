const express = require('express');
const path = require('path');
const app = express();

// Set the port
const PORT = process.env.PORT || 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

// Serve index.html for all routes to support client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Access from other devices on your network using your local IP address`);
  console.log(`Example: http://YOUR_LOCAL_IP:${PORT}`);
  
  // Log network IP addresses for easy access
  const { networkInterfaces } = require('os');
  const nets = networkInterfaces();
  const results = [];

  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === 'IPv4' && !net.internal) {
        results.push(`- http://${net.address}:${PORT}`);
      }
    }
  }
  
  if (results.length > 0) {
    console.log('\nAvailable network URLs:');
    console.log(results.join('\n'));
  }
});
