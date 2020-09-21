function elementClicked(i) {

  var bigOriginal = gridAlbumArt[i].Original;
  var bigGrid = gridAlbumArt[i].Grid;
  var bigArtist = gridAlbumArt[i].Artist;
  var bigTitle = gridAlbumArt[i].Title;
  var bigYear = gridAlbumArt[i].Year;

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
    <div class="gridProject">
      <div id="albumArts" class="row">
        <div id="albumOriginal" class="col-6">
          <img id="originalImage" src="https://wmiguel.io/${original}">
        </div>

        <div id="albumGrid" class="col-6">
          <img id="gridImage" src="https://wmiguel.io/${grid}">
        </div>
      </div>
    </div>`);
  $('#albumDisplay').append(gridProject());

  for (var j = 0; j < gridAlbumArt.length; j++) {

    var titleList = gridAlbumArt[j].Title;
    var yearList = gridAlbumArt[j].Year;
    var artistList = gridAlbumArt[j].Artist;
    var originalList = gridAlbumArt[j].Original;
    var gridList = gridAlbumArt[j].Grid;

    var gridListed = Handlebars.compile(`
      <div id="gridListed" class="row" onclick="elementClicked(${j});">
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
