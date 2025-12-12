import { Task, TaskStatus } from '../App';
import { CheckCircle2, Circle, Upload, Link2 } from 'lucide-react';
import { useState } from 'react';

interface TaskCardProps {
  task: Task;
  trekStartDate: Date;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onUpdateInput: (taskId: string, inputValue: string) => void;
}

export function TaskCard({ task, trekStartDate, onUpdateStatus, onUpdateInput }: TaskCardProps) {
  const [fileName, setFileName] = useState<string>('');

  // Calculate deadline
  const deadline = task.daysBeforeTrek !== null ? new Date(trekStartDate) : null;
  if (deadline && task.daysBeforeTrek !== null) {
    deadline.setDate(deadline.getDate() - task.daysBeforeTrek);
  }
  
  const today = new Date();
  const daysUntilDeadline = deadline ? Math.ceil(
    (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  ) : null;
  
  const isOverdue = daysUntilDeadline !== null && daysUntilDeadline < 0 && task.status !== 'completed';
  const isUrgent = daysUntilDeadline !== null && daysUntilDeadline <= 3 && daysUntilDeadline >= 0 && task.status !== 'completed';

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short'
    });
  };

  const toggleDone = () => {
    const newStatus: TaskStatus = task.status === 'completed' ? 'not-started' : 'completed';
    onUpdateStatus(task.id, newStatus);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      onUpdateInput(task.id, file.name);
    }
  };

  const renderInputField = () => {
    switch (task.inputType) {
      case 'text':
        return (
          <input
            type="text"
            value={task.inputValue || ''}
            onChange={(e) => onUpdateInput(task.id, e.target.value)}
            placeholder="Enter here..."
            className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-emerald-500"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={task.inputValue || ''}
            onChange={(e) => onUpdateInput(task.id, e.target.value)}
            placeholder="Enter details..."
            rows={2}
            className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-emerald-500 resize-none"
          />
        );
      
      case 'link':
        return (
          <div className="relative">
            <Link2 className="absolute left-2 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="url"
              value={task.inputValue || ''}
              onChange={(e) => onUpdateInput(task.id, e.target.value)}
              placeholder="Paste link here..."
              className="w-full pl-8 pr-2 py-1.5 text-sm border border-slate-300 rounded focus:outline-none focus:border-emerald-500"
            />
          </div>
        );
      
      case 'file':
        return (
          <div className="relative">
            <input
              type="file"
              id={`file-${task.id}`}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*,.pdf"
            />
            <label
              htmlFor={`file-${task.id}`}
              className="flex items-center gap-2 px-3 py-1.5 text-sm border border-slate-300 rounded cursor-pointer hover:bg-slate-50 transition-colors"
            >
              <Upload className="w-4 h-4 text-slate-500" />
              <span className="text-slate-600">
                {fileName || task.inputValue || 'Choose file...'}
              </span>
            </label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white rounded-lg border-2 transition-all p-3 ${
      task.status === 'completed' 
        ? 'border-emerald-300 bg-emerald-50' 
        : isOverdue
        ? 'border-red-300 bg-red-50'
        : isUrgent
        ? 'border-orange-300 bg-orange-50'
        : 'border-slate-200'
    }`}>
      {/* Task Name with hierarchical number */}
      <div className="mb-2">
        <h3 className="text-sm">
          <span className="text-emerald-700 mr-1">{task.sectionNumber}.{task.taskNumber}</span>
          {task.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">{task.description}</p>
      </div>

      {/* Input Field + Deadline + Done Button Row */}
      <div className="flex items-start gap-2">
        {/* Input Field */}
        <div className="flex-1">
          {renderInputField()}
        </div>
        
        {/* Deadline */}
        <div className="flex-shrink-0 w-16 text-right">
          {task.daysBeforeTrek !== null ? (
            <div>
              <p className="text-xs">{formatDate(deadline!)}</p>
              <p className={`text-[10px] ${
                isOverdue ? 'text-red-600' : isUrgent ? 'text-orange-600' : 'text-slate-500'
              }`}>
                {task.daysBeforeTrek}d before
              </p>
            </div>
          ) : (
            <p className="text-xs text-slate-400">No deadline</p>
          )}
        </div>
        
        {/* Done/Not Done Button */}
        <button
          onClick={toggleDone}
          className={`flex-shrink-0 px-3 py-1.5 rounded text-xs transition-colors ${
            task.status === 'completed'
              ? 'bg-emerald-600 text-white hover:bg-emerald-700'
              : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
          }`}
        >
          {task.status === 'completed' ? (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <CheckCircle2 className="w-3 h-3" />
              Done
            </span>
          ) : (
            <span className="flex items-center gap-1 whitespace-nowrap">
              <Circle className="w-3 h-3" />
              Not Done
            </span>
          )}
        </button>
      </div>
      
      {/* Overdue warning */}
      {isOverdue && task.status !== 'completed' && daysUntilDeadline !== null && (
        <div className="mt-2 text-[10px] text-red-700">
          ⚠️ Overdue by {Math.abs(daysUntilDeadline)} days
        </div>
      )}
    </div>
  );
}