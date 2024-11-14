import { useEffect, useState } from 'react';
import { ArrowRightIcon } from './Icons';

interface SidebarItemProps {
  active?: boolean;
  icon: React.ReactNode;
  url?: string;
  text: string;
  expanded: boolean;
  subMenu?: SubMenuItemProps[] | null;
}

// We're assuming that the sub-menu items will not have further sub-menu items therefore, it cannot be expanded
interface SubMenuItemProps extends Omit<SidebarItemProps, 'expanded'> {
  expanded?: never;
  subMenu?: never;
}

// This component is used to render the sub-menu items when hovered
function HoveredSubMenuItem({ icon, text,url, active }: SubMenuItemProps) {
  return (
    <div
      className={`my-2 rounded-md p-2 ${
        active ? 'bg-secondary' : ' hover:bg-primary'
      }`}
    >
      <div className="flex items-center justify-center  ">
        <span className="text-primary h-6 w-6 "> <a href={url}>{icon}</a></span>
        <span className="text-primary ml-3 w-28 text-start">
          <a className='font-poppins text-xs text-light dark:text-dark' href={url}>{text}</a></span>
          <div className="bg-primary h-1" />
      </div>
    </div>
  );
}

export default function SidebarItem({
  icon,
  active = false,
  text,
  url,
  expanded = false,
  subMenu = null,
}: SidebarItemProps) {
  const [expandSubMenu, setExpandSubMenu] = useState(false);

  useEffect(() => {
    if (!expanded) {
      setExpandSubMenu(false);
    }
  }, [expanded]);

  // Calculate the height of the sub-menu assuming each item is 40px tall
  const subMenuHeight = expandSubMenu
    ? `${((subMenu?.length || 0) * 40 + (subMenu! && 15)).toString()}px`
    : 0;

  return (
    <>
      <li>
        <button
          className={`
         group relative my-1 flex w-full cursor-pointer
         items-center rounded-md border-0 px-3
         py-2 font-medium transition-colors
         bg-light dark:bg-dark
         text-light dark:text-dark
        
            
         ${
           active && !subMenu
             ? 'bg-light dark:bg-dark text-primary dark:text-primary hover:text-secondary'
             : 'text-light dark:text-dark  hover:bg-secondary hover:text-secondary'
         }
         ${!expanded && ' sm:flex'}
     `}
          onClick={() => setExpandSubMenu((curr) => expanded && !curr)}
        >
          <span className="h-6 w-6 "><a href={url}>{icon}</a></span>

          <span
            className={`overflow-hidden text-start transition-all ${
              expanded ? 'ml-3 w-44' : 'w-0'
            }`}
          >
            <a className='font-poppins text-xs text-light dark:text-dark' href={url}>{text}</a>
          </span>
          {subMenu && (
            <div
              className={`absolute right-2 h-4 w-4${expanded ? '' : 'top-2'} transition-all ${expandSubMenu ? 'rotate-90' : 'rotate-0'}`}
            >
        
<ArrowRightIcon/>

            </div>
          )}

          {/* 
            display item text or sub-menu items when hovered
          */}
          {!expanded && (
            <div
              className={`
            text-light dark:text-dark  invisible absolute left-full ml-6 -translate-x-3
            rounded-md border-0 bg-light dark:bg-dark  px-2
            py-1 text-sm opacity-20 transition-all
            group-hover:visible group-hover:translate-x-0 group-hover:opacity-100
        `}
            >
              {/* 
                if hovered item has no sub-menu, display the text
                else display the sub-menu items
              */}
              {!subMenu
                ? text
                : subMenu.map((item, index) => (
                    <HoveredSubMenuItem
                      key={index}
                      text={item.text}
                      icon={item.icon}
                      url={item.url}
                    />
                  ))}
            </div>
          )}
        </button>
      </li>
      <ul
        className="sub-menu pl-6 "
        style={{ height: subMenuHeight }}
      >
        {/* 
          Render the sub-menu items if the item has a sub-menu
          The sub-menu items are rendered as SidebarItem components
        */}
        {expanded &&
          subMenu?.map((item, index) => (
            <SidebarItem key={index} {...item} expanded={expanded} />
          ))}
      </ul>
    </>
  );
}