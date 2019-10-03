var http = require("http");
var fs = require("fs");
var url = require("url");

var server = http.createServer();
var data = fs.readFileSync("data.json");
var data = (data + "");
var output = JSON.parse(data);


// var oData=
function product(id) {
    var productPage = fs.readFileSync("./product.html");
    productPage = productPage + "";
    productPage = productPage.replace(/{#image#}/g, output[id]["image"]);
    productPage = productPage.replace(/{#Description#}/g, output[id]["description"]);
    productPage = productPage.replace(/{#From#}/g, output[id]["from"]);
    productPage = productPage.replace(/{#Nutrients#}/g, output[id]["nutrients"]);
    productPage = productPage.replace(/{#quantity#}/g, output[id]["quantity"]);
    productPage = productPage.replace(/{#Price#}/g, output[id]["price"]);
    productPage = productPage.replace(/{#Productname#}/g, output[id]["productName"]);
    productPage = productPage.replace(/{#organic#/g, output[id]["organic"]);
    return productPage;
}
function overview(id) {
    var carddata = fs.readFileSync("./cardsTemplates.html");
    carddata = carddata + "";
    carddata = carddata.replace(/{#image#}/g, output[id]["image"]);
    carddata = carddata.replace(/{#Quantity#}/g, output[id]["quantity"]);
    carddata = carddata.replace(/{#Price#}/g, output[id]["price"]);
    carddata = carddata.replace(/{#productName#}/g, output[id]["productName"]);
    // carddata = carddata.replace(/{#Organic#}/g, output[id]["organic"]);
    if(output[id]["organic"]===false){
        carddata=carddata.replace(/{%NOT_ORGANIC%}/g,"not-organic");
    }
    return carddata;
}
var server = http.createServer(function (req, res) {
    // console.log(req.url);
    var parsedUrl = url.parse(req.url, true);
    // console.log(parsedUrl);
    if (req.url == "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.write((data));
    } else if (parsedUrl.pathname == "/product") {
        var id = parsedUrl.query.id;
        var ans = product(id);
        res.write(ans);
    } else if (req.url == "/overview" || req.url == "/" || req.url === "") {
        var reslt = "";
        for (var i = 0; i < output.length; i++) {
            reslt += overview(i);
        }
        var contdata = fs.readFileSync("./containerTemplate.html")+"";
        contdata = contdata.replace(/{#Cards#}/g,reslt);
        res.write(contdata);
    } else {
        // console.log(req.url);
        // console.log("``````");
        // var productId=url.parse(req.url,true).query.id;
        // console.log(parsedUrl);
        // console.log(productId);

        // console.log(url.parse(req.url,true));
        // res.write(req.url);
        // res.write(""+));

        // res.write("Error 404 Page Not found");
    }
    res.end();
});
var port=process.env.port||3000;
server.listen(port, function () {
    console.log("server is running at port 3000");
})