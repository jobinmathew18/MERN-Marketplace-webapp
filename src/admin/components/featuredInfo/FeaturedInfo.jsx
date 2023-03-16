import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userRequest } from "../../../requestMethods";
import "./featuredInfo.css";

const FeaturedInfo = () => {
  const [income, setIncome] = useState([])
  const [perc, setPerc] = useState(0)

  useEffect(()=>{
    const getIncome = async ()=>{
      try {
        const res = await userRequest.get('/orders/income')
        setIncome(res.data[1].total)

        //FORMULA for Percentage Increase = (Final Value−Starting Value/Starting Value)×100   
        setPerc(((res.data[1].total - res.data[0].total)/res.data[0].total) * 100)
      } catch (error) {
        console.log(error)
      } 
    }
    getIncome()
  }, [])


  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span> 
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income}</span>
          <span className="featuredMoneyRate">
            {Math.floor(perc)} %
            {
              perc > 0 ? <ArrowUpward className="featuredIcon" /> : <ArrowDownward className="featuredIcon negative" />
            }
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
};

export default FeaturedInfo;
