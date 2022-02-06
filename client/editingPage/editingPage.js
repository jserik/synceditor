last_input = null

TextUpdateHeavy = function(e){
    SendData(e.value)
}

TextUpdateLeightWeight = function (e){
    if(last_input!=null){
        new_data = GetTextUpdate(e.value, last_input)
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

function GetTextUpdate(a, b){
    if(a.length > b.length){
        return {
            intersection: a.replace(b, ''),
            second: 1,
            position: b.length
        };
    }
    else if(a.length < b.length){
        return {
            intersection: b.replace(a, ''),
            second: -1,
            position: a.length
        };
    }
}

function SendData(data){
    // Send Data
}