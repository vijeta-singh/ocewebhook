
var express = require('express');
//var Blob = require('blob');

var router = express.Router();
const axios = require('axios');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(bodyParser.raw());
const ApiBaseUrl = 'https://workshop4-oce0002.cec.ocp.oraclecloud.com/content/management/api/v1.1/';
const token = 'eyJ4NXQjUzI1NiI6IlVUdWFCZmRaVmppVHNFNDFubkJuN0YwdVZyWVV2Q3NPbjJCd2JxT0NzWE0iLCJ4NXQiOiJqX0E2bVpiRzNLMmNhb1ZtVWM5RlJnei1HX3MiLCJraWQiOiJTSUdOSU5HX0tFWSIsImFsZyI6IlJTMjU2In0.eyJ1c2VyX3R6IjoiQW1lcmljYVwvQ2hpY2FnbyIsInN1YiI6InZpbmF5Lngua3VtYXJAb3JhY2xlLmNvbSIsInVzZXJfbG9jYWxlIjoiZW4iLCJpZHBfbmFtZSI6ImxvY2FsSURQIiwidXNlci50ZW5hbnQubmFtZSI6ImlkY3MtYTllMGYxMTllM2QwNGVlZmFkODI4N2I1ODRiMTAzNTQiLCJpZHBfZ3VpZCI6ImxvY2FsSURQIiwiYW1yIjpbIlVTRVJOQU1FX1BBU1NXT1JEIl0sImlzcyI6Imh0dHBzOlwvXC9pZGVudGl0eS5vcmFjbGVjbG91ZC5jb21cLyIsInVzZXJfdGVuYW50bmFtZSI6ImlkY3MtYTllMGYxMTllM2QwNGVlZmFkODI4N2I1ODRiMTAzNTQiLCJjbGllbnRfaWQiOiJFNTc5NTVCRTc4RjU0NDMwOUZBQjVFNERBMEJBQ0UzQV9BUFBJRCIsInN1Yl90eXBlIjoidXNlciIsInNjb3BlIjoib2ZmbGluZV9hY2Nlc3MgdXJuOm9wYzpjZWM6YWxsIiwiY2xpZW50X3RlbmFudG5hbWUiOiJpZGNzLWE5ZTBmMTE5ZTNkMDRlZWZhZDgyODdiNTg0YjEwMzU0IiwidXNlcl9sYW5nIjoiZW4iLCJleHAiOjE1OTI4MDU5OTIsImlhdCI6MTU5MjIwMTE5MiwiY2xpZW50X2d1aWQiOiJhNzNjODlkYjlmZjE0ZGY4YWM5M2RjZGY0MjkyNGU3ZiIsImNsaWVudF9uYW1lIjoiQ0VDU0FVVE9fd29ya3Nob3A0Q0VDU0FVVE8iLCJpZHBfdHlwZSI6IkxPQ0FMIiwidGVuYW50IjoiaWRjcy1hOWUwZjExOWUzZDA0ZWVmYWQ4Mjg3YjU4NGIxMDM1NCIsImp0aSI6ImNlZTBkMzExLTc0YjQtNDc2Yy05NmZhLTkzYTIxYmQ1MjM2OCIsInVzZXJfZGlzcGxheW5hbWUiOiJWaW5heSBLdW1hciIsInN1Yl9tYXBwaW5nYXR0ciI6InVzZXJOYW1lIiwicHJpbVRlbmFudCI6dHJ1ZSwidG9rX3R5cGUiOiJBVCIsImNhX2d1aWQiOiJjYWNjdC03MTQzMDU3YzYyZDc0YWUxOTk1OWM5YzdhMjZjOTRhNCIsImF1ZCI6WyJodHRwczpcL1wvRTU3OTU1QkU3OEY1NDQzMDlGQUI1RTREQTBCQUNFM0EuY2VjLm9jcC5vcmFjbGVjbG91ZC5jb206NDQzXC9kb2N1bWVudHNcL2ludGVncmF0aW9uXC9zb2NpYWwiLCJ1cm46b3BjOmxiYWFzOmxvZ2ljYWxndWlkPUU1Nzk1NUJFNzhGNTQ0MzA5RkFCNUU0REEwQkFDRTNBIiwiaHR0cHM6XC9cL0U1Nzk1NUJFNzhGNTQ0MzA5RkFCNUU0REEwQkFDRTNBLmNlYy5vY3Aub3JhY2xlY2xvdWQuY29tOjQ0M1wvb3NuXC9zb2NpYWxcL2FwaSIsImh0dHBzOlwvXC9FNTc5NTVCRTc4RjU0NDMwOUZBQjVFNERBMEJBQ0UzQS5jZWMub2NwLm9yYWNsZWNsb3VkLmNvbTo0NDNcLyJdLCJ1c2VyX2lkIjoiZWM1ODA1ODgxZWQxNDdlODkyOTEwOWMyYzZlNmMxMmYiLCJ0ZW5hbnRfaXNzIjoiaHR0cHM6XC9cL2lkY3MtYTllMGYxMTllM2QwNGVlZmFkODI4N2I1ODRiMTAzNTQuaWRlbnRpdHkub3JhY2xlY2xvdWQuY29tIn0.MiCPkiFV9WpXI4r6Leyn9C_jqIuw-l7Vpf2ZZR-6MageeR48jiooe4BNQUJJFyv2aM4oBB8Ou4l8KOS78-AXzwrX-vgJ5AZM6Ym4XUusOaOGkHbP8EFvLiOsrlIHZV244y-XnXxgwqruQ1QDmYpxyU6iXNQNo2O6ztQWc8AC3BENuUbrcRj-8wHS6x3ahwsN9EgOiIdWYN3lddbR7Ky4eEYypTEhDPo8ocUficyt-UShyanJnmURNtx8BYWmxN6QVgZkCJvxKnXe8vP6MknUK10k5vK1Vg3ZqF2n1mO5_FmW5eg0iVyGFjWNB8TELWE_kR49Jmb5yyUyUdW9qbJ2TA';
const Fs = require('fs')
var ContentId = '';
var fileName="";
const repositoryId = '4B7DBFA4F8ED4504A65C023486C81455';
var contentData ='';

