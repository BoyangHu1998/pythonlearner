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
    const filePath = "./tmp/python-scripts/" + uid.toString() + ".py";
    const fileData = req.body.content.toString();

    await writeFile(filePath, fileData)
        .then(() => {
            res.filePath = filePath
            next()
        })
        .catch((err) => console.log(err));
}

const runPyScript = async (req, res) => {
    let process
    const {classname, function_name} = req.body;
    if (typeof classname === "undefined" || typeof function_name === "undefined") {
        process = spawn('python', [res.filePath])
    } else {
        testcasesfilepath = './py_test_cases/' + classname + '.py'
        process = spawn('python', ['./services/python_test_case_runer.py', res.filePath, testcasesfilepath, function_name])
    }

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