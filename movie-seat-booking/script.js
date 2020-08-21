class Cinema {
  constructor(movieIndex, seats) {
    this.container = document.querySelector('.container');
    this.seats = document.querySelectorAll('.row .seat:not(.occupied)');
    this.count = document.getElementById('count');
    this.total = document.getElementById('total');
    this.movieSelect = document.getElementById('movie');

    this.currentMovieIndex = movieIndex === null ? 0 : movieIndex;
    this.movieSelect.querySelectorAll('option').forEach((option, index) => {
      option.selected = index === this.currentMovieIndex;
    });

    if (seats && seats.length > 0) {
      this.seats.forEach((seat, index) => {
        if (seats.indexOf(index) >= 0) {
          seat.classList.add('selected');
        }
      });
    }

    this.seats.forEach((seat) =>
      seat.addEventListener('click', this.handleSeatClick.bind(this))
    );
    this.movieSelect.addEventListener(
      'change',
      this.handleMovieChange.bind(this)
    );
  }

  handleSeatClick(e) {
    e.target.classList.toggle('selected');
  }

  handleMovieChange(e) {
    console.log(e.target.value);
  }
}

const movieTicketingInfo = JSON.parse(
  localStorage.getItem('movieTicketingInfo')
);

if (movieTicketingInfo) {
  new Cinema(movieTicketingInfo.movie, movieTicketingInfo.seats);
} else {
  new Cinema();
}
