import { CardProps } from "./statCard.type";
import { StatCardView } from "./StatCard.view";

export const StatCard = (props: CardProps) => {
  return <StatCardView {...props} />;
};
