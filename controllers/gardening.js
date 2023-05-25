const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = (req, res) => {
    mongodb
      .getDb()
      .db('gardening')
      .collection('plants')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  };

  const getSingle = (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db('gardening')
      .collection('plants')
      .find({ _id: plantId })
      .toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
  };

const createPlant = async (req, res) => {
    const plant = {
        plantName: req.body.plantName, 
        hoursOfSun: req.body.hoursOfSun,
        goodNeighbors: req.body.goodNeighbors, 
        badNeighbors: req.body.badNeighbors,
        startIndoors: req.body.startIndoors,
        transplantOutdoors: req.body.transplantOutdoors,
        numPerSqFt: req.body.numPerSqFt
    };
    const response = await mongodb.getDb().db('gardening').collection('plants').insertOne(plant);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the plant.');
    }
};

const updatePlant = async (req, res) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid plant id to update a plant.');
      }
    const plantId = new ObjectId(req.params.id);
    const plant = {
        plantName: req.body.plantName, 
        hoursOfSun: req.body.hoursOfSun,
        goodNeighbors: req.body.goodNeighbors, 
        badNeighbors: req.body.badNeighbors,
        startIndoors: req.body.startIndoors,
        transplantOutdoors: req.body.transplantOutdoors,
        numPerSqFt: req.body.numPerSqFt
    };
    const response = await mongodb
        .getDb()
        .db('gardening')
        .collection('plants')
        .replaceOne({ _id: plantId }, plant);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while updating the plant.');
    }
};

const deletePlant = async (req, res) => {
    const plantId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('gardening').collection('plants').deleteOne({ _id: plantId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the plant.');
    }
};

module.exports = { getAll, getSingle, createPlant, updatePlant, deletePlant };