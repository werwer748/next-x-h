"use client";

import {createContext, ReactNode, useState} from "react";

// 컨텍스트 만들기
export const TabContext = createContext({
  tab: 'rec',
  setTab: (value: 'rec' | 'fol') => {},
});

type TProps = {
  children: ReactNode;
};

export default function TabProvider({ children }: TProps) {
  const [tab, setTab] = useState('rec');
  
  return (
    // 성능 최적화를 진행할 수 있지만 문제가 생기면 그 때 해도 됨
    <TabContext.Provider value={{ tab, setTab }}>
      {children}
    </TabContext.Provider>
  )
}