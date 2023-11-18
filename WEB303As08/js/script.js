$(document).ready(function () {
    // Ajax request to load characters data
    $.ajax({
        url: 'characters.json',
        dataType: 'json',
        success: function (data) {
            // Call the function to display characters
            displayCharacters(data);

            // Event listener for the search input
            $('#search').on('input', function () {
                highlightCharacters($(this).val());
            });

            // Event listeners for filter buttons
            $('#filterAM').on('click', function () {
                filterByLastName('A', 'M');
            });

            $('#filterNZ').on('click', function () {
                filterByLastName('N', 'Z');
            });
        },
        error: function () {
            console.error('Error loading characters data.');
        }
    });

    // Function to display characters in the table
    function displayCharacters(characters) {
        var tbody = $('#charactersTable tbody');
        tbody.empty();

        characters.forEach(function (character) {
            var row = $('<tr>');
            row.append($('<td>').text(character.firstName));
            row.append($('<td>').text(character.lastName));
            // Add more columns for additional character information if needed
            tbody.append(row);
        });
    }

    // Function to highlight characters based on search term
    function highlightCharacters(searchTerm) {
        var rows = $('#charactersTable tbody tr');
        rows.removeClass('highlight');

        rows.filter(':contains("' + searchTerm + '")').addClass('highlight');
    }

    // Function to filter characters by last name
    function filterByLastName(startRange, endRange) {
        var rows = $('#charactersTable tbody tr');
        rows.hide();

        var filteredRows = rows.filter(function () {
            var lastName = $(this).find('td:eq(1)').text();
            var firstLetter = lastName.charAt(0).toUpperCase();
            return firstLetter >= startRange && firstLetter <= endRange;
        });

        filteredRows.show();

        // Update filter button text with the count
        $('#filterAM').text('A - M (' + rows.filter(':visible').length + ')');
        $('#filterNZ').text('N - Z (' + filteredRows.length + ')');
    }
});

// Custom jQuery expression to check if an element contains the specified text
$.expr[":"].contains = $.expr.createPseudo(function (arg) {
    return function (elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});
