let last_input = "";

TextUpdate = function (e){
    let new_data = e.value.replace(last_input, '')
    console.log(new_data)
    let last_input = e.value;
}