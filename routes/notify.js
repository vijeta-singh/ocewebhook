console.log("notify")
var express = require('express');
//var Blob = require('blob');
const Blob = require('node-fetch');
var router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');
const https = require('https');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
const ApiBaseUrl = 'https://workshop4-oce0002.cec.ocp.oraclecloud.com/content/management/api/v1.1/';
const token = 'eyJ4NXQjUzI1NiI6IlVUdWFCZmRaVmppVHNFNDFubkJuN0YwdVZyWVV2Q3NPbjJCd2JxT0NzWE0iLCJ4NXQiOiJqX0E2bVpiRzNLMmNhb1ZtVWM5RlJnei1HX3MiLCJraWQiOiJTSUdOSU5HX0tFWSIsImFsZyI6IlJTMjU2In0.eyJ1c2VyX3R6IjoiQW1lcmljYVwvQ2hpY2FnbyIsInN1YiI6InZpbmF5Lngua3VtYXJAb3JhY2xlLmNvbSIsInVzZXJfbG9jYWxlIjoiZW4iLCJpZHBfbmFtZSI6ImxvY2FsSURQIiwidXNlci50ZW5hbnQubmFtZSI6ImlkY3MtYTllMGYxMTllM2QwNGVlZmFkODI4N2I1ODRiMTAzNTQiLCJpZHBfZ3VpZCI6ImxvY2FsSURQIiwiYW1yIjpbIlVTRVJOQU1FX1BBU1NXT1JEIl0sImlzcyI6Imh0dHBzOlwvXC9pZGVudGl0eS5vcmFjbGVjbG91ZC5jb21cLyIsInVzZXJfdGVuYW50bmFtZSI6ImlkY3MtYTllMGYxMTllM2QwNGVlZmFkODI4N2I1ODRiMTAzNTQiLCJjbGllbnRfaWQiOiJFNTc5NTVCRTc4RjU0NDMwOUZBQjVFNERBMEJBQ0UzQV9BUFBJRCIsInN1Yl90eXBlIjoidXNlciIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MgdXJuOm9wYzpjZWM6YWxsIiwiY2xpZW50X3RlbmFudG5hbWUiOiJpZGNzLWE5ZTBmMTE5ZTNkMDRlZWZhZDgyODdiNTg0YjEwMzU0IiwidXNlcl9sYW5nIjoiZW4iLCJleHAiOjE1ODg5MTkxNDQsImlhdCI6MTU4ODMxNDM0NCwiY2xpZW50X2d1aWQiOiJhNzNjODlkYjlmZjE0ZGY4YWM5M2RjZGY0MjkyNGU3ZiIsImNsaWVudF9uYW1lIjoiQ0VDU0FVVE9fd29ya3Nob3A0Q0VDU0FVVE8iLCJpZHBfdHlwZSI6IkxPQ0FMIiwidGVuYW50IjoiaWRjcy1hOWUwZjExOWUzZDA0ZWVmYWQ4Mjg3YjU4NGIxMDM1NCIsImp0aSI6IjI0MmE4ZTM2LTk5M2QtNDI0OC04NWEyLTdkYzI4YmUzOTMxZCIsInVzZXJfZGlzcGxheW5hbWUiOiJWaW5heSBLdW1hciIsInN1Yl9tYXBwaW5nYXR0ciI6InVzZXJOYW1lIiwicHJpbVRlbmFudCI6dHJ1ZSwidG9rX3R5cGUiOiJBVCIsImNhX2d1aWQiOiJjYWNjdC03MTQzMDU3YzYyZDc0YWUxOTk1OWM5YzdhMjZjOTRhNCIsImF1ZCI6WyJodHRwczpcL1wvRTU3OTU1QkU3OEY1NDQzMDlGQUI1RTREQTBCQUNFM0EuY2VjLm9jcC5vcmFjbGVjbG91ZC5jb206NDQzXC9kb2N1bWVudHNcL2ludGVncmF0aW9uXC9zb2NpYWwiLCJ1cm46b3BjOmxiYWFzOmxvZ2ljYWxndWlkPUU1Nzk1NUJFNzhGNTQ0MzA5RkFCNUU0REEwQkFDRTNBIiwiaHR0cHM6XC9cL0U1Nzk1NUJFNzhGNTQ0MzA5RkFCNUU0REEwQkFDRTNBLmNlYy5vY3Aub3JhY2xlY2xvdWQuY29tOjQ0M1wvb3NuXC9zb2NpYWxcL2FwaSIsImh0dHBzOlwvXC9FNTc5NTVCRTc4RjU0NDMwOUZBQjVFNERBMEJBQ0UzQS5jZWMub2NwLm9yYWNsZWNsb3VkLmNvbTo0NDNcLyJdLCJ1c2VyX2lkIjoiZWM1ODA1ODgxZWQxNDdlODkyOTEwOWMyYzZlNmMxMmYiLCJ0ZW5hbnRfaXNzIjoiaHR0cHM6XC9cL2lkY3MtYTllMGYxMTllM2QwNGVlZmFkODI4N2I1ODRiMTAzNTQuaWRlbnRpdHkub3JhY2xlY2xvdWQuY29tIn0.ldgP7Pa5qF_EVGeIx7_75x1WJ5JhwJK_aiVyZhIVXaW1tIg6YA9dxlmUXCqfI2KB8cnAdFNVVMv13ILhpEd97a2se_8O5VlJE7jmKbrn1fiKz2t_bDClG8d0GAU59IS4ov30v0b6MSrr1cCJ3tpkMf7ZIdym1yeStjCInCGXLmeIiUeyGU1KxrF3AA-dEYeIkYamUy-GJfHZygBGM-W3tJEwJpLiyIlHzrnkZ1TN7G4lCiEsJUlcV8O5tAQg1YkCUHO1JRXELsXsHNNl6HrhfQknMJRamlBNjnCbqxVQh5ojdYRdr1cyfIV5ARi4jA7W-nSAhxJ3v8gVZecRrE6ODA';
const Fs = require('fs')
const ContentId = 'CONT75630312A09042808A1A6C5EE1C41780';
var fileName="";

