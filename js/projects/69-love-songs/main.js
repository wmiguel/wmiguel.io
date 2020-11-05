var track, title, artist, album, year, cover, lyrics;
var volumeOne = document.getElementById("vol-01");
var volumeTwo = document.getElementById("vol-02");
var volumeThree = document.getElementById("vol-03");
var imgAlbumLink = document.getElementById("album-link");
var lyricsTitle = document.getElementById("trackTitle");
var lyricsArtist = document.getElementById("trackArtist");
var trackCover = document.getElementById("trackCover");
var lyricsText = document.getElementById("track-fullLyrics");
var albumDeactivate = document.getElementById('album-content');
var lyricsActivate = document.getElementById('lyrics-content');
var mainContent = document.getElementById('main-content');
var previous = document.getElementById("previous");
var next = document.getElementById("next");
var previousMobile = document.getElementById("previous-mobile");
var nextMobile = document.getElementById("next-mobile");

var albumCover = loveSongs[0].AlbumCover;
imgAlbumLink.src = "https://wmiguel.io/" + albumCover; // "file:///Users/wmiguel/Sites/wmiguel.io/" + albumCover;

for (var songs = 1; songs <= 23; songs++) {
  var trackNumber = loveSongs[songs].TrackNumber;
  var trackTitle = loveSongs[songs].Title;
  var trackTitles = Handlebars.compile(`
    <div id="album-track" onclick="trackSelected(${songs});">
      <p>${trackNumber}</p>
      <p>${trackTitle}</p>
    </div>`);
  $('#album-tracks').append(trackTitles());
};

document.addEventListener('keydown', escapeTrack);

