import React, { useEffect, useState } from "react";
import { LineChartBoundaries } from "./LineChartBoundaries";
import { DoughnutComponent } from "./Doughnut";
import { CardWithList } from "./CardWithList";
import { useTranslation } from "react-i18next";
import { Table } from "./Table";

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export const UserDashboard = React.memo(() => {
  const {t} = useTranslation();
  const [data, setData] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  

  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);
  const [dataToDisplay, setDataToDisplay] = useState<Todo[]>([]);
  const TOTAL_VALUES_PER_PAGE = 10;

  const goOnPrevPage = () => {
    if (currentPageNumber === 1) return;
    setCurrentPageNumber((prev) => prev - 1);
  };

  const goOnNextPage = () => {
    if (currentPageNumber === Math.ceil(data.length / TOTAL_VALUES_PER_PAGE)) return;
    setCurrentPageNumber((prev) => prev + 1);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentPageNumber(Number(e.target.value));
  };

  useEffect(() => {
    const start = (currentPageNumber - 1) * TOTAL_VALUES_PER_PAGE;
    const end = currentPageNumber * TOTAL_VALUES_PER_PAGE;
    setDataToDisplay(data.slice(start, end));
  }, [currentPageNumber, data]);

  useEffect(() => {
    const fetchdata = async () => {
      try {
       
          const response = await fetch("https://jsonplaceholder.typicode.com/todos");
          const res: Todo[] = await response.json();
          setData(res);
          setDataToDisplay(res.slice(0, TOTAL_VALUES_PER_PAGE));
      } catch (error: any) {
          setError(error.message);
         alert('Unable to fetch data. Please check your internet connection and try agin.')
           console.error("Error fetching data:", error);
      } finally {
          setLoading(false);
      }
  };
  fetchdata();
  }, []);

  if (loading) return <p className="relative   text-light dark:text-dark">Loading...</p>;
  if (error) return <p className="relative text-light dark:text-dark">Error: {error}</p>;
  if (data.length === 0) return <p className="relative text-light dark:text-dark">No post available...</p>;


  return (<>
    {/* <!-- UserDashboard --> */}

    {/* max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14  */}
    <div className="relative   m-0 mx-auto antialiased ">
      {/* max-w-5xl ml-40  sm:ml-32*/}
      <div className=" m-0 mx-auto antialiased ">
        {/* <!--Outer most Grid --> */}
        <div className="grid lg:grid-cols-6 xl:grid-cols-6 2xl:grid-cols-6 gap-4 mt-20 bg-light dark:bg-black">
          {/* First Column (80% width)  */}
          <div className="lg:col-span-4 xl:col-span-4 2xl:col-span-4 p-4 mx-auto">
          
            {/* <!-- Outer Grid --> */}
            <div className="grid grid-cols-1 gap-4">
              
              {/* First Column */}
              <div className="  p-4">

               
                {/* <!-- Grid --> */}
                <div className="grid lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 sm:grid-cols-1 md:grid-cols-1 gap-4">

                  {/* First Column */}
                  <div className="2xl:ml-20  p-4">
                   
                    <DoughnutComponent />

                  </div>

                  {/*  Second Column  */}
                  <div className="  p-4">
                    
                    <LineChartBoundaries />
                  </div>

                </div>
                {/* <!-- End Grid --> */}
              </div>

              {/*  Second Column  */}
              <div className="2xl:ml-28  p-4">
               

                {/* Page selection */}

                <div id="page-no-dropdown">
                  <select
                    name="page-number"
                    onChange={handleSelectChange}
                    value={currentPageNumber}
                  
                  >
                    {Array.from(Array(data.length / TOTAL_VALUES_PER_PAGE))
                      .map((e, i) => i + 1)
                      .map((val) => {
                        return <option className="text-light dark:text-dark text-xs font-poppins" key={val}>{val}</option>;
                      })}
                  </select>
                </div>
                {/* End selection */}


                <Table dataToDisplay={dataToDisplay} />

                {/* Pagination */}
                <div className="mx-32 mt-5 font-poppins text-xs text-light dark:text-dark">
                  <button className="mr-4 p-2" onClick={goOnPrevPage}>{t('prev')}</button>
                  <button onClick={goOnNextPage}>{t('next')}</button>
                </div>
                {/* end Pagination */}

              </div>

            </div>
            {/* <!--End Outer Grid --> */}

          </div>

          {/* Second Column (20% width)  */}
          <div className="lg:col-span-2 xl:col-span-2 2xl:col-span-2  p-4 mx-auto">
           
            <CardWithList />
 
         
          </div>

        </div>

        {/* <!-- End Outer most Grid --> */}
      </div>
    </div>
    {/* <!-- End UserDashboard --> */}
  </>);
});
