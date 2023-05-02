// React
import { ReactNode } from 'react';

// Component
import Header from '../App/Header';
import SideMenu from '../App/SideMenu';
import OverlayLayer from '../App/OverlayLayer';

// CSS
import './DefaultLayout.css'

type DefaultLayoutProps = { children: ReactNode };

function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <div className='app-default-layout'>
        <Header/>
        <div className='app-main'>
          <SideMenu/>
          <div className='app-content'>{children}</div>
        </div>     
      </div>
      { OverlayLayer() }
    </>
  );
};

export default DefaultLayout