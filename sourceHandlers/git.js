const SourceHandler = require('./sourceHandler');
const childProcess = require('child_process');

const TIME_OUT = 300000;

class GitHandler extends SourceHandler {
  fetch(callback) {
    const cloneProcess = childProcess.spawn('git', ['clone', this.url, '-n']);

    cloneProcess.stdout.on('data', (data) => {
      console.log(data);
    });

    cloneProcess.stderr.on('data', (data) => {
      console.log(`error with data: ${data}`);
    });

    cloneProcess.on('close', (code) => {
      callback(null, [new Error('Not finished implementing GitHandler')]);
      console.log(`closed with code ${code}`);
    });

    setTimeout(() => {
      cloneProcess.kill();
    }, TIME_OUT);
  }
}

module.exports = GitHandler;
