var search = "";
$(document).ready(function(){
    search = document.getElementById("search").value;
});

/******************************************

All the function does is
1.  Search the wikipedia api for a keyword and returns the json object to the page
2.  Fill the page with element and attributes and the returned date embeded in those elements

*****************************************/

function wiki_page(){
    var keyword = document.getElementById("search").value;
    $.getJSON("https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch="+keyword+"&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&callback=?", function(json){
        var stack = json.query.pages;
        document.getElementById("wikiInfo").innerHTML = "";
        var attr_count = "", count = 1; 
    for(key in stack){
        attr_count = "count_"+count;
        var container = document.createElement("DIV"); container.setAttribute("id", "each");
        var div = document.createElement("A");
        var attr = document.createAttribute("class");
        var href = document.createAttribute("href");
        var target = document.createAttribute("target");
        var cont_attr = document.createAttribute("class");
        cont_attr.value = "cont_attr";
        attr.value = attr_count;
        href.value = "http://en.wikipedia.org/?curid="+stack[key].pageid;
        target.value = "_blank";
        div.setAttributeNode(attr);
        div.setAttributeNode(href);
        div.setAttributeNode(target);
        var h2 = document.createElement("H2");
        var title_text = document.createTextNode(stack[key].title);
        var paragraph = document.createElement("P");
        var snippet = document.createTextNode(stack[key].extract);
        div.appendChild(h2);
        div.appendChild(paragraph);
        h2.appendChild(title_text);
        container.appendChild(div);
        paragraph.appendChild(snippet);
        document.getElementById("wikiInfo").appendChild(container);
        count += 1;
//        console.log(attr_count);
    }
//    console.log(json);
  }); 
}
