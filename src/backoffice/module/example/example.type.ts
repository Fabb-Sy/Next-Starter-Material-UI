import { DehydratedState } from "@tanstack/react-query";

export interface ExampleData {
  id: string;
  code: string;
  name: string;
  description: string;
  active: number;
}

export interface ExampleViewProps {
  initialData?: ExampleData[];
  refreshKey: number;
  handleRefresh: () => void;
  dehydratedState?: DehydratedState;
}
