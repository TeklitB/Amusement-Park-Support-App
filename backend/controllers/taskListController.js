/* eslint-disable no-useless-escape */
var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const { check, validationResult } = require('express-validator');
var dataModel = require('../Model/dataModel').dataModel;

dataModel.taskList = [
    {
        title: 'Fixing',
        description:
            'The window at the caffetera was broken that needed urgent replacement. I ordered a new window and installed it.',
        startTime: '2020-04-20 13:30:00',
        endTime: '2020-04-20 13:15:00',
        status: 'PUBLISHED',
        priority: 'HIGH',
        timeline: [],
        _id: 'f27add4e-2ca1-4f66-8104-8dc4609f889a',
    },
    {
        title: 'Renovation',
        description:
            'The ghost house was renovated today with some touch up paint at the entrance side of it.',
        startTime: '2020-04-24T14:06:00.513Z',
        endTime: '2020-04-24T14:29:00.513Z',
        status: 'PUBLISHED',
        priority: 'LOW',
        timeline: [],
        _id: 'f9dc52b5-6d5d-40c1-a9d2-ded466690e07',
    },
    {
        title: 'Cleaning',
        description: 'Clean the parking area.',
        startTime: '2020-04-20 13:30:00',
        endTime: '2020-04-20 13:15:00',
        status: 'PUBLISHED',
        priority: 'MEDIUM',
        timeline: [],
        _id: '76d268b1-14d9-4659-b1ec-702ab0b22a8a',
    },
];
const timeRegularExpression = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

// Return a list of all task
router.get('/', function (req, res) {
    var openTasks = dataModel.taskList.filter((item) => {
        return item.status == 'PUBLISHED';
    });
    res.json({ taskList: openTasks });
});
// Create a new task
router.post(
    '/',
    [
        check('title').isString(),
        check('description').isString(),
        check('startTime').matches(timeRegularExpression),
        check('endTime').matches(timeRegularExpression),
        check('status').isString(),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var task = new Object(req.body);
        console.log('this is: ', task);
        task._id = uuidv4();
        dataModel.taskList.push(task);
        res.status(201).json(task);
    }
);

//Update the order of the sorted tasks
router.patch('/:tasks', [], (req, res) => {
    const taskList = req.body;
    dataModel.sortTasks(taskList);
    var openTasks = dataModel.taskList.filter((item) => {
        return item.status == 'PUBLISHED';
    });
    res.json({ taskList : openTasks});
});

//Update the status of a specific task
router.patch('/', [], (req, res) => {
    const id = req.body._id;
    const newState = req.body.status;
    const taskObject = req.body;

    dataModel.updateTaskStatus(id, newState);

    if (newState == 'TAKEN') {
        const newWorkLog = {
            _id: taskObject._id,
            task: taskObject.title,
            description: taskObject.description,
            priority: taskObject.priority,
            startTime: '',
            endTime: '',
            timeline: [],
            status: 'UNSTARTED'
        };
        dataModel.deleteTask(id);
        dataModel.addWorklog(newWorkLog);
    }
    res.status(202).json(taskObject);
});

// Return the task with the given ID
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var index = dataModel.taskList.findIndex((task) => task._id === id);
    res.json(dataModel.taskList[index]);
});

// Delete the task with the given ID
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log(`deletion of ${id}`);
    var index = dataModel.taskList.findIndex((task) => task._id === id);
    var task = new Object(task[index]);
    try {
        task.splice(index, 1);
    } catch (err) {
        return res.status(404).json({ message: 'Selected task not found!' });
    }
    res.json(task);
});

module.exports = router;
