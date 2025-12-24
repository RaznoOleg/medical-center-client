import { useState, ReactNode } from 'react';
import {
  TabsContainer,
  TabButtonsContainer,
  TabButton,
  TabContent
} from './styles';

interface ITabsProps {
  tabs: Array<{ label: string; content: ReactNode }>;
  defaultTab?: number;
}

const Tabs = ({ tabs, defaultTab = 0 }: ITabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <TabsContainer>
      <TabButtonsContainer>
        {tabs.map((tab, index) => (
          <TabButton
            key={index}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabButtonsContainer>
      <TabContent>{tabs[activeTab]?.content}</TabContent>
    </TabsContainer>
  );
};

export default Tabs;
