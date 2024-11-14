import React, { ChangeEventHandler, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { UserProfileCard } from "./UserProfileCard";
import SearchBar from "./Searchbar";


interface searchData {
    status: string;
    applicationDate: string;
    jobTitle: string;
    company: string;
    location: string;
    jobRequirement: { requirement: string[]; }
}


export const CardWithList = React.memo(() => {
    const { t } = useTranslation();
    var section = t('section', { returnObjects: true }) // Return the array from my local JSON file

    let applicationStatus = t('applicationStatus', { returnObjects: true });
    console.log(applicationStatus)
    // const [contentData, setContentData] = useState<searchData[]>([

    const [contentData, setContentData] = useState(
      
            applicationStatus

);
    const [searchContentData, setSearchContentData] = useState<string>('');
    const [searchDataErr, setSearchDataErr] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(``);
                const data = await response.json();
                //if fetch works but there is a data mismatch, throw specialized error
                if (!data) { throw new Error("Unable to find data") }
                else { setContentData(data) }
            } catch (error) {
                //catches auto thrown and data mismatch errors
                console.log(error);
                setSearchDataErr(true)
            }
        }
        fetchData();
    }, [])

    const searchHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        setSearchContentData(e.currentTarget.value);
    }




    return (<>


        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">


            <SearchBar
                value={searchContentData}
                placeholder={t('searchPlaceholder')}
                searchHandler={searchHandler}
            />

            {/* Search End */}
            <UserProfileCard />
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 mt-14 dark:text-white">{t('appStatusTitle')}</h5>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
                    {t('viewAll')}
                </a>
            </div>
            <div className="flow-root">

                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">



                    {
                         contentData && 
                         contentData.length > 0 &&
                        contentData.filter(stat =>
                            stat.status.toLowerCase().startsWith(searchContentData.toLowerCase()) ||
                            stat.company.toLowerCase().startsWith(searchContentData.toLowerCase()) ||
                            (`${stat.status} ${stat.company}`).toLowerCase().startsWith(searchContentData.toLowerCase())
                        ).map((status, index) =>
                            <li className="py-3 sm:py-4" key={index}>
                                <div className="flex items-center">

                                    <div className="">
                                        <div className="flex justify-between ">
                                            <span className="inline-flex items-center justify-center p-2  mb-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">{status.status}</span>
                                            <span className="inline-flex items-center justify-center p-2 mb-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">{status.applicationDate}</span>


                                        </div>
                                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                            {status.jobTitle}
                                        </p>
                                        <p className="text-sm text-gray-500 mt-3 truncate dark:text-gray-400">
                                            {status.company} ({status.location})
                                        </p>
                                        <div className="flex justify-start">

                                            {status.jobRequirement.requirement.map((rqt, index) => (
                                                <span key={index} className="inline-flex items-center justify-center p-2 mt-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">{rqt}</span>
                                            ))}


                                        </div>
                                    </div>

                                </div>
                            </li>

                        )

                    }
                </ul>
            </div>
        </div>

    </>);

});






