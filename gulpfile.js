const { watch, series } = require('gulp'),
    spawn = require('child_process').spawn;

let runningProcess;

function watchTask(cb) {

    watch([
        '**/*.js',
        '!node_modules/**'
    ], runTask);

    cb();
}

function runTask(cb) {

    // Kill any running process.
    if (runningProcess) {
        runningProcess.kill();
    }

    // Launch new process.
    runningProcess = spawn('node', ['index.js'], { stdio: 'inherit' });

    // Attach handling in case the process crashes.
    runningProcess.on('close', function (exitCode) {
        if (exitCode === 8) {
            console.log('Error detected, wating for changes...');
        }
    });

    cb();
}

module.exports = {
    default: series(watchTask, runTask)
};
