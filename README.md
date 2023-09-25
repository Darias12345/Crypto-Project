# Crypto-Tracker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.6.

## Description

This project allows users to look at the different cryptocurrencies being traded on the market, as well as monitor their current and 24h price change. Users can add specific currencies to their "list" to allow convenient monitoring of only the currencies in which they are interested.


## Features

- **Cryptocurrency List:** View a list of cryptocurrencies, including their names, symbols, current prices, and 24-hour percentage changes.

- **Add Cryptocurrency:** Easily add new cryptocurrencies to the list by entering their name or symbols.

- **Remove Cryptocurrency:** Remove cryptocurrencies from the list if you no longer wish to track them.

- **Automatic Data Updates:** The application automatically updates cryptocurrency data, including prices and percentage changes, at regular intervals.

## Technologies Used

- Angular: Front-end development framework.
- Messari API: Used to fetch cryptocurrency data.
- RxJS: Library for handling asynchronous operations.
- Local Storage: Used to store user preferences and removed cryptocurrencies.

## Getting Started

To get started with CryptoTracker, follow these steps:

1. Clone the repository to your local machine:

   git clone https://github.com/Darias12345/Crypto-Project

2. Navigate to the project directory:
   cd crypto-tracker

3. Install the project dependencies:
  npm install

4. Start the development server:
   ng serve

5. Open your web browser and access the application at http://localhost:4200/


## Usage

View Cryptocurrency List: The main page displays a list of cryptocurrencies along with their names, symbols, prices, and percentage changes over the last 24 hours.

Add Cryptocurrency: Use the input field to enter the symbol of a cryptocurrency (e.g., BTC for Bitcoin) and click the "Add" button to track it.

Remove Cryptocurrency: Each cryptocurrency in the list has a "Remove" button. Clicking this button removes the cryptocurrency from your tracking list.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
   Thanks to Messari for providing cryptocurrency data through their API.
   Built with Angular and open-source libraries.

Happy cryptocurrency tracking!
