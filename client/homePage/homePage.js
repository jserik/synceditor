$(document).ready(function(){
    $("#IdInput").on("keypress",function(e){
        
        //console.log(e.keyCode)

        //Enter
        if(e.keyCode==13){
            //console.log("Enter!")
            SendIDtoAPI(e.target.value)
        }
        else{
            let input = String.fromCharCode(e.which)
            //console.log(e)
            //console.log(e.target.id)
            
            if(!["1","2","3","4","5","6","7","8","9"].includes(input)){ 
                //console.log("Only Numbers!")
                // Change Error Paragraph
                $('#ErrorParag').text('Only Numbers!')
            }
            else{
                // clear error field
                $('#ErrorParag').text('')
            }
        }
        
    })
})

SendIDtoAPI