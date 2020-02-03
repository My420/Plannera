import React from 'react';
import AppHeader from '../../AppHeader';
import Boards from '../../Boards';

export interface MainPageProps {}

const MainPage: React.FC<MainPageProps> = () => (
  <>
    <AppHeader />
    <Boards />
  </>
);

export default MainPage;
