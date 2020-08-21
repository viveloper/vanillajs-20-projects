class Cinema {
  constructor({ movieIndex, selectedSeatIndex }) {
    this.container = document.querySelector('.container');
    this.seats = document.querySelectorAll('.row .seat:not(.occupied)');
    this.count = document.getElementById('count');
    this.total = document.getElementById('total');
    this.movieSelect = document.getElementById('movie');

    this.seats.forEach((seat) =>
      seat.addEventListener('click', this.handleSeatClick.bind(this))
    );
    this.movieSelect.addEventListener(
      'change',
      this.handleMovieChange.bind(this)
    );

    this.state = {
      movieIndex: 0,
      selectedSeatIndex: [],
    };

    if (movieIndex !== null && movieIndex !== undefined) {
      this.state.movieIndex = movieIndex;
    }
    if (selectedSeatIndex && selectedSeatIndex.length > 0) {
      this.state.selectedSeatIndex = selectedSeatIndex;
    }

    this.updateMovieSelectView();
    this.updateSeatsView();
    this.updateCountView();
    this.updateTotalView();
  }

  get totalPrice() {
    const moviePrice = parseInt(this.movieSelect.value);
    return moviePrice * this.selectedSeatsCount;
  }

  get selectedSeatsCount() {
    return this.state.selectedSeatIndex.length;
  }

  updateMovieSelectView() {
    this.movieSelect.querySelectorAll('option').forEach((option, index) => {
      option.selected = index === this.state.movieIndex;
    });
  }

  updateSeatsView() {
    this.seats.forEach((seat, index) => {
      if (this.state.selectedSeatIndex.indexOf(index) >= 0) {
        seat.classList.add('selected');
      } else {
        seat.classList.remove('selected');
      }
    });
  }

  updateCountView() {
    this.count.innerText = this.selectedSeatsCount;
  }

  updateTotalView() {
    this.total.innerText = this.totalPrice;
  }

  handleSeatClick(e) {
    const targetIndex = Array.from(this.seats).indexOf(e.target);
    const idx = this.state.selectedSeatIndex.indexOf(targetIndex);
    if (idx < 0) {
      this.state.selectedSeatIndex.push(targetIndex);
    } else {
      this.state.selectedSeatIndex.splice(idx, 1);
    }

    this.updateSeatsView();
    this.updateCountView();
    this.updateTotalView();

    this.save();
  }

  handleMovieChange(e) {
    const index = Array.from(
      this.movieSelect.querySelectorAll('option')
    ).findIndex((option) => option.selected);
    this.state.movieIndex = index;

    this.updateMovieSelectView();
    this.updateCountView();
    this.updateTotalView();

    this.save();
  }

  save() {
    localStorage.setItem('movieTicketingInfo', JSON.stringify(this.state));
  }
}

const movieTicketingInfo = JSON.parse(
  localStorage.getItem('movieTicketingInfo')
);

const initialData = movieTicketingInfo
  ? movieTicketingInfo
  : { movieIndex: null, selectedSeatIndex: null };

new Cinema(initialData);
