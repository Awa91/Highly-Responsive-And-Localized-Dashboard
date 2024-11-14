import React,{useState} from "react";
import { Data } from "../utils/Data";
import { Doughnut } from "react-chartjs-2";
import { useTranslation } from "react-i18next";


export const DoughnutComponent = React.memo(() => {
  const {t} = useTranslation();

 
 

    const [chartData, setChartData] = useState({
        labels: Data.map((data) => data.year), 
        datasets: [
          {
            label: t("doughnutLabel"),
            data: Data.map((data) => data.userGain),
            backgroundColor: [
              "rgba(75,192,192,1)",
             
              "#ecf0f1",
              "#50AF95",
              "#f3ba2f",
              "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 2,
            fill:true,
       
          }
        ]
      });

    return (<>
    <div className="relative mx-auto">
    <Doughnut data={chartData}/>
    </div>
    </>);
  
  });