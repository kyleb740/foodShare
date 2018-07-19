// src/routes/index.js
const router = require('express').Router();
const mongoose = require('mongoose');
const mailjet = require ('node-mailjet')


// const request = mailjet
//   .post("send")
//   .request({
//       "FromEmail":"kebrew2@gmail.com",
//       "FromName":"Kyle Brewer",
//       "Subject":"FoodShare",
//       "Text-part":"Dear passenger, welcome to Mailjet! May the delivery force be with you!",
//       "Html-part":"<h3>Dear passenger, welcome to Mailjet!</h3><br />May the delivery force be with you!",
//       "Recipients":[
//               {
//                       "Email": "5025503799@txt.att.net"
//               }
//       ]
//   });
// request
//   .on('success', function (response, body) {
//       console.log (response.statusCode, body);
//   })
//   .on('error', function (err, response) {
//       console.log (response.statusCode, err);
//   });


/**
 * C - reate
 */
 router.post('/file', function(req, res, next) {
   const File = mongoose.model('File');
   const fileData = {
     title: req.body.title,
     description: req.body.description,
     user: req.body.user,
     expiration: req.body.expiration,
   };

   File.create(fileData, function(err, newFile) {
     if (err) {
       console.error(err);
       return res.status(500).json(err);
     }

     res.json(newFile);
   });
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
 const File = mongoose.model('File');
 const fileId = req.params.fileId;

 File.findById(fileId, function(err, file) {
   if (err) {
     console.error(err);
     return res.status(500).json(err);
   }
   if (!file) {
     return res.status(404).json({message: "File not found"});
   }

   file.title = req.body.title;
   file.description = req.body.description;
   file.user = req.body.user,
   file.expiration = req.body.expiration,

   file.save(function(err, savedFile) {
     if (err) {
       console.error(err);
       return res.status(500).json(err);
     }
     res.json(savedFile);
   })

 })
 });
/**
 * D - elete
 */
 router.delete('/file/:fileId', function(req, res, next) {
   const File = mongoose.model('File');
   const fileId = req.params.fileId;

   File.findById(fileId, function(err, file) {
     if (err) {
       console.log(err);
       return res.status(500).json(err);
     }
     if (!file) {
       return res.status(404).json({message: "File not found"});
     }

     file.deleted = true;

     file.save(function(err, doomedFile) {
       res.json(doomedFile);
     })

   })
 });
/**
 *  list
 */
 router.get('/account', function(req, res, next) {
   mongoose.model('File').find({deleted: {$ne: true}}, function(err, files) {
   if (err) {
     console.log(err);
     return res.status(500).json(err);
   }

   res.json(files);
 });
 });

 router.get('/file', function(req, res, next) {
    let q = mongoose.model('File')
    .find({deleted: {$ne: true}}).sort({field: 'desc', 'created_at': -1}).limit(3);
     q.exec(function(err, files) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      }

      res.json(files);
    });

  });

  /**
   *  Login / Sign Up routes
   */
    /*  POST register */
      router.post('/user', function(req, res, next) {
        const User = mongoose.model('User');

              // creat form input object
              const userProfile = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
              };

              // insert doc into mongodb
              User.create(userProfile, function (error, user) {
                if (error) {
                  return next(error);
                } else {
                  console.log('we posted the new user')
                }

              });
      });






module.exports = router;
