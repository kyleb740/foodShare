// src/routes/index.js
const router = require('express').Router();

// Totally fake data
const FILES = [
  {id: 'a', title: 'Apple', description: '3 lbs'},
  {id: 'b', title: 'Orange', description: '1 bunch'},
  {id: 'c', title: 'Broccoli', description: '2 heads'},
  {id: 'd', title: 'Potato', description: '2 lbs'},
];


/**
 * C - reate
 */
router.post('/file', function(req, res, next) {
  const data = req.body;
  console.log("POST DATA", data);

  res.end('Create a new file');
});
/**
 * R - ead
 */
router.get('/file/:fileId', function(req, res, next) {
  const { fileId } = req.params;
  // same as 'const fileId = req.params.fileId'

  const file = FILES.find(entry => entry.id === fileId);
  if (!file) {
    return res.status(404).end(`Could not find file '${fileId}'`);
  }

  res.json(file);
});
/**
 * U - pdate
 */
router.put('/file/:fileId', function(req, res, next) {
  const data = req.body;
  console.log("PUT DATA", data);

  res.end(`Updating file '${req.params.fileId}'`);
});
/**
 * D - elete
 */
router.delete('/file/:fileId', function(req, res, next) {
  res.end(`Deleting file '${req.params.fileId}'`);
});
/**
 * ¯\_(ツ)_/¯ - list
 */
router.get('/file', function(req, res, next) {
  res.json(FILES);
});

module.exports = router;
