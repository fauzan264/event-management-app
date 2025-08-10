export const formattingDateTime = ({ date }: { date: string }) => {
  const formatDate = new Date(date);
  formatDate.toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatDate.toString();
};
