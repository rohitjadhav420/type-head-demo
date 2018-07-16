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
    group: "category",
    maxItemPerGroup: 7,
    emptyTemplate: "No results for {{query}}",
    // groupTemplate:"{{group-name}}",
    // dropdownFilter: "all",
    source: {
            auto_suggestion: {
                ajax: {
                    url: "http://www.mocky.io/v2/5b4c3e123100009604a7dee1",
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
        if(categories.length >  0){

            categories.forEach(category => {
                resultHtmlList.prepend("<li class='typeahead__item typeahead__group-apps'><a href='javascript:;'><span class='typeahead__display'>"+query+" in "+category+"</span></a></li>");
            });
            resultHtmlList.prepend(`<li class="typeahead__group" data-search-group="${GROUP_NAME}"><a href="javascript:;" tabindex="-1">${GROUP_NAME}</a></li>`);
            $(function() {
                $("li").on("click",function(event) {
                        if (event.target.text) {
                            console.log(event.target.text);
                            // $("#searchBox").val(event.target.text);
                            window.open(  "https://www.google.com/search?q=" +
                            event.target.text.replace(/[\s]|:\s/g, "-")
                            .toLowerCase())
                        }
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