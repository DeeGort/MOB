const shell = require('electron').shell;
var url = '';
var container = '';
var item = '';
var nextbutton = '';
var searcharea = '';
var regex = '';
var results = null;

var totalCount = 0;
var currentCount = 0;

var jPageContent = null;

$( document ).ready(function() {
  $("#start").click(function() {
    // Get input values
    url =         $('#url').val();
    container =   $('#container').val();
    item =        $('#item').val();
    nextbutton =  $('#nextbutton').val();
    searcharea =  $('#searcharea').val();
    regex =       $('#regex').val();
    results =     $('#results');

    httpGet(url, pageProcessor);
  });
});

function pageProcessor(pageContent, url) {
  jPageContent = $(createHtml(pageContent));
  var containerContent = jPageContent.find(container);
  var items = containerContent.find(item);

  initProgressbar(items.length);

  items.each(function(index, value) {
    var link = $(value).attr("href");
    httpGet(link, itemProcessor);
  });
}

function itemProcessor(pageContent, url)
{
  var jPageContent = $(createHtml(pageContent));
  var containerContent = jPageContent.find(searcharea);

  if (containerContent.text().search(regex) !== -1){
    addResult(url);
  }

  updateProgressbar();
  checkForLast();
}

function checkForLast() {
  if (totalCount == currentCount)
    trunNextPage();
}

function trunNextPage() {
  var link = jPageContent.find(nextbutton).attr("href");
  if (link)
    httpGet(link, pageProcessor);
}

/*************/
/*   Tools   */
/*************/
function httpGet(url, callback)
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      callback(this.responseText, url);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();
}

function addResult(url) {
  results.append('<li><a href="#" onclick="shell.openExternal(\'' + url + '\')">' + url + '</a></li>');
}

function createHtml(content) {
  var html = document.createElement('html');
  html.innerHTML = content;

  return html;
}

function initProgressbar(count) {
  totalCount = count;
  currentCount = 0;
  $('#progress-bar').css('width', '0%');
}

function updateProgressbar() {
  currentCount++;
  $('#progress-bar').css('width', (((currentCount / totalCount) ) * 100) + '%');
}
