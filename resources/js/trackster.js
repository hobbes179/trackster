/*
Application name 	trackster
API key 	f0faf492ddca3cb5e4693e805dda84de
Shared secret 	ecc7656fc005cd9a2fa02d131570fa41
Registered to 	hobbes179
*/

$(document).ready(function() {
  $('#search-button').click(function(){
    Trackster.searchTracks($('#search-input').val());
    $('#search-input').val('');
    $('#track-list').empty();
  });

});

var Trackster = {};
const $API_KEY = 'f0faf492ddca3cb5e4693e805dda84de';


/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(track) {
  console.log(track.image[1]["#text"]);
  $('#track-list').append(`
    <div class='row track'>
      <a id='play-button' class='col-xs-1 col-xs-offset-1' href=${track.url}>
        <i class='fa fa-play-circle-o fa-2x'></i>
      </a>
      <div class='col-xs-3'>${track.name}</div>
      <div class='col-xs-3'>${track.artist}</div>
      <div class='col-xs-2'>${track.listeners}</div>
      <div class='image-container col-xs-2 album-art'>
        <img class='album-art' src=${track.image[1]["#text"]}'/>
      </div>
    </div>
  `);
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracks = function(searchTerm) {
  console.log(`Searching for ${searchTerm}`);
  $.ajax({
    url: `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchTerm}&api_key=${$API_KEY}&format=json`,
    dataType: 'json',
    success: function(response) {
      for (i=0; i<response.results.trackmatches.track.length; i++){
        Trackster.renderTracks(response.results.trackmatches.track[i]);
      };
    },
    error: function(response) {
      console.log("ERROR:");
      console.log(response);
    }
  });
};
