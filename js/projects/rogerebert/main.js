$(document).ready(function(){


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBgEfLkADyRvqsQbZxrIYp4_Ef9Thy8b5k",
    authDomain: "filmmakerproj.firebaseapp.com",
    databaseURL: "https://filmmakerproj.firebaseio.com",
    projectId: "filmmakerproj",
    storageBucket: "filmmakerproj.appspot.com",
    messagingSenderId: "919183410574",
    appId: "1:919183410574:web:bd1fc6e7af8dd23742d0df"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var searches = firebase.database().ref('submitted');

  // My OMDB API Key
  var apikey = "206bdf85"

  $("#movieForm").on("click", function(event){
    event.preventDefault()

    var movie = $("#movie").val()
    var url = 'https://www.omdbapi.com/?apikey='+apikey

    // Here we filter what was submitted in the #movieForm input
    var filtered = ebertReviews.filter(function(el) {
      if (movie === "") {
        return null;
      }
      if (movie === " ") {
        return null;
      }
      return el.Title.toUpperCase().match(movie.toUpperCase());
    });

    // Pushes the #movieForm's text up to Firebase
    var submitted = {
      search: movie
    }
    searches.push(submitted);

    // Here we get out data from OMDB
    $.ajax({
      method: 'GET',
      url: url+"&t="+filtered[0].Title,
      success: function(data){

        console.log(filtered[0].Rating);

        if (filtered[0].Rating === 4) {
          var stars = `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>`;
        }
        if (filtered[0].Rating === 3.5) {
          var stars = `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-half"></i>`;
        }
        if (filtered[0].Rating === 3) {
          var stars = `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>`;
        }
        if (filtered[0].Rating === 2.5) {
          var stars = `<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star-half"></i>`;
        }
        if (filtered[0].Rating === 2) {
          var stars = `<i class="fa fa-star"></i> <i class="fa fa-star"></i>`;
        }
        if (filtered[0].Rating === 1.5) {
          var stars = `<i class="fa fa-star"></i> <i class="fa fa-star-half"></i>`;
        }
        if (filtered[0].Rating === 1) {
          var stars = `<i class="fa fa-star"></i>`;
        }

        var container = Handlebars.compile(`
          <div class="container-fluid">
            <div id="omdbInfo" class="row">
              <div id="omdbImage" class="col-sm-3 order-lg-1 order-md-1 order-12">
                <img id="omdbImgLink" src="{{getPoster}}">
              </div>
              <div id="omdbData" class="col-sm-9 order-lg-12 order-md-12 order-1">
                <div id="omdbTitle" class="row">
                  <div class="col">
                    <h2>{{getTitle}}</h2>
                    ${stars}
                  </div>
                </div>
                <div id="omdbRYDG" class="row">
                  <div class="col">{{getRated}} | {{getYear}} | {{getRuntime}} | {{getGenre}}</div>
                </div>
                <div id="omdbDirector" class="row">
                  <div class="col">Directed by: {{getDirector}}</div>
                </div>
                <div id="omdbPlot" class="row">
                  <div class="col">{{getPlot}}</div>
                </div>
              </div>
            </div>
            <div id="ebertReview" class="row">
              <p>{{getEbertReview}}</p>
              <a href="{{getEbertLink}}">Continue Reading on RogerEbert.com</a>
            </div>
          </div>`
        );



        // This replaces all the content in the default modal
        $('div.container-fluid').replaceWith(container({
          getPoster: data.Poster,
          getTitle: data.Title,
          getRated: data.Rated,
          getYear: data.Year,
          getRuntime: data.Runtime,
          getGenre: data.Genre,
          getPlot: data.Plot,
          getDirector: data.Director,
          getEbertReview: filtered[0].Review,
          getEbertLink: filtered[0].Link,
        }));


          }
    })

    // This function activates when we close the modal
    // It removes the review content and places the error modal content
    // We placed a setTimeOut so it doesn't abruptly switch while closing

    $('#closeModalButton').on('click', function(e){
      setTimeout(function() {
        var reset = document.createElement('div');
        reset.className = 'container-fluid';
        $('div.container-fluid').replaceWith(reset);

            var errorText = document.createElement('div');
            errorText.id = 'errorText';
            errorText.className = 'row';
            $(errorText).appendTo(reset);

                var errorH2 = document.createElement('h2');
                errorH2Text = document.createTextNode("Oops! What You're Looking For Hasn't Been Reviewed");
                $(errorH2Text).appendTo(errorH2);
                $(errorH2).appendTo(errorText);

            var errorImage = document.createElement('div');
            errorImage.id = 'errorImage';
            errorImage.className = 'row';
            $(errorImage).appendTo(reset);

                var errorImg = document.createElement('img');
                errorImg.setAttribute('src', '../images/projects/rogerebert/error-roger.jpg');
                $(errorImg).appendTo(errorImage);
      }, 1500);


    });

  })

})
