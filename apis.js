
// using cors (cross origin resource sharing - browsers restrict HTTP requests to outside sources and this is supposed to get around that. )
const searchInput = document.getElementById('searchInput');
const gifImage = document.getElementById('gifImage');
const errorMsg = document.getElementById('errorMsg')
const button = document.getElementById('search')

function fetchGif(searchRequest){
  const apiKey = '7Wg84ZlMy7JZOxO7pynvCl7ziNhpMK8p'
  const url = `https://api.giphy.com/v1/gifs/translate?api_key=${apiKey}&s=${searchRequest}`;
  
  fetch(url, {mode: 'cors'})
    .then(function(response) {
      if (!response.ok){
        throw new Error('Giphy API request failed.');
      }
      return response.json(); // the .json converts the response from the fetch request into a json format. 
    }) // returns another promise. 
    .then(function(response) {
      if (response.data.images && response.data.images.original.url) {
      // setting the source of the img to the accessed url
        gifImage.src = response.data.images.original.url;
        errorMsg.style.display = "none";
    } else {
      gifImage.src = 'https://media1.giphy.com/media/aEXP6scfSSwQo/giphy.gif?cid=579adc3fml6zh5n7icwsi3mopenw6vh3pl53y58ciw4xwb72&ep=v1_gifs_translate&rid=giphy.gif&ct=g';
      errorMsg.textContent = "No Gif found for search request.";
      errorMsg.style.display = "block"; //show the error message
    }
  })
  .catch(function(err) {
    console.log(err)
    gifImage.src = 'https://media1.giphy.com/media/aEXP6scfSSwQo/giphy.gif?cid=579adc3fml6zh5n7icwsi3mopenw6vh3pl53y58ciw4xwb72&ep=v1_gifs_translate&rid=giphy.gif&ct='; 
    errorMsg.textContent = "No Gif found for search request.";
    errorMsg.style.display = "block"; // Show the error message for API-related errors.
    
  }); 
}

// Event listener for the search input
searchInput.addEventListener('change', function(event) {
  const searchRequest = event.target.value;
  fetchGif(searchRequest);
});

button.addEventListener('submit', function(event) {
  const searchRequest = event.target.value;
  fetchGif(searchRequest);
});

window.onload = function() {
  fetchGif()
}

