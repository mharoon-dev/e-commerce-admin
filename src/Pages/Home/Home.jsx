import "./Home.css";
import FeaturedInfo from "../../Components/FeaturedInfo/FeaturedInfo.jsx";
import Chart from "../../Components/Chart/Chart.jsx";
import { userData } from "../../dummyData.js";
import WidgetSm from "../../Components/WidgetSm/WidgetSm.jsx";
import WidgetLg from "../../Components/WidgetLg/WidgetLg.jsx";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod.js";

const Home = () => {
  const [userStats, setUserStats] = useState([]);

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/users/stats");
        res.data.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "Active User": item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [MONTHS]);
  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userStats}
        title="User Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  );
};

export default Home;
