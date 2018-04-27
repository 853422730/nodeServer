
var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var multer = require('multer');
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({dest:'/tmp/'}).array('image'));

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "/src/index.html" );
})

app.post('/file_upload',function(req,res){
    console.log(req.files[0]);
    var des_file = __dirname + '/' + req.files[0].originalname;
    fs.readFile(req.files[0].path,function(err){
        if(err){
            console.log(err);
        }else{
            var response = {
                message:'file uploaded successfully',
                filename:req.files[0].originalname
            };
        }
        console.log(response);
        res.end(JSON.stringify(response));
    })
})

app.get('/process_get', function (req, res) {

    // 输出 JSON 格式
    var response = {
        "first_name":req.query.first_name,
        "last_name":req.query.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
})



var server = app.listen(8888,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('访问地址http://%s:%s',host,port);
});