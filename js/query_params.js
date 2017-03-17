function get_query_string_parameters() {
    result = {};
    
    var uri = document.location.href;
    
    if (uri.indexOf("?") < 0)
        return result;
    query_string = uri.substring(uri.indexOf("?"));
    if (query_string.indexOf("#") >= 0)
        query_string = query_string.substring(0, query_string.indexOf("#"));

    
    query_pattern = /(?:[?&])([^&=]+)(?:=)([^&]*)/g;
    decode = function(str) {return decodeURIComponent(str.replace(/\+/g, " "));};
    while(match = query_pattern.exec(query_string))
        result[decode(match[1])] = decode(match[2]);
    return result;
}

