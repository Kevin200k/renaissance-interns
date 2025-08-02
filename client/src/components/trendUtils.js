// /components/trendUtils.js
export default function formatTrendDescription(title, trendValue) {
  if (trendValue === 0) return 'No change';

  const abs = Math.abs(trendValue);
  const isUp = trendValue > 0;

  switch (title) {
    case 'Avg. Check-In Time': {
      const minutes = Math.round(abs * 60);
      return `${minutes} min ${isUp ? 'later' : 'earlier'} than usual`;
    }
    case 'Total Check-Ins':
    case 'Days Attended':
      return `${abs} more than last period`;
    case 'On-Time Percentage':
      return `${isUp ? '+' : '-'}${abs}% from last period`;
    default:
      return `${isUp ? '+' : '-'}${abs}`;
  }
}
