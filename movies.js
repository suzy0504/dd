const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTA4MDNlMGUzNDI3ZDM0MWUyZjdkNjQxZDYxNDI4YiIsInN1YiI6IjY2Mjc3MmYwYjI2ODFmMDFhOTc1ZDBjYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nzR6ZPWCuFpQ2F6FOKviEW2uxMm5r-_npm_0DR9dLM4'
  }
};

let movieList;

fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
  .then(response => response.json())
  .then(response => {
    movieList = response.results;
    let temp_html = ``;
    movieList.forEach(data => {
      let img = "https://image.tmdb.org/t/p/w500" + data['poster_path']
      let title = data['title']
      let overview = data['overview']
      let vote = data['vote_average']
      let movieid = data['id']

      console.log();

      temp_html += `
        <div class="item" onclick="alert('영화 ID : ${data.id}')">
          <img src="${img}" alt="...">
            <p>${title}</p>
            <p>${overview}</p>
            <p>${vote}</p>              
        </div>`;

    });
    document.getElementById("movieList").innerHTML = temp_html
  });

const search = document.querySelector(".search");

search.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const searchValue = searchBox.value.toLowerCase();
  const filterMovie = movieList.filter(movie => {
    return movie.title.toLocaleLowerCase().includes(searchValue);
  });

  let temp_html = ``;
  if (filterMovie.length === 0) {
    document.getElementById("movieList").innerHTML = ``
  } else {
    
  filterMovie.forEach(data => {
    let img = "https://image.tmdb.org/t/p/w500" + data['poster_path']
    let title = data['title']
    let overview = data['overview']
    let vote = data['vote_average']

    temp_html += `
      <div class="item" onclick="alert('영화 ID : ${data.id}')">
        <img src="${img}" alt="...">
          <p>${title}</p>
          <p>${overview}</p>
          <p>${vote}</p>              
      </div>`;

    document.getElementById("movieList").innerHTML = temp_html;
  })}   
});  