/*
	WEB 303 Assignment 1 - jQuery
	{Kashish Taneja}
*/


$(document).ready(function () {
    // Event handler for the "keyup" event 
    $("#yearly-salary, #percent").on("keyup", function () {
        // getttin the values of the input fields
        var salary = parseFloat($("#yearly-salary").val());
        var percent = parseFloat($("#percent").val());

        //  for Checking that both input are valid
        if (!isNaN(salary) && !isNaN(percent)) {
            // Amount Calculations
            var amount = (salary * percent) / 100;
            // Round to dollars and cents using toFixed()
            var roundedAmount = amount.toFixed(2);
            // Update the amount in the HTML
            $("#amount").text("$" + roundedAmount);
        } else {
            // If the inputs are not valid numbers then display an error message.........
            $("#amount").text("Invalid input");
        }
    });
});
