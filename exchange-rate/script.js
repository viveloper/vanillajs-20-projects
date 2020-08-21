class ExchangeRateCalculator {
  constructor() {
    // DOM Elements
    this.currencyEl_one = document.getElementById('currency-one');
    this.amountEl_one = document.getElementById('amount-one');
    this.currencyEl_two = document.getElementById('currency-two');
    this.amountEl_two = document.getElementById('amount-two');
    this.rateEl = document.getElementById('rate');
    this.swapBtn = document.getElementById('swap');

    // API Base URL
    this.baseUrl = `https://api.exchangerate-api.com/v4/latest`;

    // state
    this.state = {
      rate: 1,
      prevAmountTwo: 0,
    };

    // bind event listener
    this.currencyEl_one.addEventListener(
      'change',
      this.handleCurrencyOneChange.bind(this)
    );
    this.currencyEl_two.addEventListener(
      'change',
      this.handleCurrencyTwoChange.bind(this)
    );
    this.amountEl_one.addEventListener(
      'input',
      this.handleAmountOneChange.bind(this)
    );
    this.amountEl_two.addEventListener(
      'input',
      this.handleAmountTwoChange.bind(this)
    );
    this.swapBtn.addEventListener('click', this.handleSwapClick.bind(this));

    // Init
    this.init();
  }

  async init() {
    this.state.rate = await this.fetchRates(
      this.currencyEl_one.value,
      this.currencyEl_two.value
    );

    this.updateRateView();
    this.updateAmountView();
  }

  updateRateView() {
    this.rateEl.innerText = `1 ${this.currencyEl_one.value} = ${this.state.rate} ${this.currencyEl_two.value}`;
  }

  updateAmountView() {
    this.state.prevAmountTwo = this.amountTwo;
    this.amountEl_two.value = this.amountTwo;
  }

  get amountTwo() {
    return (this.amountEl_one.value * this.state.rate).toFixed(3);
  }

  async fetchRates(currencyOne, currencyTwo) {
    const res = await fetch(`${this.baseUrl}/${currencyOne}`);
    const data = await res.json();
    return data.rates[currencyTwo];
  }

  async handleCurrencyOneChange(e) {
    this.state.rate = await this.fetchRates(
      e.target.value,
      this.currencyEl_two.value
    );
    this.updateRateView();
    this.updateAmountView();
  }

  async handleCurrencyTwoChange(e) {
    this.state.rate = await this.fetchRates(
      this.currencyEl_one.value,
      e.target.value
    );
    this.updateRateView();
    this.updateAmountView();
  }

  handleAmountOneChange() {
    this.updateAmountView();
  }

  handleAmountTwoChange() {
    this.amountEl_two.value = this.state.prevAmountTwo;
  }

  async handleSwapClick() {
    const temp = this.currencyEl_one.value;
    this.currencyEl_one.value = this.currencyEl_two.value;
    this.currencyEl_two.value = temp;

    this.state.rate = await this.fetchRates(
      this.currencyEl_one.value,
      this.currencyEl_two.value
    );

    this.updateRateView();
    this.updateAmountView();
  }
}

new ExchangeRateCalculator();