function volume(vol) {
  if (vol == 1) {
    volumeOne.classList.add("active");
    if ($('#vol-02').hasClass('active') || $('#vol-03').hasClass('active')) {
      $('#vol-02').removeClass('active');
      $('#vol-03').removeClass('active');
    }
    $("#album-tracks").empty();
    for (var songs = 1; songs <= 23; songs++) {
      var trackNumber = loveSongs[songs].TrackNumber;
      var trackTitle = loveSongs[songs].Title;
      var trackTitles = Handlebars.compile(`
        <div id="album-track" onclick="trackSelected(${songs});">
          <p>${trackNumber}</p>
          <p>${trackTitle}</p>
        </div>`);
      $('#album-tracks').append(trackTitles());
    };
  }
  if (vol == 2) {
    volumeTwo.classList.add("active");
    if ($('#vol-01').hasClass('active') || $('#vol-03').hasClass('active')) {
      $('#vol-01').removeClass('active');
      $('#vol-03').removeClass('active');
    }
    $("#album-tracks").empty();
    for (var songs = 24; songs <= 46; songs++) {
      var trackNumber = loveSongs[songs].TrackNumber;
      var trackTitle = loveSongs[songs].Title;
      var trackTitles = Handlebars.compile(`
        <div id="album-track" onclick="trackSelected(${songs});">
          <p>${trackNumber}</p>
          <p>${trackTitle}</p>
        </div>`);
      $('#album-tracks').append(trackTitles());
    };
  }
  if (vol == 3) {
    volumeThree.classList.add("active");
    if ($('#vol-01').hasClass('active') || $('#vol-02').hasClass('active')) {
      $('#vol-01').removeClass('active');
      $('#vol-02').removeClass('active');
    }
    $("#album-tracks").empty();
    for (var songs = 47; songs <= 69; songs++) {
      var trackNumber = loveSongs[songs].TrackNumber;
      var trackTitle = loveSongs[songs].Title;
      var trackTitles = Handlebars.compile(`
        <div id="album-track" onclick="trackSelected(${songs});">
          <p>${trackNumber}</p>
          <p>${trackTitle}</p>
        </div>`);
      $('#album-tracks').append(trackTitles());
    };
  }
}
function trackSelected(i) {
  track = loveSongs[i].TrackNumber;
  title = loveSongs[i].Title;
  artist = loveSongs[i].Artist;
  album = loveSongs[i].Album;
  year = loveSongs[i].Year;
  cover = loveSongs[i].AlbumCover;
  lyrics = loveSongs[i].Lyrics;

  lyricsTitle.textContent = title;
  lyricsArtist.textContent = `Track ${track} | ${artist} | ${album} (${year})`;
  trackCover.src = "https://wmiguel.io/" + cover; // "file:///Users/wmiguel/Sites/wmiguel.io/" + cover;
  lyricsText.innerHTML = lyrics;
  lyricsActivate.style.visibility = 'visible';
  lyricsActivate.style.opacity = '1';
  lyricsActivate.style.height = '100%';
  lyricsActivate.style.paddingTop = '100px';
  mainContent.style.display = 'grid';
  albumDeactivate.style.visibility = 'hidden';
  albumDeactivate.style.opacity = '0';
  albumDeactivate.style.height = '0';
  albumDeactivate.style.paddingTop = '0';
  previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
  previousMobile.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
  next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
  nextMobile.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";

  document.onkeydown = function(event) {
    var e = event || window.event;
    var lyricsTitle = document.getElementById("trackTitle");
    var lyricsArtist = document.getElementById("trackArtist");
    var trackCover = document.getElementById("trackCover");
    var lyricsText = document.getElementById("track-fullLyrics");
    var previous = document.getElementById("previous");
    var previousMobile = document.getElementById("previous-mobile");
    var next = document.getElementById("next");
    var nextMobile = document.getElementById("next-mobile");

    if (e.keyCode == '39') { // Right Key
      if (i == 23) {
        return;
      }
      if (i == 46) {
        return;
      }
      if (i == 69) {
        return;
      }
      else {
        nextNum = i += 1;
        lyricsTitle.textContent = loveSongs[i].Title;
        lyricsArtist.textContent = `Track ${loveSongs[i].TrackNumber} | ${loveSongs[i].Artist} | ${loveSongs[i].Album} (${loveSongs[i].Year})`;
        trackCover.src = "https://wmiguel.io/" + loveSongs[i].AlbumCover; // "file:///Users/wmiguel/Sites/wmiguel.io/" + loveSongs[i].AlbumCover;
        lyricsText.innerHTML = loveSongs[i].Lyrics;
        next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        nextMobile.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        previousMobile.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        previous.style.opacity = 1;
        if (i == 23) {
          next.style.opacity = .5;
          nextMobile.style.opacity = .5;
        }
        if (i == 47) {
          next.style.opacity = .5;
          nextMobile.style.opacity = .5;
        }
        if (i == 69) {
          next.style.opacity = .5;
          nextMobile.style.opacity = .5;
        }
      }
    }
    if (e.keyCode == '37') { // Left Key
      if (i == 1) {
        return;
      }
      if (i == 24) {
        return;
      }
      if (i == 47) {
        return;
      }
      else {
        nextNum = i -= 1;
        lyricsTitle.textContent = loveSongs[i].Title;
        lyricsArtist.textContent = `Track ${loveSongs[i].TrackNumber} | ${loveSongs[i].Artist} | ${loveSongs[i].Album} (${loveSongs[i].Year})`;
        trackCover.src = "https://wmiguel.io/" + loveSongs[i].AlbumCover; // "file:///Users/wmiguel/Sites/wmiguel.io/" + loveSongs[i].AlbumCover;
        lyricsText.innerHTML = loveSongs[i].Lyrics;
        next.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        nextMobile.innerHTML = "<button onclick='nextTrack(" + i + ");'>&#10095;</button>";
        next.style.opacity = 1;
        nextMobile.style.opacity = 1;
        previous.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        previousMobile.innerHTML = "<button onclick='previousTrack(" + i + ");'>&#10094;</button>";
        if (i == 1) {
          previous.style.opacity = .5;
          previousMobile.style.opacity = .5;
        }
        if (i == 24) {
          previous.style.opacity = .5;
          previousMobile.style.opacity = .5;
        }
        if (i == 47) {
          previous.style.opacity = .5;
          previousMobile.style.opacity = .5;
        }
      }
    }
  }
}
function nextTrack(num) {
  console.log("next");
  if (num == 23) {
    return;
  }
  if (num == 46) {
    return;
  }
  if (num == 69) {
    return;
  }
  else {
    var newNum = num += 1;
    trackSelected(newNum);
    previous.style.opacity = 1;
    previousMobile.style.opacity = 1;
    if (num == 23) {
      next.style.opacity = .5;
      nextMobile.style.opacity = .5;
    }
    if (num == 46) {
      next.style.opacity = .5;
      nextMobile.style.opacity = .5;
    }
    if (num == 69) {
      next.style.opacity = .5;
      nextMobile.style.opacity = .5;
    }
  }
};
function previousTrack(num) {
  console.log("previous");
  if (num == 1) {
    return;
  }
  if (num == 24) {
    return;
  }
  if (num == 47) {
    return;
  }
  else {
    var newNum = num -= 1;
    trackSelected(newNum);
    next.style.opacity = 1;
    nextMobile.style.opacity = 1;
    if (num == 1) {
      previous.style.opacity = .5;
      previousMobile.style.opacity = .5;
    }
    if (num == 24) {
      previous.style.opacity = .5;
      previousMobile.style.opacity = .5;
    }
    if (num == 47) {
      previous.style.opacity = .5;
      previousMobile.style.opacity = .5;
    }
  }
};
function goHome() {
  lyricsActivate.style.visibility = 'hidden';
  lyricsActivate.style.opacity = '0';
  lyricsActivate.style.height = '0';
  lyricsActivate.style.paddingTop = '0';
  mainContent.style.display = 'none';
  albumDeactivate.style.visibility = 'visible';
  albumDeactivate.style.opacity = '1';
  albumDeactivate.style.height = '100%';
  albumDeactivate.style.paddingTop = '100px';
};
function escapeTrack(esc) {
  if (esc.code == 'Escape') {
    var lyricsActivate = document.getElementById('lyrics-content');
    var albumDeactivate = document.getElementById('album-content');
    var mainContent = document.getElementById('main-content');
    lyricsActivate.style.visibility = 'hidden';
    lyricsActivate.style.opacity = '0';
    lyricsActivate.style.height = '0';
    lyricsActivate.style.paddingTop = '0';
    mainContent.style.display = 'none';
    albumDeactivate.style.visibility = 'visible';
    albumDeactivate.style.opacity = '1';
    albumDeactivate.style.height = '100%';
    albumDeactivate.style.paddingTop = '100px';
  }
}