/* GET home page. */

router.post('/', (req, res) => {
    if(req.body.event.name === 'DIGITALASSET_CREATED' && repositoryId === req.body.entity.repositoryId) {
        ContentId = req.body.entity.id;
        downloadContent(res)
    }
    // } else if(req.body.event.name === 'CONTENTITEM_CREATED' && repositoryId === req.body.entity.repositoryId){
    //     var ContentItemId = req.body.entity.id;
    //     getContentDetails(ContentItemId);
    // } 
    else {
        res.sendStatus(200)
    }
    

});

router.get('/', (req, res) => {

    //downloadContent(res)
    res.sendStatus(200)
});
function getContentDetails(ContentItemId) {
    var contentApiUrl = ApiBaseUrl + 'items/' + ContentItemId + '/';
    var header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',

        },
        responseType: 'application/json'
    }
     axios.get(contentApiUrl, header, { responseType: 'stream' })
        .then(response => {
            //console.log(response.header);
            //console.log(response.data);
            if(response.data.type === 'StaticSite') {
                contenDdata = response.data
                downloadThumbnail(contenDdata.fields.thumbnail.id);
                 createSite(contentData);
            } else {
                res.sendStatus(200)
                return;
            }
             
        })
        .catch(error => {
            console.log(error);
            res.status(400).send({
                Error: error
            });
            return;
        });
    
}
function downloadThumbnail(thumbnailId) {

}
async function createSite(contentData) {
    siteName = contentData.name;
    siteTemplate = 'StarterTemplate';
    siteUrl = ApiBaseUrl + '/sites';
    var payload = {
        "name" : siteName,
        "template" : siteTemplate,
        "thumbnail" : {
            "url" : "",
            "imageType" : "thumbnail"
        }
    }
    var header = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'

        }
    }

}

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
    //Imports the Google Cloud client library
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    // Performs label detection on the image file
    const [result] = await client.textDetection(fileName)
    
   const detections = result.textAnnotations;


    console.log('Text:');
    //console.log(detections[0].description)
    //console.log(detections.description)
    //detections.forEach(text => console.log(text));
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