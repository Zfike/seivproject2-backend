const Course = require("../models/course.model.js");

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Course
    const course = new Course({

      dept: req.body.dept,
      courseNum: req.body.courseNum,
      level: req.body.level,
      hours: req.body.hours,
      name: req.body.name,
      description: req.body.description
    });
  
    // Save Course in the database
    Course.create(course, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Course."
        });
      else res.send(data);
    });
  };

// Retrieve all Courses from the database.
exports.findSome = (req, res) => {
  Course.getSome(req.query.start, req.query.length, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving courses."
      });
    else res.send(data);
  });
};

// Find a single Course with a courseID
exports.findOne = (req, res) => {
    Course.findById(req.params.courseID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.courseID}.`
          });
        } else {
          res.status(500).send({
            message: "Error retrieving Course with id " + req.params.courseID
          });
        }
      } else res.send(data);
    });
  };

// Update a Course identified by the courseID in the request
exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    Course.updateById(
      req.params.courseID,
      new Course(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Course with id ${req.params.courseID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Course with id " + req.params.courseID
            });
          }
        } else res.send(data);
      }
    );
  };

// Delete a Course with the specified courseID in the request
exports.delete = (req, res) => {
    Course.remove(req.params.courseID, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Course with id ${req.params.courseID}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Course with id " + req.params.courseID
          });
        }
      } else res.send({ message: `Course was deleted successfully!` });
    });
  };

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    Course.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all courses."
        });
      else res.send({ message: `All Courses were deleted successfully!` });
    });
  };