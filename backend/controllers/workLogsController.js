/* eslint-disable no-useless-escape */
var express = require('express');
var router = express.Router();
const uuidv4 = require('uuid/v4');
const { check, validationResult } = require('express-validator');
var dataModel = require('../Model/dataModel').dataModel;

const timeRegularExpression = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;

dataModel.worklogs = [];

// Return a list of all workLogs
router.get('/', function (req, res) {
    res.json({ workLogs: dataModel.worklogs });
});

// Create a new work log
router.post(
    '/',
    [
        check('task').isString(),
        check('description').isString(),
        check('startTime').matches(timeRegularExpression),
        check('endTime').matches(timeRegularExpression)
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        var logs = new Object(req.body);
        console.log('this is: ', logs);
        logs._id = uuidv4();
        dataModel.addWorklog(logs);
        res.status(201).json(logs);
    }
);

//Update the order of the sorted logs
router.patch('/:worklogs', [], (req, res) => {
    const workLogList = req.body;
    dataModel.sortLogs(workLogList);
    res.status(201).json({ workLogs: dataModel.worklogs });
});

//Update status, start time, and end time of an assigened task in work log
router.patch('/', [], (req, res) => {
    const id = req.body._id;
    const newState = req.body.status;

    const worklog = dataModel.getWorkLog(id);
    // Check if status change is valid
    if (worklog && (worklog.status !== 'STARTED' && newState === 'PAUSED')) {
        res.status(400).json({msg: 'Cannot pause a worklog that is not started'});
    } else if (worklog && (worklog.status !== 'PAUSED' && newState === 'RESUMED')) {
        res.status(400).json({msg: 'Cannot resume a worklog that is not paused'});
    } else {
        //Update status of task
        dataModel.updateTaskStatus(id, newState);
        dataModel.updateWorkLogStatus(id, newState);

        var today;
        var date;
        var time;
        var dateTime;
        //Update start time when assigned task is started
        if (newState == 'STARTED') {
            today = new Date();
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            dateTime = date + ' ' + time;

            dataModel.updateStartedWorkLog(id, dateTime);
        }

        else if (newState === 'PAUSED') {
            today = new Date();
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            dateTime = date + ' ' + time;

            dataModel.updatePausedWorkLog(id, dateTime);
        }

        else if (newState === 'RESUMED') {
            today = new Date();
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            dateTime = date + ' ' + time;

            dataModel.updateResumedWorkLog(id, dateTime);
        }

        //Update end time when assigned task is completed
        else if (newState == 'COMPLETED') {
            today = new Date();
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
            var endingTime = date + ' ' + time;

            dataModel.updateCompletedWorkLog(id, endingTime);
        }
        res.status(202).json(dataModel.getWorkLog(id));
    }
});

// Return the logs with the given ID
router.get('/:id', function (req, res) {
    var id = req.params.id;
    var index = dataModel.worklogs.findIndex((logs) => logs._id === id);
    res.json(dataModel.worklogs[index]);
});

// Delete the logs with the given ID
router.delete('/:id', function (req, res) {
    var id = req.params.id;
    console.log(`deletion of ${id}`);
    var index = dataModel.worklogs.findIndex((logs) => logs._id === id);
    var logs = new Object(dataModel.worklogs[index]);
    try {
        dataModel.worklogs.splice(index, 1);
    } catch (err) {
        return res.status(404).json({ message: 'logs not found' });
    }
    res.json(logs);
});

module.exports = router;
