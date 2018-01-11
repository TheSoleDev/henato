var init = {
  data : function(){
     $.getJSON(api_root+"data/init").done(function(data){
            console.log(data);
        }); 
     

  }
} 
console.log('aaa');

     // // $.getJSON(api_root+"api/init/").done(function(data){
     // //        console.log(data);
     // //    }); 
        
     //  $.ajax({
     //      type: "GET",
     //      url: "http://henato-v2.local/data/init",
     //      dataType :"json",
     //      success: function( data ) {
     //          console.log(data);
     //      },
     //      error: function (data) {
                    
     //      }
     //  });

init.data();