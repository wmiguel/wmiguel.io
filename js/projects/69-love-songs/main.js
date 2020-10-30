var track, title, artist, album, year, cover, lyrics;
document.addEventListener('keydown', logKey);

function elementClicked(i) {

  track = loveSongs[i].TrackNumber;
  title = loveSongs[i].Title;
  artist = loveSongs[i].Artist;
  album = loveSongs[i].Album;
  year = loveSongs[i].Year;
  cover = loveSongs[i].AlbumCover;
  lyrics = loveSongs[i].Lyrics;

  var lyricsTitle = document.getElementById("trackTitle");
  lyricsTitle.textContent = title;

  var lyricsArtist = document.getElementById("trackArtist");
  lyricsArtist.textContent = `Track ${track} | ${artist} | ${album} (${year})`;

  var trackCover = document.getElementById("trackCover");
  trackCover.src = "file:///Users/wmiguel/Sites/wmiguel.io/" + cover;

  var lyricsText = document.getElementById("track-fullLyrics");
  lyricsText.innerHTML = lyrics;

  var lyricsActivate = document.getElementById('lyrics-content');
  var albumDeactivate = document.getElementById('album-content');

  lyricsActivate.style.display = 'grid';
  albumDeactivate.style.display = 'none';

  var previous = document.getElementById("previous");
  previous.innerHTML = "<button onclick='previousTrack(" + track + ");'>&#10094;</button>";

  var next = document.getElementById("next");
  next.innerHTML = "<button onclick='nextTrack(" + track + ");'>&#10095;</button>";

  document.onkeydown = function(event) {
    var e = event || window.event;
    if (e.keyCode == '37') { //LEFT
      if (i == 1) {
        return;
      }
      else {
        nextNum = i -= 1;

        var lyricsTitle = document.getElementById("trackTitle");
        lyricsTitle.textContent = loveSongs[i].Title;

        var lyricsArtist = document.getElementById("trackArtist");
        lyricsArtist.textContent = `Track ${loveSongs[i].TrackNumber} | ${loveSongs[i].Artist} | ${loveSongs[i].Album} (${loveSongs[i].Year})`;

        var trackCover = document.getElementById("trackCover");
        trackCover.src = "file:///Users/wmiguel/Sites/wmiguel.io/" + loveSongs[i].AlbumCover;

        var lyricsText = document.getElementById("track-fullLyrics");
        lyricsText.innerHTML = loveSongs[i].Lyrics;

        var next = document.getElementById("next");
        next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        next.style.opacity = 1;

        var previous = document.getElementById("previous");
        previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";

        if (i == 1) {
          var previous = document.getElementById("previous");
          previous.style.opacity = .5;
        }
      }
    }
    if (e.keyCode == '39') { //RIGHT
      if (i == 23) {
        return;
      }
      else {
        nextNum = i += 1;

        var lyricsTitle = document.getElementById("trackTitle");
        lyricsTitle.textContent = loveSongs[i].Title;

        var lyricsArtist = document.getElementById("trackArtist");
        lyricsArtist.textContent = `Track ${loveSongs[i].TrackNumber} | ${loveSongs[i].Artist} | ${loveSongs[i].Album} (${loveSongs[i].Year})`;

        var trackCover = document.getElementById("trackCover");
        trackCover.src = "file:///Users/wmiguel/Sites/wmiguel.io/" + loveSongs[i].AlbumCover;

        var lyricsText = document.getElementById("track-fullLyrics");
        lyricsText.innerHTML = loveSongs[i].Lyrics;

        var next = document.getElementById("next");
        next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";

        var previous = document.getElementById("previous");
        previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        previous.style.opacity = 1;

        if (i == 23) {
          var next = document.getElementById("next");
          next.style.opacity = .5;
        }
      }
    }
  }

}



function nextTrack(num) {
  if (num == 23) {
    return;
  }
  else {
    var newNum = num += 1;
    elementClicked(newNum);
  }
};

function previousTrack(num) {
  if (num == 1) {
    return;
  }
  else {
    var newNum = num -= 1;
    elementClicked(newNum);
  }
};

function logKey(e) {
  if (e.code == 'Escape') {
    var lyricsActivate = document.getElementById('lyrics-content');
    var albumDeactivate = document.getElementById('album-content');
    lyricsActivate.style.display = 'none';
    albumDeactivate.style.display = 'block';
  }
}

$(document).ready(function(){
  var albumCover = loveSongs[0].AlbumCover;
  var imgAlbumLink = document.getElementById("album-link");
  // imgAlbumLink.src = "https://wmiguel.io/" + albumCover;
  imgAlbumLink.src = "file:///Users/wmiguel/Sites/wmiguel.io/" + albumCover;
  for (var songs = 1; songs < loveSongs.length; songs++) {
    var trackNumber = loveSongs[songs].TrackNumber;
    var trackTitle = loveSongs[songs].Title;
    var trackTitles = Handlebars.compile(`
      <div id="album-track" onclick="elementClicked(${songs});">
        <p>${trackNumber}</p>
        <p>${trackTitle}</p>
      </div>`);
    $('#album-tracks').append(trackTitles());
  };
});
