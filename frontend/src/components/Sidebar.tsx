import React , {useState, useEffect} from 'react';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';




 

// This sidebar component is for both mobile and desktop
//expanded, setExpanded
export function Sidebar({ children,  }: any) {
 
const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="relative  ">
      {/* 
        This div is used to create the background overlay when the sidebar is expanded
        It is only visible on mobile screens
      */}
     
      <aside
        className={`box-border fixed  top-16 left-0 z-40 mt-1 h-screen  transition-all   ${expanded ? 'w-32 sm:w-32' : '   w-10 sm:w-10 '} `}
      >
        <nav className={`flex h-full flex-col border-r bg-light dark:bg-dark shadow-sm  `}>
          <div className="flex items-center justify-between p-2 ">
          
            <div className={`${expanded ? '' : '  sm:block '}`}>
              {/* (curr: boolean) => !curr */}
              <button
                onClick={() => setExpanded(!expanded)}
                className=" text-primary bg-light 
                dark:bg-dark  border-0    p-1  mx-0  "
              >
                {expanded ? (
                  // ArrowRightIcon
                  <ArrowRightIcon/>
               
                ) : (
                  // ArrowLeftIcn
                
                   <ArrowLeftIcon />
                 
               
                )}
              </button>
            </div>
          </div>
          
          <ul className={`flex-1 sm:px-0  -ml-0  ${expanded ? 'w-[120px] sm:w-[120px]' : '   w-10 sm:w-10 '} `}>{children}</ul>
   
        </nav>
      </aside>
    </div>
  );
}
