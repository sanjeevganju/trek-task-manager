import { Calendar, Users } from 'lucide-react';
import { TrekInfo } from '../App';

interface TrekInfoCardProps {
  trekInfo: TrekInfo;
}

export function TrekInfoCard({ trekInfo }: TrekInfoCardProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  const daysUntilTrek = Math.ceil(
    (trekInfo.startDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h2 className="text-emerald-700">{trekInfo.name}</h2>
          <div className="flex items-center gap-2 mt-2 text-slate-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Start: {formatDate(trekInfo.startDate)}</span>
          </div>
          <div className="flex items-center gap-2 mt-1 text-slate-600">
            <Users className="w-4 h-4" />
            <span className="text-sm">First booking: {formatDate(trekInfo.firstBookingDate)}</span>
          </div>
        </div>
        <div className="bg-emerald-50 px-3 py-2 rounded-lg text-center">
          <div className="text-2xl text-emerald-700">{daysUntilTrek}</div>
          <div className="text-xs text-emerald-600">days left</div>
        </div>
      </div>
    </div>
  );
}
