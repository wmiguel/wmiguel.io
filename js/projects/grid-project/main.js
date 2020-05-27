for (i = 0; i < gridAlbumArt.length; i++) {
  var title = gridAlbumArt[i].Title;
  var year = gridAlbumArt[i].Year;
  var artist = gridAlbumArt[i].Artist;
  var grid = gridAlbumArt[i].Grid;

  console.log(title + ' (' + year + ') ' + 'by ' + artist + ' - https://wmiguel.io/' + grid);
}
