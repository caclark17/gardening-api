const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) => {
  const result = await mongodb.getDb().db('gardening').collection('gardening').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  const plantId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('gardening')
    .collection('gardening')
    .find({ _id: plantId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createPlant = async (req, res) => {
    const plant = {
        plantName: req.body.plantName, 
        hoursOfSun: req.body.hoursOfSun,
        goodNeighbors: req.body.goodNeighbors, 
        badNeighbors: req.body.badNeighbors,
        startIndoors: req.body.startIndoors,
        transplantOutdoors: req.body.transplantOutdoors
    };
    const response = await mongodb.getDB().db('gardening').collection('gardening').insertOne(plant);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'An error occurred while creating the plant.');
    }
};

const updatePlant = async (req, res) => {
    const plantId = new ObjectId(req.params.id);
    const plant = {
        plantName: req.body.plantName, 
        hoursOfSun: req.body.hoursOfSun,
        goodNeighbors: req.body.goodNeighbors, 
        badNeighbors: req.body.badNeighbors,
        startIndoors: req.body.startIndoors,
        transplantOutdoors: req.body.transplantOutdoors
    };
    const response = await mongodb
        .getDB()
        .db('gardening')
        .collection('gardening')
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
    const response = await mongodb.getDB().db('gardening').collection('gardening').deleteOne({ _id: plantId}, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'An error occurred while deleting the plant.');
    }
};

module.exports = { getAll, getSingle, createPlant, updatePlant, deletePlant };