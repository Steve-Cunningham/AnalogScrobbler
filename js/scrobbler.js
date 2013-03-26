$(document).ready(function(){

    // http://www.last.fm/api/auth?api_key=cd548a1b3639125edc41d192a1b69da5

    // Search by Artist/Album

	$("#searchbutton").click(function(){

    	var searchvalue = {
    	artist: $("#artistsearch").val(),
    	album: $("#albumsearch").val(),
    	country: $('input:radio[name=optionsRadios]:checked').val()
    		};

    // Retrieve list of LP's from Discogs

	$.ajax({
		url: "http://api.discogs.com/database/search?type=release&q=format:'LP'+format:'album'+country:'" + searchvalue.country + "'+title:'" + searchvalue.album + "'+artist:'" + searchvalue.artist + "'&f=json",
		type: "GET",
		dataType: 'jsonp',
		success: function (data) {
            console.log(data);
            $("#resultstab").html('');
            $.each(data.data.results, function (key, value) {

                // display LP thumbnails 
            	$("<a href='#' class='albumlink'><img src='" + this.thumb + "' class='albumcover' id=" + this.id + " /></a>").appendTo("#resultstab");
                });
            
                // Select LP & Display selected tracklisting in right pane table

            $("#resultstab a.albumlink").on('click', event.target, function () {
                albumID = event.target.id;
                $("#tracklist").append('<table class="table table-striped" id="songs"></table>');
                $("#songs").html('');
                $("#songs").html('<caption>Now Scrobbling "' + data.title + '"</caption>');
                $("#songs").append('<tr><th id="scrobblecheck"><input type="checkbox" id="chkAll" /></th><th id="tabletrack">#</th><th id="tabletitle">Title</th><th id="tableartist">Artist</th><th id="tablelength">Length</th></tr>')
                $("#songs").append('<button type="button" id="scrobblebutton" class="btn btn-danger">Scrobble</button>')
                var trackScrobble = [];
                $.getJSON("http://api.discogs.com/releases/" + albumID +"?callback=?", function(data) {
                    console.log(data);
                    $.each(data.data.tracklist, function () {
                        $("#songs").append('<tr class="trackrow" id=' + albumID + this.position + '><td><input type="checkbox" class="trackselector" checked="checked"></td><td class="tracknumber">' + this.position + '</td><td class="tracktitle">' + this.title + '</td><td class="trackartist">' + data.data.artists[0].name + '</td><td class="tracklength">' + this.duration + '</td>');
                            $("#chkAll").click(function(){
                                $(".trackselector").prop("checked",$("#chkAll").prop("checked"))
                            }); 
                    });


                    });  // end display table                    
                    


                    // begin scrobble function

                    $("#scrobblebutton").on('click', function () {

                            var submissionArray = [];
                            var boxes = $(":checkbox:checked")

                            $('#songs .trackrow').each(function() {
                                var $this = $(this)

                                var scrobbleTitle = $this.find('.tracktitle').html();
                                var scrobbleArtist = $this.find('td.trackartist').html();
                                var scrobbleTime = $this.find('td.tracklength').html();
                                console.log(scrobbleTitle, scrobbleArtist, scrobbleTime);
                                submissionArray.push(scrobbleTitle, scrobbleArtist, scrobbleTime);

                            });


                        // get token

                        // get session ID


                        // $.ajax({
                        //     url: 'http://post.audioscrobbler.com:80/',
                        //     type: 'POST',
                        //     dataType: 'jsonp',
                        //     method: 'track.scrobble',
                        //     data: trackScrobble,
                        // });

                        });  // end scrobblebutton


                    });


                    // end scrobble function
                

            }}     // end results tab generator


    );
    }); // end search button 
});
