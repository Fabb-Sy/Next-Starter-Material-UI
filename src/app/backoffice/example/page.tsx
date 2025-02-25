import { Example } from "@/backoffice/module/example/Example";
import { ExampleData } from "@/backoffice/module/example/example.type";
import { fetchAxios } from "@/lib/fetchAxios";
import { dehydrate, QueryClient } from "@tanstack/react-query";

const getDataExample = async (): Promise<ExampleData[]> => {
  try {
    const res = await fetchAxios({
      method: 'GET',
      url: '/v1/example',
      isServer: true,
    });

    return res ?? []; // Default ke [] jika items undefined
  } catch (error) {
    console.error('Error fetching example data:', error);
    return [];
  }
};

export default async function ExamplePage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 1000, // Adjust stale time as needed
        
      },
    },
  });

  // Prefetch only initial page data
  await queryClient.prefetchQuery({
    queryKey: ['tanstack-table', 1, 15, '', '', 'asc', '/v1/example'],
    queryFn: getDataExample,
  });

  const dehydratedState = dehydrate(queryClient);
  const initialData = await getDataExample();

  console.log('initialData', initialData);
  console.log('dehydratedState', dehydratedState);

  return (
    <Example
      data={initialData}
      dehydratedState={dehydratedState}
    />
  );
}