import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  // Extract x and y values from query parameters
  const { x, y } = req.query;

  // Construct the filename based on the x and y parameters
  const filename = `cube_x${x}_y${y}.txt`;

  // Define the path to the ASCII art files
  const filePath = path.join(process.cwd(), 'asciiCubes', filename);

  // Check if the file exists
  fs.exists(filePath, (exists) => {
    if (exists) {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ error: 'Failed to read the ASCII art file.' });
          return;
        }
        res.status(200).send(data);
      });
    } else {
      res.status(404).json({ error: 'ASCII art file not found.' });
    }
  });
}
