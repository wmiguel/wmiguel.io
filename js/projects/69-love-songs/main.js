var albumDeactivate = document.getElementById('album-content');
var lyricsActivate = document.getElementById('lyrics-content');
var mainContent = document.getElementById('main-content');

var previous = document.getElementById("previous");
var next = document.getElementById("next");
var previousMobile = document.getElementById("previous-mobile");
var nextMobile = document.getElementById("next-mobile");

function fullOpacity() {
  previous.style.opacity = 1;
  next.style.opacity = 1;
  previousMobile.style.opacity = 1;
  nextMobile.style.opacity = 1;
}

function contentSwitch() {
  mainContent.style.display = 'none';
  lyricsActivate.style.visibility = 'hidden';
  lyricsActivate.style.opacity = '0';
  lyricsActivate.style.display = 'none';
  albumDeactivate.style.visibility = 'visible';
  albumDeactivate.style.opacity = '1';
  albumDeactivate.style.display = 'block';
}

$(document).ready(function() {
  for (var songs = 1; songs <= 23; songs++) {
    var trackTitles = Handlebars.compile(`
      <div id="album-track" onclick="trackSelected(${songs});">
        <p>${loveSongs[songs].TrackNumber}</p>
        <p>${loveSongs[songs].Title}</p>
      </div>`);
    $('#album-tracks').append(trackTitles());
  };
});

function volume(vol) {
  if (vol == 1) {
    $('#vol-01').addClass('active');
    $("#vol-02,#vol-03").removeClass('active');
    $("#album-tracks").empty();
    for (var songs = 1; songs <= 23; songs++) {
      var trackTitles = Handlebars.compile(`
        <div id="album-track" onclick="trackSelected(${songs});">
          <p>${loveSongs[songs].TrackNumber}</p>
          <p>${loveSongs[songs].Title}</p>
        </div>`);
      $('#album-tracks').append(trackTitles(songs));
      console.log(trackTitles());
    };
  }
  if (vol == 2) {
    $('#vol-02').addClass('active');
    $("#vol-01,#vol-03").removeClass('active');
    $("#album-tracks").empty();
    for (var songs = 24; songs <= 46; songs++) {
      var trackTitles = Handlebars.compile(`
        <div id="album-track" onclick="trackSelected(${songs});">
          <p>${loveSongs[songs].TrackNumber}</p>
          <p>${loveSongs[songs].Title}</p>
        </div>`);
      $('#album-tracks').append(trackTitles());
    };
  }
  if (vol == 3) {
    $('#vol-03').addClass('active');
    $("#vol-01,#vol-02").removeClass('active');
    $("#album-tracks").empty();
    for (var songs = 47; songs <= 69; songs++) {
      var trackTitles = Handlebars.compile(`
        <div id="album-track" onclick="trackSelected(${songs});">
          <p>${loveSongs[songs].TrackNumber}</p>
          <p>${loveSongs[songs].Title}</p>
        </div>`);
      $('#album-tracks').append(trackTitles());
    };
  }

}

