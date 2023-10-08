
//Assignment04
//KashishTaneja



$(function () {
    // Check if geolocation is available and has been allowed by the user
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
            // Display current location in divlocationhere
            var currentLocation = position.coords.latitude + ", " + position.coords.longitude;
            var accuracy =   position.coords.accuracy + " meters"; // Added accuracy information
            $("#locationhere").text("Current Location: " + currentLocation + " (" + accuracy + ")");

            // Retrieve the stored previous location from local storage
            var storedLocation = localStorage.getItem("lastLocation");
            if (storedLocation) {
                // Calculate the distance between current and stored locations but in kilometers
                var currentLat = position.coords.latitude;
                var currentLon = position.coords.longitude;
                var storedCoords = storedLocation.split(", ");
                var storedLat = parseFloat(storedCoords[0]);
                var storedLon = parseFloat(storedCoords[1]);
                var distance = calcDistanceBetweenPoints(currentLat, currentLon, storedLat, storedLon) / 1000; // Convert to kilometers by dividing

                // Display the previous location, distance in kilometers instead of meters to get the bonus:)))), and accuracy
                var previousLocationTag = $("<p>").text("Previous Location: " + storedLocation);
                var distanceTag = $("<p>").text("You traveled " + distance.toFixed(2) + " km since your last visit.");
                var accuracyTag = $("<p>").text("Accuracy: " + position.coords.accuracy + " meters");
                $("#content").append(previousLocationTag, distanceTag, accuracyTag);
                $("body").prepend("<h1> Hey!!! Welcome back to the page!</h1>");
            } else {
                // If there is no location value already stored in local storage, display the message for first-time visitors
                $("body").prepend("<h1> Hiii!!! Welcome to the page for the Very first time!</h1>");
            }

            // After all completion, store the current location values in local storage
            localStorage.setItem("lastLocation", currentLocation);
        },
        function (error) {
            // If an error occurred or geolocation is blocked
            $("body").prepend("<h2>Error: You must allow geolocation to use this application.</h2>");
        });
    } else {
        // Geolocation is not available in this browser
        $("body").prepend("<h2>Error: Geolocation is not supported in this browser.</h2>");
    }

    // Function to calculate distance between two points
    function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
        var toRadians = function (num) {
            return num * Math.PI / 180;
        }
        var R = 6371000; // radius of Earth in meters
        var φ1 = toRadians(lat1);
        var φ2 = toRadians(lat2);
        var Δφ = toRadians(lat2 - lat1);
        var Δλ = toRadians(lon2 - lon1);

        var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return (R * c);
    }
});
