const res = require('express/lib/response');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb
      .getDb()
      .db('gardening')
      .collection('plants')
      .find();
      result.toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
} catch (err) {
  res.status(204).send();
}
};

  const getSingle = async (req, res) => {
    try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Must use a valid contact id to find a contact.');
    }
    const plantId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db('gardening')
      .collection('plants')
      .find({ _id: plantId });
      result.toArray((err, result) => {
        if (err) {
          res.status(400).json({ message: err });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result[0]);
      });
} catch (err) {
  res.status(204).send();
}
};

const createPlant = async (req, res) => {
    try {
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
  } catch (err) {
    res.status(204).send();
  }
  };

const updatePlant = async (req, res) => {
    try {
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
} catch (err) {
  res.status(204).send();
}
};

const deletePlant = async (req, res) => {
    try {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must use a valid plant id to update a plant.');
     }
    const plantId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db('gardening').collection('plants').deleteOne({ _id: plantId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the plant.');
    }
} catch (err) {
  res.status(204).send();
}
};

module.exports = { getAll, getSingle, createPlant, updatePlant, deletePlant };