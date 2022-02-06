$(document).ready(function(){
    $(".DigitInput").on("keydown",function(e){
        // clear error field
        $('#ErrorParag').text('')
        console.log(e.keyCode)
        //Enter
        if(e.keyCode==13){
            console.log("Enter!")
            // proof ID and send to API
        }
        //Backspace
        else if(e.keyCode==8 || e.keyCode==37){
            console.log("delete!")
            if(parseInt(e.target.id.replace("DiIn", ""))<=1){
                //Letztes Element
            }
            else{
                document.getElementById("DiIn"+String(parseInt(e.target.id.replace("DiIn", ""))-1)).focus()
            }
        }
        else{
            let input = String.fromCharCode(e.which)
            //console.log(e)
            console.log(e.target.id)
            
            if(!["1","2","3","4","5","6","7","8","9"].includes(input)){ 
                console.log("Not a Number!")
                // Change Error Paragraph
                $('#ErrorParag').text('Not a Number!')
            }
            // 
            else if(String(document.getElementById(e.target.id).value).length > 0){
                console.log("Input is to long!");
                console.log(document.getElementById(e.target.id).value.length);
                // Change Error Paragraph
                $('#ErrorParag').text('one field for one digit!')
            }
        document.getElementById(e.target.nextElementSibling.id).focus()
        }
        
    })
})


function Load(){
    //Code = document.getElementsByClassName("CodeField").value
    DigitInputs = document.getElementsByClassName("DigitInput")
    console.log(DigitInputs)
    console.log(DigitInputs.length)
    for(let i=0; i < DigitInputs.length; i++){
        DigitInputs.item(i).placeholder = Math.floor(Math.random() * 11);
    }
    
}