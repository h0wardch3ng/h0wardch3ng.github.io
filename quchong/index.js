(function(){
    var $textarea = document.getElementsByTagName('TEXTAREA')[0];
    DOMUtil.getElementsByClassName('input-button')[0].onclick = function(){
        var value = $textarea.value.trim();
        var arr = value.split('\n');
        arr = unique(arr);
        document.getElementsByTagName('TEXTAREA')[0].value = arr.join('\n'); 
    }

    function unique(arr) {
        var result = [], hash = {};
        for (var i = 0, elem; (elem = arr[i]) != null; i++) {
            if (!hash[elem]) {
                result.push(elem);
                hash[elem] = true;
            }
        }
        return result;
    }
})();