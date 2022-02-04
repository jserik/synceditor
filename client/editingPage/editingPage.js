last_input = null
TextUpdate = function (e){
    if(last_input!=null){
        new_data = GetIntersection(e.value, last_input)
        console.log(new_data)
        globalThis.last_input = e.value;
    }
    else{
        new_data = e.value
        console.log(new_data)
        globalThis.last_input = e.value;
    }
    SendData(new_data);
}

function GetIntersection(a, b){
    if(a.length > b.length){
        return {
            intersection: a.replace(b, ''),
            second: 1,
        };
    }
    else if(a.length < b.length){
        return {
            intersection: b.replace(a, ''),
            second: -1,
        };
    }
}

function SendData(data){
    // Send Data
}