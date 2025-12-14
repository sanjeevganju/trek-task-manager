import { Task, TaskStatus } from '../App';
import { TaskCard } from './TaskCard';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface TaskListProps {
  tasks: Task[];
  trekStartDate: Date;
  onUpdateStatus: (taskId: string, status: TaskStatus) => void;
  onUpdateInput: (taskId: string, inputValue: string) => void;
}

export function TaskList({ tasks, trekStartDate, onUpdateStatus, onUpdateInput }: TaskListProps) {
  // Group tasks by section
  const groupedTasks: { [key: number]: { section: string; tasks: Task[] } } = {};
  
  tasks.forEach(task => {
    if (!groupedTasks[task.sectionNumber]) {
      groupedTasks[task.sectionNumber] = {
        section: task.section,
        tasks: []
      };
    }
    groupedTasks[task.sectionNumber].tasks.push(task);
  });

  // State to track which sections are expanded
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    // Initialize with all sections expanded by default
    return new Set(Object.keys(groupedTasks).map(Number));
  });

  // Sort sections by section number and filter out undefined
  const sortedSections = Object.keys(groupedTasks)
    .map(Number)
    .filter(sectionNum => groupedTasks[sectionNum] !== undefined)
    .sort((a, b) => a - b);

  const toggleSection = (sectionNum: number) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionNum)) {
        newSet.delete(sectionNum);
      } else {
        newSet.add(sectionNum);
      }
      return newSet;
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500">
        No tasks available for this selection
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedSections.map(sectionNum => {
        const sectionData = groupedTasks[sectionNum];
        if (!sectionData) return null;
        
        const { section, tasks: sectionTasks } = sectionData;
        const isExpanded = expandedSections.has(sectionNum);
        
        // Sort tasks within section by taskNumber
        const sortedSectionTasks = [...sectionTasks].sort((a, b) => a.taskNumber - b.taskNumber);
        
        return (
          <div key={sectionNum} className="space-y-3">
            {/* Section Heading with toggle */}
            <button
              onClick={() => toggleSection(sectionNum)}
              className="w-full bg-emerald-600 text-white px-4 py-2 rounded-lg sticky top-[72px] z-[5] shadow-md flex items-center justify-between"
            >
              <h2 className="text-sm">
                {sectionNum}. {section}
              </h2>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5" />
              ) : (
                <ChevronRight className="w-5 h-5" />
              )}
            </button>

            {/* Tasks in this section - only show if expanded */}
            {isExpanded && (
              <div className="space-y-3">
                {sortedSectionTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    trekStartDate={trekStartDate}
                    onUpdateStatus={onUpdateStatus}
                    onUpdateInput={onUpdateInput}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
