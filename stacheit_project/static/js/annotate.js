var selection = '';

//Hide add-annotation overlay on load
$(function() 
{
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
    document.body.appendChild(hiddenDiv);
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

