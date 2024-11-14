import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import classNames from 'classnames';
import { DashboardIcon,AnalyticsIcon, 
  SearchIcon , EditIcon, ContractsIcon, ReviewsIcon} from "./Icons";
import useOutsideClick from "../hooks/useOutsideClick";
import { Sidebar } from "./Sidebar";
import SidebarItem from "./SidebarItem";


interface HeaderProps {

  logo: string;
  title: string;
  logoLabel: string;
}


interface DropdownItem {
  id: string;
  name: string;
  url?: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hasUrl?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}




export const UserDashboardHeader = React.memo((props: HeaderProps) => {
  console.log('User Dashboard Header component');
  const { logo, logoLabel, title, } = props;

  const {t} = useTranslation();
  

  



  // Dropdown data
  const dropdownData = [
    { id: "0", name:  t("sidebarText.editProfile"), url: "/edit-profile" },
    { id: "1", name:  t("sidebarText.contracts"), url: "/contracts" },
    { id: "2", name:  t("sidebarText.reviews"), url: "/reviews" },
    { id: "3", name:  t("sidebarText.analytics"), url: "analytics" },
    { id: "4", name:  t("sidebarText.search"), url: "search" },
  ]
  // End data


  // Sidebar
  function MakeSidebar() {
    const [expanded, setExpanded] = useState(true);

    const sideBarItems = [

      {
        icon: (
         <DashboardIcon/>
        ),
        text:  t("sidebarText.dashboard"),
        active: true,
        url: '/'
      },


      {
        icon: (
          <EditIcon/>
        ),
        text:  t("sidebarText.editProfile"),

        url: 'edit-profile'
      },

      {
        icon: (
         <ContractsIcon/>
        ),
        text:  t("sidebarText.contracts"),

        url: 'contacts'
      },
      {
        icon: (
        <ReviewsIcon/>
        ),
        text:  t("sidebarText.reviews"),

        url: "/reviews"
      },
      {
        icon: <AnalyticsIcon/>,
        text:  t("sidebarText.analytics"),
        url: "/analytics"
      },
      {
        icon: <SearchIcon/>,
        text:  t("sidebarText.search"),

        url: "/search"
      },

    ];
    return (
      <Sidebar expanded={expanded} setExpanded={setExpanded}>
        {sideBarItems.map((item, index) => (
          <SidebarItem key={index} expanded={expanded} {...item} />
        ))}
        
      </Sidebar>
    );

  }
  // End sidebar

  // Dropdown menu
  const Dropdown = ({
    id,
    
    data,
    position = 'bottom-right',
    hasUrl = false,
    style,
    selectedId,
    onSelect,
  }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
      selectedId ? data?.find((item) => item.id === selectedId) : undefined
    );

    const handleChange = (item: DropdownItem) => {
      setSelectedItem(item);
      onSelect && onSelect(item.id);
      setIsOpen(false);
    };

    useEffect(() => {
      if (selectedId && data) {
        const newSelectedItem = data.find((item) => item.id === selectedId);
        newSelectedItem && setSelectedItem(newSelectedItem);
      } else {
        setSelectedItem(undefined);
      }
    }, [selectedId, data]);

    const dropdownRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
      ref: dropdownRef,
      handler: () => setIsOpen(false),
    });

    const dropdownClass = classNames(
      'absolute bg-light dark:bg-dark text-light dark:text-dark  w-max max-h-52 overflow-y-auto py-0 rounded shadow-md z-10',
      {
        'top-full right-0 mt-2': position === 'bottom-right',
        'top-full left-0 mt-2': position === 'bottom-left',
        'bottom-full right-0 mb-2': position === 'top-right',
        'bottom-full left-0 mb-2': position === 'top-left',
      }
    );

    const strokeColor: string = "#87CEEB";
    return (
      <div ref={dropdownRef} className='relative '>
        <div className='flex justify-end'>
          <button
            id={id}
            aria-label='Toggle dropdown'
            aria-haspopup='true'
            aria-expanded={isOpen}
            type='button'
            onClick={() => setIsOpen(!isOpen)}
            className={classNames(
              'border-0 items-center gap-1 rounded  py-0 px-0  bg-light dark:bg-dark text-light dark:text-dark',
              style
            )}
          >
            {/* <span>{selectedItem?.name || title}</span> */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke={strokeColor} className={classNames('transform duration-500 ease-in-out h-[32px] w-[32px]', {
              'rotate-0': isOpen,
            })}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>


          </button>
        </div>
        {/* Open */}
        {isOpen && (
          <div aria-label='Dropdown menu' className={dropdownClass}>
            <ul
              role='menu'
              aria-labelledby={id}
              aria-orientation='vertical'
              className='leading-10  '
            >
              {data?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleChange(item)}
                  className={classNames(
                    'flex items-center w-40 cursor-pointer hover:bg-secondary p-2 mx-4 my-2 h-14',
                    { 'bg-gray-300': selectedItem?.id === item.id }
                  )}
                >
                  {hasUrl && (

                    <a href={item.url}>
                      <span>{item.name}</span>
                    </a>

                  )}

                </li>
              ))}
            </ul>
          
          </div>
        )}
      </div>
    );
  };

  // End menu

  // Handle dropdown select event
  const handleSelect = (id: string) => {
    //console.log(`Selected item with id ${id}`);
  };


  return (<>
    {/* Navigation bar on large screen */}
    <div className='w-screen bg-light  h-[70px] -inset-0  z-10 fixed drop-shadow-lg dark:bg-dark font-poppins'>
      <div className='px-2 flex justify-between items-center w-full h-full'>
        {/*   Grid with 1 col */}
        <div className="w-full     grid  sm:grid-cols-1   md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1
                 gap-0  " >
          {/* Col 1 */}
          <div className=" w-full  ">
            {/* Grid for logo and company name */}
            <div className="grid  sm:ml-6 md:ml-10 lg:ml-14 xl:ml-16 2xl:ml-20">
              <div className="flex ">


                <p className="font-satistfy mx-4 my-4 tracking-wider text-light dark:text-dark ">{title}</p>
                <img src={logo} alt={logoLabel} className="rounded-full mx-4 my-2 h-[30px] w-[40px]" />

                <MakeSidebar />

              
              </div>
              {/* Dropdown menu */}
              <div className="relative -mt-12 mr-10">
                <Dropdown
                  id='dropdown'
                  title=''
                  data={dropdownData}
                  hasUrl
                  onSelect={handleSelect}
                />
              </div>
              {/* End menu */}
              <div className="relative">

              </div>

            </div>
            {/* End grid */}


          </div>
          {/*  End Col 1 */}

        </div>
        {/*  End Grid  */}

      </div>

    </div>
  </>);

});






