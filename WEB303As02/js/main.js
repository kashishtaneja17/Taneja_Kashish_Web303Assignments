// WEB303 Assignment 2
//W0834114//
// KASHISH TANEJA

document.addEventListener('DOMContentLoaded', function () {
    var contentPaths = {  //define the path
        'prospect': 'prospect.html',
        'convert': 'convert.html',
        'retain': 'retain.html'
    };

    var contentDiv = document.getElementById('content');
// Function to load and animate content
    function loadAndAnimateContent(linkId) {
        // Slide up to hide the content
        $(contentDiv).slideUp(400, function () {
           // clear the content container
            contentDiv.innerHTML = '';
            
            var xhr = new XMLHttpRequest();

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    contentDiv.innerHTML = xhr.responseText;
                    animateContent();
                }
            };
            // Open a Get request to fetch the content
            xhr.open('GET', contentPaths[linkId], true);
            xhr.send();
        });
    }

    function animateContent() {
        // Slide down to show the content
        $(contentDiv).slideDown(400);
    }
// AddEventListener for each and every link :::))
    document.getElementById('prospect').addEventListener('click', function (e) {
        e.preventDefault();
        loadAndAnimateContent('prospect');
    });

    document.getElementById('convert').addEventListener('click', function (e) {
        e.preventDefault();
        loadAndAnimateContent('convert');
    });

    document.getElementById('retain').addEventListener('click', function (e) {
        e.preventDefault();
        loadAndAnimateContent('retain');
    });
});

// I used slideup and slide down here instaed of .show 