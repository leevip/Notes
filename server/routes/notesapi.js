var express = require('express');
var router = express.Router();
const Note = require('../models/Note');
const {v4: uuidv4} = require('uuid');

//Get function, returns notes
router.get('/notes', function(req, res, next) {
    console.log('Get /notes');
    Note.find({}, (err, notes) => {
        if (err) {
            res.json({error: "Database error"}); //If an error occurs the backend server sends error message to frontend
        } else {
            res.json(notes);
        }
    })
});

//Get function, returns topic filtered notes
router.get('/notes/:topic', function(req, res, next) {
    console.log('Get topic');
    Note.find({topic: req.params.topic}, (err, notes) => {
        if (err) {
            res.json({error: "Database error"}); //If an error occurs the backend server sends error message to frontend
        }
        res.json(notes);
    })
});

//Post function, saves a new note to database and returns the note
router.post('/note', function(req, res, next) {
    console.log('POST /note');
    Note.create({
        note_id: uuidv4(),
        topic: req.body.topic,
        note_name: req.body.name,
        content: req.body.content,
        time: req.body.time
    },
    (err, ok) => {
        if(err) {
            res.json({error: "Error while creating note"}); //If an error occurs the backend server sends error message to frontend
        } else {
            return res.json(ok);
        }
    })
});


module.exports = router;