/* GET home page. */

router.post('/', (req, res) => {

    downloadContent(res)
    //res.sendStatus(200)
});

router.get('/', (req, res) => {

    //downloadContent(res)
    res.sendStatus(200)
});

async function downloadContent(res) {

    var imageApiUrl = ApiBaseUrl + 'assets/' + ContentId + '/native';
    var header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        responseType: 'stream'
    }

    await axios.get(imageApiUrl, header, { responseType: 'stream' })
        .then(response => {
            //console.log(response.data);

            resContentType = response.headers['content-type'];

            if (resContentType.indexOf('image/') > -1) {
                var ext = resContentType.replace('image/', '');
                 fileName = ContentId + "." + ext;
                var writer = Fs.createWriteStream(fileName);
            } else {
                console.log("Content is not image");
                res.status(400).send({
                    Error: 'Content is not an image!'
                });
                return;
            }
            var stream = response.data.pipe(writer)
            stream.on('finish', () => {
                quickstart(res, fileName);
            })
            //imageNode.src = imgUrl
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({
                Error: error
            });
            return;
        });

}
async function quickstart(res, fileName) {
    console.log("calling google api")
    // const description = 'WELCOME TO\n' +
    //     'WORLD\n' +
    //     'CONGRESS\n' +
    //     'BOSTON\n' +
    //     'July 28–31, 2019\n' +
    //     'NCMA\n' +
    //     'NATIONAL CONTRACT MANAGEMENT ASSOCIATION\n' +
    //     'CONNECTING TO\n' +
    //     "CREATE WHAT'S NEXT\n" +
    //     'MAYOR MARTIN J. WALSH\n'
    // Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.textDetection(fileName)
    // .then(() => {
    //     console.log("google api call")
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.status(400).send({
    //         Error : error
    //     });
    //     return;
    // });
    const detections = result.textAnnotations;


    // console.log('Text:');
    // console.log(detections[0].description)
    // //console.log(detections.description)
    // //detections.forEach(text => console.log(text));
    var description = detections[0].description;

    var splitedText = description.split('\n')

    splitedText.pop();
    updateContent(splitedText, res);
}
function updateContent(splitedText, res) {

    const contentUrl = ApiBaseUrl + 'bulkItemsOperations';
    var tags = {};
    tags = splitedText.map(text => {
        return { 'name': text }
    })
    //console.log(tags);
    var payload = {
        "q": "id eq \"" + ContentId + "\"",
        "operations": {
            "addTags": {
                "tags": tags
            }
        }
    }
    var header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'

        }
    }
    //console.log(contentUrl);
    //console.log(payload);
    axios.post(contentUrl, payload, header)
        .then(function (response) {
            //console.log(response);

            Fs.unlink(fileName, (err) => {
                if (err) throw err;
                console.log('successfully deleted '+fileName);
            });
            res.sendStatus(200)
        })
        .catch(function (error) {
            console.log(error);

        });
}
module.exports = router;