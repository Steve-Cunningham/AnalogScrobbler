$(document).ready(function(){
 

	$("#searchbutton").click(function(){
	var searchvalue = {
	artist: $("#artistsearch").val(),
	album: $("#albumsearch").val(),
	country: $('input:radio[name=optionsRadios]:checked').val()
		};

	$.ajax({
		url: "http://api.discogs.com/database/search?type=release&q=format:'LP'+format:'album'+country:'" + searchvalue.country + "'+title:'" + searchvalue.album + "'+artist:'" + searchvalue.artist + "'&f=json",
		type: "GET",
		dataType: 'jsonp',
		success: function (data) {
            console.log(data);
            $.each(data.data.results, function (key, value) {
                // display search results
            	$("<a href='#' class='albumlink'><img src='" + this.thumb + "' class='albumcover' /></a>").appendTo("#resultstab");
            	});
            
            var albumID = data.data.results.id;

            $("#resultstab").on('click', 'a.albumlink', function () {
                $.ajax ({
                    url: "http://api.discogs.com/releases/" + albumID,
                    type: "GET",
                    datatype: 'jsonp',
                    success: function (data) {
                    console.log(data.tracklist);

                    // display tracklist

                        }
                   });
            });     // end results tab generator

       }
    });
    }); // end search button 

    



		}); // End document ready


