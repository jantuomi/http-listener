#!/usr/bin/env node

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const argv = require('minimist')(process.argv.slice(2));
const express = require('express');
const app = express();
const morgan = require('morgan');
app.use(morgan('tiny'));

const command = argv.exec || 'echo "Echo working!"';
const port = argv.p || 8080;
const method = argv.method || 'GET';
const path = argv.path || '/';

async function runCommand() {
    const { stdout, stderr } = await exec(command);
    if (stdout.trim().length > 0) {
        console.log('stdout:', stdout);
    }
    if (stderr.trim().length > 0) {
        console.log('stderr:', stderr);
    }
    return stdout;
};

const method_attr = method.toLowerCase();
app[method_attr](path, async (req, res) => {
    try {
        const output = await runCommand();
        res.send(output);
    } catch (err) {
        res.send(String(err));
        console.error(err);
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}!`);
    console.log(`HTTP method: ${method_attr}, path: ${path}`);
    console.log(`Shell command: "${command}"`);
});
