const BASE_URL = "https://pro-api.coinmarketcap.com/v1/cryptocurrency";
const API_KEY = "b9f6274c-8ce4-42a8-8b77-c12f55a58122";
const authParam = `&CMC_PRO_API_KEY=${API_KEY}`;

let params = "?start=1&limit=100&convert=USD";
let path = "/listings/latest";

const ctx = document.getElementById("myChart").getContext("2d");

let elementNameArray = [];
let elementValueArray = [];
let datasetName = "BTC Daily Price";

const tempApi =
  "https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=200&toTs=-1&api_key=06385157f9feef74d66769a57dd70aff4c94c5182580680323517c1317864007";

const fetchData = async () => {
  // const url = BASE_URL + path + params + authParam;

  try {
    let res = await fetch(tempApi);

    let { Data } = await res.json();

    const rawData = Data.Data;

    let options = { year: "numeric", month: "short", day: "numeric" };

    elementNameArray = await rawData.map((item) => {
      return new Date(item.time);
    });

    // console.log("elementNameArray :>> ", elementNameArray);

    elementValueArray = await rawData.map((item) => {
      return item.close;
    });

    // console.log("elementValueArray :>> ", elementValueArray);
  } catch (error) {
    console.log("error :>> ", error);
  }
};

fetchData().then(() => createChart());

function createChart() {
  console.log("elementNameArray :>> ", elementNameArray);
  console.log("elementValueArray :>> ", elementValueArray);

  const myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: elementNameArray,
      datasets: [
        {
          label: datasetName,
          data: elementValueArray,
          backgroundColor: ["rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,
        },
      },
    },
  });
  return myChart;
}
