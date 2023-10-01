//WEB 303 Assignment
//Kashish Taneja....
// Date: 2023-10-01

// Method for $.getJSON request
function gettingTeamDataWithGetJSON() 
// I used the $.getJSON() method to get the team.json file.

{
    $.getJSON("team.json", function (data) {
       
        $("#team").empty();

        // By using $.each to loop through the elements of the array
        $.each(data.members, function (index, member) 
        {
     // Create elements for name, position, and bio same as ur instruction!!!!!
     //name:h2
     //position:h5
     //bio:p
            var nameElement = $("<h2>").text(member.name);
            var positionElement = $("<h5>").text(member.position);
            var bioElement = $("<p>").text(member.bio);

            $("#team").append(nameElement, positionElement, bioElement);
        });
    });
}

// Ussing  second method $.ajax() and retrieve data from team.json
function gettingTeamDataWithAjax() {
    //  Display the text "Loading..."  in the div#team.
                               
    $("#team").text("Loading...");
// In the starting it shows you loading.... 



//Same process as we do in first method
    $.ajax({
        type: "GET",
        url: "team.json",
        dataType: "json",
        success: function (data) {
          
            $("#team").empty();
              $.each(data.members, function (index, member) {
             
                var nameElement = $("<h2>").text(member.name);
                var positionElement = $("<h5>").text(member.position);
                var bioElement = $("<p>").text(member.bio);

                $("#team").append(nameElement, positionElement, bioElement);
            });
        },



        // Addiing an error callback to display an error message inside of the div#team
        error: function () {
            // Display an error message that we are not able to find the content; if the request get fail...
            $("#team").text("Error: content could not be retrieved.");
        },
        // Delay the content  for  only3 Seconds (BonusMarks!!!!!!!)

    // Its a fun:))))))))))
        beforeSend: function () {
            setTimeout(function () {
                $("#team").text("Loading...");
            }, 3000);
        }
    });
}

// Call one of the methods in the ready function 
$(document).ready(function () {
       
   // I used Ajax instead of Json
   gettingTeamDataWithAjax(); 
});
