let categories = [];

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
    emptyTemplate: "no result for {{query}}",
    // template: "{{display}} in {{group-name}}",
    template:function (query, item) {
        // var template = "{{display}}";
        // if (item.category == 'Apps') {
        //     template += " in {{groupName}}";
        // }
        // return template;
        var template = '';
        categories.forEach(cat => {
            console.log(cat);
            template +=  query+" in "+cat+"<br>";
        });
        if (item.group == 'Auto Suggestion'){
            template = "{{display}}";
        }
        return template;
    },
    // groupTemplate:"{{group-name}}",
    // dropdownFilter: "all",
    source: {
        'Auto Suggest':{
            ajax: {
                url: "http://www.mocky.io/v2/5b47658f2f0000690048154e",
                dataType: "jsonp",
                path: "data"
            }
        },
        Apps: {
            ajax: {
                url: "http://www.mocky.io/v2/5b476bec2f00007200481574",
                dataType: "jsonp",
                path: "data",
                success: function (data) {
                    categories = data.data;
                    console.log(categories);
                }
            }
        }
    },
    callback: {
        // onNavigateBefore: function (node, query, event) {
        //     if (~[38,40].indexOf(event.keyCode)) {
        //         event.preventInputChange = true;
        //     }
        // },
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
        }
    }
});