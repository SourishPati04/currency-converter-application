### Javascript ###

const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const result = document.getElementById("result");
const amount = document.getElementById("amount");

const apiUrl = "https://api.frankfurter.app/latest";

// Load currency options
fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.push("EUR"); // Frankfurter base is EUR
    currencies.sort().forEach(curr => {
      fromCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
      toCurrency.innerHTML += `<option value="${curr}">${curr}</option>`;
    });
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
  });

// Convert currency
convertBtn.addEventListener("click", () => {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amt = amount.value;

  if (from === to) {
    result.textContent = "Please select different currencies.";
    return;
  }

  fetch(`${apiUrl}?amount=${amt}&from=${from}&to=${to}`)
    .then(res => res.json())
    .then(data => {
      result.textContent = `${amt} ${from} = ${data.rates[to]} ${to}`;
    })
    .catch(() => {
      result.textContent = "Error fetching exchange rate!";
    });
});
