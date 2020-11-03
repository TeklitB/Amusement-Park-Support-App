class DataModel {
    constructor(worklogs, tasks) {
        this.worklogs = worklogs;
        this.taskList = tasks;
    }

    addWorklog(log) {
        this.worklogs.push(log);
    }

    addTask(task) {
        this.taskList.push(task);
    }

    sortTasks(tasks) {
        var i;
        for (i = 0; i < tasks.length; i++) {
            this.taskList[i] = tasks[i];
        }
    }
    
    sortLogs(logs) {
        var i;
        for (i = 0; i < logs.length; i++) {
            this.worklogs[i] = logs[i];
        }
    }

    getWorkLog(id) {
        const index = dataModel.worklogs.findIndex((task) => task._id === id);
        try {
            dataModel.worklogs[index];
        } catch (err) {
            console.log('couldn\'t find the object');
        }       
    }

    updateTaskStatus(id, status) {
        const index = dataModel.taskList.findIndex((task) => task._id === id);
        try {
            dataModel.taskList[index].status = status;
        } catch (err) {
            console.log('couldn\'t find the object');
        }

    }

    //Update the worklog status
    updateWorkLogStatus(id, status) {
        const index = dataModel.worklogs.findIndex((logs) => logs._id === id);
        try {
            dataModel.worklogs[index].status = status;
        } catch (err) {
            console.log('couldn\'t find the object');
        }

    }

    //Update worklog when assigned task is started
    updateStartedWorkLog(id, beginTime) {
        const index = dataModel.worklogs.findIndex((logs) => logs._id === id);
        try {
            dataModel.worklogs[index].startTime = beginTime;
        } catch (err) {
            console.log('couldn\'t find the object');
        }

    }

    updatePausedWorkLog(id, pausedAtTime) {
        const index = dataModel.worklogs.findIndex((logs) => logs._id === id);
        const timelineLength = dataModel.worklogs[index].timeline.length;
        const newTimelineEntry = {
            id: timelineLength,
            pausedAt: pausedAtTime
        };
        try {
            dataModel.worklogs[index].timeline.push(newTimelineEntry);
        } catch (err) {
            console.log('Failed to add new timeline entry for pausing');
        }
    }

    updateResumedWorkLog(id, resumedAtTime) {
        const index = dataModel.worklogs.findIndex((logs) => logs._id === id);
        const timelineLength = dataModel.worklogs[index].timeline.length;
        const timelineEntry = dataModel.worklogs[index].timeline[timelineLength-1];
        const newTimelineEntry = {
            id: timelineEntry.id,
            pausedAt: timelineEntry.pausedAt,
            resumedAt: resumedAtTime
        };
        try {
            dataModel.worklogs[index].timeline[timelineLength-1]=newTimelineEntry;
        } catch (err) {
            console.log('Failed to add new timeline entry for resume');
        }
    }

    //Update worklog when assigned task is completed
    updateCompletedWorkLog(id, lastTime) {
        const index = dataModel.worklogs.findIndex((logs) => logs._id === id);
        try {
            dataModel.worklogs[index].endTime = lastTime;
        } catch (err) {
            console.log('couldn\'t find the object');
        }

    }

    deleteTask(id) {
        const index = dataModel.taskList.findIndex((task) => task._id === id);
        try {
            dataModel.taskList.splice(index, 1);
        } catch (err) {
            return this.res.status(404).json({ message: 'task not found' });
        }
    }
}
let dataModel = new DataModel([], []);
module.exports.dataModel = dataModel;