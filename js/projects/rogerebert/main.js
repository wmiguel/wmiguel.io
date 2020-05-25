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

        // This replaces all the content in the default modal
        var container = document.createElement('div');
        container.className = 'container-fluid';
        $('div.container-fluid').replaceWith(container);

        // Here we Insert the Poster, Title, Rating, Year, Runtime,
        // Genre, Director, and Plot from OMDB into the modal

        var omdbInfo = document.createElement('div');
        omdbInfo.id = 'omdbInfo';
        omdbInfo.className = 'row';
        container.appendChild(omdbInfo);

            var omdbImage = document.createElement('div');
            omdbImage.id = 'omdbImage';
            omdbImage.className = 'col-sm-3 order-lg-1 order-md-1 order-12';
            omdbInfo.appendChild(omdbImage);

                var omdbImgLink = document.createElement('img');
                omdbImgLink.id = 'omdbImgLink';
                omdbImgLink.setAttribute("src", data.Poster);
                omdbImage.appendChild(omdbImgLink);

            var omdbData = document.createElement('div');
            omdbData.id = 'omdbData';
            omdbData.className = 'col-sm-9 order-lg-12 order-md-12 order-1';
            omdbInfo.appendChild(omdbData);

                var omdbTitle = document.createElement('div');
                omdbTitle.id = 'omdbTitle';
                omdbTitle.className = 'row';
                omdbData.appendChild(omdbTitle);

                    var omdbColumnTitle = document.createElement('div');
                    omdbColumnTitle.className = 'col';
                    omdbTitle.appendChild(omdbColumnTitle);

                        var omdbH2 = document.createElement('h2');
                        dataTitle = document.createTextNode(data.Title);
                        omdbH2.appendChild(dataTitle);
                        omdbColumnTitle.appendChild(omdbH2);

                        if (filtered[0].Rating === 4) {
                          var stars = $('<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>');
                          $(stars).appendTo(omdbColumnTitle);
                        }
                        if (filtered[0].Rating === 3) {
                          var stars = $('<i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i>');
                          $(stars).appendTo(omdbColumnTitle);
                        }
                        if (filtered[0].Rating === 2) {
                          var stars = $('<i class="fa fa-star"></i> <i class="fa fa-star"></i>');
                          $(stars).appendTo(omdbColumnTitle);
                        }
                        if (filtered[0].Rating === 1) {
                          var stars = $('<i class="fa fa-star"></i>');
                          $(stars).appendTo(omdbColumnTitle);
                        }

                var omdbRYDG = document.createElement('div');
                omdbRYDG.id = 'omdbRYDG';
                omdbRYDG.className = 'row';
                omdbData.appendChild(omdbRYDG);

                    var omdbColumnRYDG = document.createElement('div');
                    omdbColumnRYDG.className = 'col';
                    ryrgText = document.createTextNode( `${data.Rated} | ${data.Year} | ${data.Runtime} | ${data.Genre}` );
                    omdbColumnRYDG.appendChild(ryrgText);
                    omdbRYDG.appendChild(omdbColumnRYDG);

                var omdbDirector = document.createElement('div');
                omdbDirector.id = 'omdbDirector';
                omdbDirector.className = 'row';
                omdbData.appendChild(omdbDirector);

                    var omdbColumnDirector = document.createElement('div');
                    omdbColumnDirector.className = 'col';
                    directorText = document.createTextNode( `Directed by: ${data.Director}` );
                    omdbColumnDirector.appendChild(directorText);
                    omdbDirector.appendChild(omdbColumnDirector);

                var omdbPlot = document.createElement('div');
                omdbPlot.id = 'omdbPlot';
                omdbPlot.className = 'row';
                omdbData.appendChild(omdbPlot);

                    var omdbColumnPlot = document.createElement('div');
                    omdbColumnPlot.className = 'col';
                    plotText = document.createTextNode(data.Plot);
                    omdbColumnPlot.appendChild(plotText);
                    omdbPlot.appendChild(omdbColumnPlot);

        // Here we insert the Review, Url Link, and YouTube Link
        // into the Modal from Our review.js

        var ebertReview = document.createElement('div');
        ebertReview.id = 'ebertReview';
        ebertReview.className = 'row';
        container.appendChild(ebertReview);

            var ebertReviewP = document.createElement('p');
            reviewArray = document.createTextNode(filtered[0].Review);
            ebertReviewP.appendChild(reviewArray);
            ebertReview.appendChild(ebertReviewP);

            var ebertLinkA = document.createElement('a');
            ebertLinkA.setAttribute('href', filtered[0].Link)
            linkArray = document.createTextNode('Continue Reading on RogerEbert.com');
            ebertLinkA.appendChild(linkArray);
            ebertReview.appendChild(ebertLinkA);

        var youtube = document.createElement('div');
        youtube.id = 'youtube';
        youtube.className = 'row';
        container.appendChild(youtube);

            var iframeElement = document.createElement('iframe');
            iframeElement.setAttribute('frameBorder', '0');
            iframeElement.className = 'embed-responsive-item';
            iframeElement.setAttribute('src', filtered[0].YouTube);
            youtube.appendChild(iframeElement);

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
                errorImg.setAttribute('src', 'images/error-roger.jpg');
                $(errorImg).appendTo(errorImage);
      }, 2000);


    });

  })

})
