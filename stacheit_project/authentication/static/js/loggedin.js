function getArticleData(source)
{		
    var ajax = new XMLHttpRequest();
    
    console.log(source);



    //Trigger ajax call
    ajax.open("GET", "http://localhost:8000");
    ajax.send();

    //Patch changed data
    ajax.onreadystatechange = function() 
    {
     if(ajax.readyState !== 4) { return; }
     // Start the AJAX request as a POST to the api
     ajax.open("POST", "http://localhost:8000/article/", true);
            
     var data = {
                   csrfmiddlewaretoken: '{{ csrf_token }}'
                }

     console.log("Sending info", data);

     // Send the POST information as JSON
     ajax.setRequestHeader("Content-type", "application/json");
     ajax.send(JSON.stringify(data));
            
     ajax.onreadystatechange = function(status) 
     {
      console.log("ATTEMPTING TO SEND DATA");
      if(ajax.readyState != 4) { return; }    
        console.log("Got", status, ajax);
      }//END AJAX
     }

}
