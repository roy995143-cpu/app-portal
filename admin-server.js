const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// In-memory mock database for illustration
let appsDatabase = [
  { id: '1', name: 'Cool Game', filename: '17111-game.apk', status: 'pending' },
  { id: '2', name: 'Productivity Tool', filename: '17112-tool.exe', status: 'approved' }
];

// Middleware to verify admin authorization
function requireAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  // Replace with real JWT or session verification logic in production
  if (authHeader === 'Bearer ADMIN_SECRET_KEY') {
    next();
  } else {
    res.status(403).json({ error: 'Access denied. Admin authorization required.' });
  }
}

// Fetch all apps for admin review
app.get('/api/admin/apps', requireAdmin, (req, res) => {
  res.json(appsDatabase);
});

// Approve an app submission
app.patch('/api/admin/approve/:id', requireAdmin, (req, res) => {
  const appItem = appsDatabase.find(a => a.id === req.params.id);
  if (appItem) {
    appItem.status = 'approved';
    return res.json({ message: 'App approved successfully', app: appItem });
  }
  res.status(404).json({ error: 'App not found' });
});

// Delete an app and its associated file
app.delete('/api/admin/delete/:id', requireAdmin, (req, res) => {
  const index = appsDatabase.findIndex(a => a.id === req.params.id);
  if (index !== -1) {
    const deletedApp = appsDatabase.splice(index, 1)[0];
    
    // Remove stored file from the server disk
    const filePath = path.join(__dirname, 'uploads', deletedApp.filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    return res.json({ message: 'App and file deleted successfully' });
  }
  res.status(404).json({ error: 'App not found' });
});

app.listen(3000, () => console.log('Admin API running on port 3000'));