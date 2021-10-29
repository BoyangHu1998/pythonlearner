/**
 * Run Json object python script from request
 */
const fs = require("fs");
const util = require('util');
const ID = require("nodejs-unique-numeric-id-generator");
const spawn = require("child_process").spawn;

const writeFile = util.promisify(fs.writeFile);


const writePyFile = async (req, res, next) => {
    const uid = req.verifiedUser._id
    const id = ID.generate(new Date().toJSON());
    const filePath = "./tmp/python-scripts/" + uid.toString() + "_" + id.toString() + ".py";
    const fileData = req.body.content.toString();

    await writeFile(filePath, fileData)
        .then(() => {
            res.filePath = filePath
            next()
        })
        .catch((err) => console.log(err));
}

const runPyScript = async (req, res) => {
    const process = spawn('python', [res.filePath]);

    process.stdout.on('data', function (data) {
        res.write(data.toString());
        console.log(data.toString());
    })

    process.stderr.on('data', function (data) {
        res.write(data.toString());
    })

    process.stdout.on('error', function (err) {
        res.write("stdout err: " + err);
    })

    process.stderr.on('error', function (err) {
        res.write("stderr err: " + err);
    })

    process.on('close', function (code) {
        res.write('Return ' + code.toString());
        res.end();
        fs.unlink(res.filePath, (err, res) => {
            if (err) console.log('Error: Fail to delete script file:' + err);
        });
    })
}

module.exports = { writePyFile, runPyScript }