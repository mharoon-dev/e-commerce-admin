import "./FeaturedInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethod.js";

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    console.log(perc);
  }, [perc]);

  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        console.log(res.data);

        setIncome(res.data);

        if (res.data.length >= 2) {
          const percentage =
            ((res.data[0].total - res.data[1].total) / res.data[1].total) * 100;
          console.log(percentage);
          setPerc(percentage);
        }
      } catch (err) {
        alert(err);
      }
    };

    const getProducts = async () => {
      try {
        const res = await userRequest.get("products");
        console.log(res.data);
        setTotalProducts(res.data.length);
      } catch (err) {
        alert(err);
      }
    };

    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        console.log(res.data);
        setTotalOrders(res.data.length);
      } catch (err) {
        alert(err);
      }
    };
    getIncome();
    getProducts();
    getOrders();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{income[0]?.total}</span>
          <span className="featuredMoneyRate">
            %{perc.toFixed(2)}{" "}
            {perc < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Total Products</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalProducts}</span>
          <span className="featuredMoneyRate">
            {/* %{perc.toFixed(2)}{" "}
            {perc < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )} */}
          </span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Total Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{totalOrders}</span>
          <span className="featuredMoneyRate">
            {/* %{perc.toFixed(2)}{" "}
            {perc < 0 ? (
              <ArrowDownwardIcon className="featuredIcon negative" />
            ) : (
              <ArrowUpwardIcon className="featuredIcon" />
            )} */}
          </span>
        </div>
      </div>
    </div>
  );
}
