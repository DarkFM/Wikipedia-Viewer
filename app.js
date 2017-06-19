var searchBox = document.querySelector(".query");
var button = document.querySelector(".search-btn");
var contents = document.querySelector(".contents");
var form = document.getElementById('myform');
var header = document.querySelector("header");
var searchedItem = "";

searchBox.addEventListener('focus', function(event) {
    searchBox.style.borderColor = "goldenrod";
    button.classList.add("move-inside");

});

searchBox.addEventListener('blur', function(event) {
    searchBox.style.border = "4px solid rgba(0,0,0,.4)";
    if (this.value == "") {
        button.classList.remove("move-inside");
    } else {
        searchBox.style.borderColor = "goldenrod";
    }
});

form.addEventListener("submit", function(event) {
    event.preventDefault(); // prevents the deafult submit action on form which reloads pages
    console.log(searchedItem);
    if(searchBox.value == searchedItem){
        return;
    }

    if (searchBox.value == "") {
        fadeOut();
        return;
    }
    contents.innerHTML = "";
    getEntries(searchBox.value);
});

// used to fade out results when no input is given
function fadeOut() {
    var wrap = document.querySelector(".content-wrapper");
    wrap.classList.add("fadeOutDown");
    setTimeout(function() {
        wrap.classList.add("remove-content");
    }, 500);
}

button.addEventListener("click", function(event) {
    if(searchBox.value == searchedItem){
        return;
    }

    if (searchBox.value == "") {
        fadeOut();
        return;
    }

    contents.innerHTML = "";
    getEntries(searchBox.value);
});

function getEntries(searchQuery) {

    searchedItem = searchQuery;
    $.ajax({
        type: "GET",
        url: "https://en.wikipedia.org/w/api.php",
        dataType: "jsonp",
        // headers: {
        //     'Api-User-Agent': 'c.bestmann@hotmail.com',
        //     "Accept": "application/json; charset=utf-8",
        //     "Content-Type": "application/javascript; charset=utf-8",
        //     "Access-Control-Allow-Origin": "*"
        // },
        // jsonpCallback: "displaySearch",
        data: {
            "action": "opensearch",
            "format": "json",
            "search": searchQuery,
            "namespace": "0",
            limit: "15",
            profile: "normal"
        },
        success: function(data) {
            data = data.filter(function(val, i, arr) {
                return (typeof val === "object");
            });

            var topDiv = document.createElement("div");
            topDiv.classList.add("content-wrapper");
            topDiv.classList.add("animated");

            for (var i = 0; i < data[0].length; i++) {
                var div = document.createElement('div');
                div.classList.add("article-container")

                var article = document.createElement('article');
                var h2 = document.createElement("h2");
                var para = document.createElement("p");
                var link = document.createElement("a");

                article.classList.add("article");
                para.classList.add("description");
                h2.innerText = data[0][i];

                para.innerText = (!data[1][i]) ? "No description to display" : data[1][i];
                link.href = data[2][i];
                link.setAttribute("target", "_blank");

                link.appendChild(h2);
                link.appendChild(para);

                article.appendChild(link);
                article.classList.add("animated");
                article.classList.add((i % 2) ? "slideInLeft" : "slideInRight");
                div.appendChild(article);

                topDiv.appendChild(div);
            }
            contents.appendChild(topDiv)
        }
    });

}
