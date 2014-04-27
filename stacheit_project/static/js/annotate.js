var selection = '';

$(function() 
{
//Activate colorbox for all previous annotations
$(".inline").colorbox({inline:true, width:"50%"});

//Hide add-annotation overlay on load
$( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Submit": function() {
            annotate();
            $( this ).dialog( "close" );
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        },
      close: function() {
        selection = '';
        $( this ).dialog( "close" );
      }
    });


// On mouse lift, if there is selected text, display the
// add-annotation overlay
$('div').mouseup(function() 
 {
  if(!selection && window.getSelection().getRangeAt(0) != '')
  {
    selection= window.getSelection().getRangeAt(0);
    if(selection != ""){
     $("#dialog-form").dialog("open"); 
}
  }
 });

 
});


//------------------------------------------------------------
// ADD ANNOTATION
//------------------------------------------------------------
var selection;

annotate=function()
{       
   //If there is selected text
   if(selection)
   {
    //New span, a, p, and hidden div
    var span= document.createElement("span");
    var anchor = document.createElement("a");
    var hiddenDiv = document.createElement("div");
    var p = document.createElement("p");

    //Highlight anchor background
    //Place selected text in anchor
    anchor.style.backgroundColor = "#d4a672";
    anchor.appendChild(document.createTextNode(selection));

    //Set p content to annotation input
    var note = document.getElementById('note').value;
    p.innerHTML = note;

    //Create unique annotation id (# of spans + 1)
    //Set p id to annotation id
    var n = $("#article").find("span").length;
    var annotationID = "annotation" + n + 1;
    p.id = annotationID;
  
    //Set hidden div for lightbox overlay on annotation click
    //Set anchor class to inline (From Colorbox lightbox plugin)
    hiddenDiv.style.display="none";
    hiddenDiv.appendChild(p);
    document.getElementById('data').appendChild(hiddenDiv);
    anchor.href = "#" + annotationID;
    anchor.className = "inline";
    
    //Append new content and delete initial selection
    //Activate colorbox lightbox plugin to display annotation on click
    anchor.appendChild(span);
    selection.deleteContents();
    selection.insertNode(anchor);}
    $(".inline").colorbox({inline:true, width:"50%"});
    $('#overlay').hide();
    selection = '';
    document.getElementById('note').value = '';

    //Update database
    var newTitle = $("#titleText")[0].innerHTML;
    var newContent = $("#data")[0].innerHTML;
    var id = $("#articleID")[0].innerHTML;
    var ajax = new XMLHttpRequest();
        
    //Trigger call
    ajax.open("GET", "http://localhost:8000");
    ajax.send();

    //Patch changed data
    ajax.onreadystatechange = function() 
    {
     if(ajax.readyState !== 4) { return; }
     var information = {"content": newContent, "title": newTitle};
     console.log(newContent);
     // Start the AJAX request as a PATCH to the api
     ajax.open("PATCH", "http://localhost:8000/api/article/" + id + "/?format=json", true);
            
     // Send PATCH as json
     // Ex: http://localhost:8000/api/article/21/?format=json
     ajax.setRequestHeader("Content-type", "application/json");
     ajax.send(JSON.stringify(information));
            
     ajax.onreadystatechange = function(status) 
     {
      console.log("ATTEMPTING TO PATCH");
      if(ajax.readyState != 4) { return; }    
        console.log("Got", status, ajax);
      }//END AJAX
     }

   }


//------------------------------------------------------------
// SHOW ADD ANNOTATION OVERLAY
// (Repeated here, it must be called in the document ready the
// first time)
//------------------------------------------------------------
$('div').mouseup(function() 
 {
  if(!selection)
  {
    selection= window.getSelection().getRangeAt(0);
  if(selection != "")
     $("#dialog-form").dialog("open"); 
  }
 });

