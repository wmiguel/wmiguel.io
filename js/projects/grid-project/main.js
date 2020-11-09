function albumSelected(album) {

  var bigOriginal = gridAlbumArt[album].Original;
  var bigGrid = gridAlbumArt[album].Grid;
  var bigArtist = gridAlbumArt[album].Artist;
  var bigTitle = gridAlbumArt[album].Title;
  var bigYear = gridAlbumArt[album].Year;

  var originalImage = document.getElementById("originalImage");
  originalImage.src = "https://wmiguel.io/" + bigOriginal;

  var gridImage = document.getElementById("gridImage");
  gridImage.src = "https://wmiguel.io/" + bigGrid;

  var backgroundReplace = document.querySelector(".background-image");
  backgroundReplace.style.backgroundImage = "url(https://wmiguel.io/" + bigOriginal + ")";
}

$(document).ready(function(){

  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  var random = getRandomInt(37);

  var original = gridAlbumArt[random].Original;
  var grid = gridAlbumArt[random].Grid;

  var backgroundReplace = document.querySelector(".background-image");
  backgroundReplace.classList.add("animate");
  backgroundReplace.style.backgroundImage = "url(https://wmiguel.io/" + original + ")";

  var gridProject = Handlebars.compile(`
    <div id="albumOriginal">
      <img id="originalImage" src="https://wmiguel.io/${original}">
    </div>
    <div id="albumGrid">
      <img id="gridImage" src="https://wmiguel.io/${grid}">
    </div>`);
  $('#albumDisplay').append(gridProject());

  for (var album = 0; album < gridAlbumArt.length; album++) {

    var titleList = gridAlbumArt[album].Title;
    var yearList = gridAlbumArt[album].Year;
    var artistList = gridAlbumArt[album].Artist;
    var originalList = gridAlbumArt[album].Original;
    var gridList = gridAlbumArt[album].Grid;

    var gridListed = Handlebars.compile(`
      <div id="gridListed" onclick="albumSelected(${album});">
        <div id="albumArt">
          <img src="https://wmiguel.io/${originalList}">
        </div>
        <div id="albumTitle">
          <div id="artist"><p>${artistList}</p></div>
          <div id="titleYear"><p><i>${titleList}</i></p></div>
        </div>
      </div>`);
    $('#albumCollection').append(gridListed());
  };

});
