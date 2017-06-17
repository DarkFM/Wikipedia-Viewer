var searchBox = document.querySelector(".query");
var button = document.querySelector(".search-btn");
var contents = document.querySelector(".contents");

searchBox.addEventListener('focus', function(event) {
    searchBox.style.borderColor = "goldenrod";
    button.classList.add("move-inside");
    // console.log(searchBox);
});

searchBox.addEventListener('blur', function(event) {
    searchBox.style.border = "4px solid rgba(0,0,0,.4)";
    if(this.value == ""){
        button.classList.remove("move-inside");
    }else{
        searchBox.style.borderColor = "goldenrod";
    }
});

function getEntries() {

    $.ajax({

    })
}
