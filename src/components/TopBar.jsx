import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiLineChartLine } from "react-icons/ri";

const AppTopBar = () => {
  const [coins, setCoins] = useState([]);

  useEffect(() => {
    const fetchCoins = () => {
      const options = {
        method: "GET",
        url: "https://coinranking1.p.rapidapi.com/coins",
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
          "tiers[0]": "1",
          orderBy: "marketCap",
          orderDirection: "desc",
          limit: "10",
          offset: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "595571613emsh7b97b6ae7502821p16b159jsnf1a33bdb6570",
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
        },
      };

      axios
        .request(options)
        .then(response => setCoins(response.data.data.coins))
        .catch(error => console.error(error));
    };

    fetchCoins();
    setTimeout(_ => fetchCoins(), [10000]);
  }, []);

  return (
    <div className="topbar-container">
      <div className="topbar-content">
        <div className="trending-section">
          <RiLineChartLine className="trendingicon" />
          <p className="trending">Trending</p>
        </div>
        <div className="coins-section">
          {coins.map((coin, i) => (
            <CoinLinkItem key={i} item={coin} />
          ))}
        </div>
      </div>
    </div>
  );
};

const CoinLinkItem = ({ item }) => (
  <div className="trendingItemDiv">
    <p className="trendingRank"># {item.rank}</p>
    <p className="trendingItem">{item.symbol}</p>
  </div>
);

export default AppTopBar;
