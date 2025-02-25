'use client'

import { useCallback, useState } from 'react';
import { ExampleView } from './Example.view';
import { ExampleData } from './example.type';
import { DehydratedState } from '@tanstack/react-query';

export const Example = ({ data, dehydratedState }: { data?: ExampleData[], dehydratedState?: DehydratedState }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = useCallback(() => {
    setRefreshKey(prev => prev + 1);
  }, []);

  return (
    <ExampleView 
      initialData={data}
      refreshKey={refreshKey} 
      handleRefresh={handleRefresh} 
      dehydratedState={dehydratedState}
    />
  );
};
