var fs = require('fs');
var cheerio = require('cheerio');
var superagent = require('superagent');
var request = require('request');
var page = 1;

const URL = "http://www.qiushibaike.com/imgrank/page/";
const PAGE_SIZE = 2;

function fetchPage() {
    startRequest();
    // console.log(111)
}

function startRequest() {
    var url;
    url = URL + page;
    console.log('正在爬取：' + url);
    superagent
        .get(url)
        .end(function (err, response) {
            if (err) {
                console.log(err.status);
                return false;
            }
            if (response.status === 200) {
                var $ = cheerio.load(response.text);
            }
           console.log(222)
            saveImage($); //保存图片
            
            //递归获取
            if (++page <= PAGE_SIZE) {
                fetchPage();
            }
        });
}


//保存图片到./image/x.jpg
function saveImage($) {
    var link = '';
    var title = '';
    $('div.thumb img').each(function() {
        link = $(this).attr('src');
         request(link).pipe(fs.createWriteStream('./image/' + title + '.jpg'));
    });
   
  
}

fetchPage(); //开始爬虫