function trackSelected(i) {
  var trackLyrics = Handlebars.compile(`
    <div id="track-information">
      <img id="trackCover" src="https://wmiguel.io/${loveSongs[i].AlbumCover}">
      <h3 id="trackNumberVolume">Track ${loveSongs[i].TrackNumber} | Volume ${loveSongs[i].Volume}</h3>
      <h1 id="trackTitle">${loveSongs[i].Title}</h1>
      <h2 id="trackArtist">${loveSongs[i].Artist}</h2>
      <h2 id="trackAlbum">${loveSongs[i].Album} (${loveSongs[i].Year})</h2>
    </div>
    <div id="track-fullLyrics">${loveSongs[i].Lyrics}</div>`);
  $('#track-lyrics').append(trackLyrics());
  lyricsActivate.style.visibility = 'visible';
  lyricsActivate.style.opacity = '1';
  lyricsActivate.style.display = 'block';
  mainContent.style.display = 'grid';
  albumDeactivate.style.visibility = 'hidden';
  albumDeactivate.style.opacity = '0';
  albumDeactivate.style.display = 'none';
  previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
  previousMobile.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
  next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
  nextMobile.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";

  document.onkeydown = function(event) {

    var e = event || window.event;
    var previous = document.getElementById("previous");
    var previousMobile = document.getElementById("previous-mobile");
    var next = document.getElementById("next");
    var nextMobile = document.getElementById("next-mobile");

    if (e.keyCode == 39) { // Right Key
      if (i == 23 || i == 46 || i == 69) {
        return;
      } else {
        nextNum = i += 1;
        $("#track-lyrics").empty();
        var trackLyrics = Handlebars.compile(`
          <div id="track-information">
            <img id="trackCover" src="https://wmiguel.io/${loveSongs[i].AlbumCover}">
            <h3 id="trackNumberVolume">Track ${loveSongs[i].TrackNumber} | Volume ${loveSongs[i].Volume}</h3>
            <h1 id="trackTitle">${loveSongs[i].Title}</h1>
            <h2 id="trackArtist">${loveSongs[i].Artist}</h2>
            <h2 id="trackAlbum">${loveSongs[i].Album} (${loveSongs[i].Year})</h2>
          </div>
          <div id="track-fullLyrics">${loveSongs[i].Lyrics}</div>`);
        $('#track-lyrics').append(trackLyrics());

        next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        nextMobile.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        previousMobile.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";

        previous.style.opacity = 1;
        previousMobile.style.opacity = 1;

        if (i == 23 || i == 46 || i == 69) {
          next.style.opacity = .5;
          nextMobile.style.opacity = .5;
        }
      }
    }

    if (e.keyCode == 37) { // Left Key
      if (i == 1 || i == 24 || i == 47) {
        return;
      } else {
        nextNum = i -= 1;
        $("#track-lyrics").empty();
        var trackLyrics = Handlebars.compile(`
          <div id="track-information">
            <img id="trackCover" src="https://wmiguel.io/${loveSongs[i].AlbumCover}">
            <h3 id="trackNumberVolume">Track ${loveSongs[i].TrackNumber} | Volume ${loveSongs[i].Volume}</h3>
            <h1 id="trackTitle">${loveSongs[i].Title}</h1>
            <h2 id="trackArtist">${loveSongs[i].Artist}</h2>
            <h2 id="trackAlbum">${loveSongs[i].Album} (${loveSongs[i].Year})</h2>
          </div>
          <div id="track-fullLyrics">${loveSongs[i].Lyrics}</div>`);
        $('#track-lyrics').append(trackLyrics());

        next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        nextMobile.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        previousMobile.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";

        next.style.opacity = 1;
        nextMobile.style.opacity = 1;

        if (i == 1 || i == 24 || i == 47) {
          previous.style.opacity = .5;
          previousMobile.style.opacity = .5;
        }
      }
    }

  }
}

function nextTrack(num) {
  if (num == 23 || num == 46 || num == 69) {
    return;
  } else {
    var newNum = num += 1;
    $("#track-lyrics").empty();
    trackSelected(newNum);
    previous.style.opacity = 1;
    previousMobile.style.opacity = 1;
    if (num == 23 || num == 46 || num == 69) {
      next.style.opacity = .5;
      nextMobile.style.opacity = .5;
    }
  }
};

function previousTrack(num) {
  if (num == 1 || num == 24 || num == 47) {
    return;
  } else {
    var newNum = num -= 1;
    $("#track-lyrics").empty();
    trackSelected(newNum);
    next.style.opacity = 1;
    nextMobile.style.opacity = 1;
    if (num == 1 || num == 24 || num == 47) {
      previous.style.opacity = .5;
      previousMobile.style.opacity = .5;
    }
  }
};

document.addEventListener('keydown', escapeTrack);

function goHome(esc) {
  fullOpacity();
  $("#track-lyrics").empty();
  contentSwitch();
};

function escapeTrack(esc) {
  if (esc.keyCode == 27) {
    goHome(esc);
  }
}
