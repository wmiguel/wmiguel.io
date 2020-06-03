$(document).ready(function(){

    var i = 4;
    var title = gridAlbumArt[i].Title;
    var year = gridAlbumArt[i].Year;
    var artist = gridAlbumArt[i].Artist;
    var original = gridAlbumArt[i].Original;
    var grid = gridAlbumArt[i].Grid;

    var gridProject = Handlebars.compile(`
      <div class="gridProject">

        <div id="albumArts" class="row">

          <div id="albumOriginal" class="col-6">
            <img id="omdbImgLink" src="file:///Users/wmiguel/Sites/wmiguel.io/${original}">
          </div>

          <div id="albumGrid" class="col-6">
            <img id="omdbImgLink" src="https://wmiguel.io/${grid}">
          </div>

        </div>

        <div id="albumData">
          <h2>${artist}</h2>
          <h1>${title}</h1>
          <span>${year}</span>
        </div>

      </div>`);
      $('div.col-8').append(gridProject());

    for (var j = 0; j < gridAlbumArt.length; j++) {

      var title = gridAlbumArt[j].Title;
      var year = gridAlbumArt[j].Year;
      var artist = gridAlbumArt[j].Artist;
      var original = gridAlbumArt[j].Original;
      var grid = gridAlbumArt[j].Grid;

      var gridListed = Handlebars.compile(`
        <div id="gridListed" class="row">
          <div id="albumArt" class="col-sm-2">
            <img src="file:///Users/wmiguel/Sites/wmiguel.io/${original}">
          </div>
          <div id="albumTitle" class="col-sm-10">
            <div id="artist"><p>${artist}</p></div>
            <div id="titleYear"><p><i>${title}</i></p></div>
          </div>
        </div>
        `);
        $('div.col-4').append(gridListed());

    }

});
