let categories = [];

const GROUP_NAME = "Apps";

$.typeahead({
    input: '.js-typeahead-game_v1',
    minLength: 1,
    maxItem: 0,
    order: "asc",
    hint: true,
    highlight:false,
    debug:true,
    group: true,
    maxItemPerGroup: 7,
    emptyTemplate: "",
    // groupTemplate:"{{group-name}}",
    // dropdownFilter: "all",
    source: {
            auto_suggestion: {
                ajax: {
                    url: "http://www.mocky.io/v2/5b47658f2f0000690048154e",
                    dataType: "jsonp",
                    path: "data"
            }
        }
    },
    callback: {
        onClick: function (node, a, item, event) {
            window.open(
                "https://www.google.com/search?q=" +
                    // item.group + "/" +
                    // item.id + "/" +
                    item.display.replace(/[\s]|:\s/g, "-")
                        .replace("'", "-")
                        .toLowerCase()
                    // + "/"
            );
        },
        onMouseEnter: function (node, a, item, event) {
            if (item.group !== "game") {
                return false;
            }
 
            if (!$(a).find(".popover")[0]) {
 
                $(a).append(
                    $("<div/>", {
                        "class": "popover fade right in",
                        "html": $("<div/>", {
                            "class": "popover-content",
                            "html": $("<img/>", {
                                "src": "http://cdn.gamer-hub.com/images/" +
                                    item.display.replace(/[\s]|:\s/g, "-")
                                        .replace("'", "-")
                                        .replace(/-+/g, "-")
                                        .toLowerCase()
                                    + ".jpg"
                            })
                        }).prepend($("<div/>", {
                            "class": "arrow"
                        }))
                    })
                );
 
            } else {
                $(a).find(".popover").removeClass("out").addClass("in");
            }
        },
        onMouseLeave: function (node, a, item, event) {
            if (item.group !== "game") {
                return false;
            }
 
            $(a).find(".popover").removeClass("in").addClass("out");
        },
        
    onLayoutBuiltBefore: function(node, query, result, resultHtmlList){
        if(result.length >  0){
            for(var i = 0 ; i < categories.length ; i++){
                resultHtmlList.prepend("<li class='typeahead__item typeahead__group-apps'><a href='javascript:;'><span class='typeahead__display'>"+query+" in "+categories[i]+"</span></a></li>")
            }
            resultHtmlList.prepend(`<li class="typeahead__group" data-search-group="${GROUP_NAME}"><a href="javascript:;" tabindex="-1">${GROUP_NAME}</a></li>`);
            $(function() {
                $("li").on("click",function(event) {
                    console.log(event.target.text);
                    window.open(  "https://www.google.com/search?q=" +
                    // item.group + "/" +
                    // item.id + "/" +
                    event.target.text.replace(/[\s]|:\s/g, "-")
                        .toLowerCase())
                });
              });
        }
        
       return resultHtmlList;
    },
    onInit: function(node){
        $.ajax({
            url: "http://www.mocky.io/v2/5b476bec2f00007200481574",
            method: "get",
            dataType: "jsonp",
            success: function (data) {
                categories = data.data;
                console.log(categories);
            }
          });
    }
}
});