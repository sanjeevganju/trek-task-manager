import { Task, TaskStatus } from '../App';
import { TaskCard } from './TaskCard';

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

  // Sort sections by section number and filter out undefined
  const sortedSections = Object.keys(groupedTasks)
    .map(Number)
    .filter(sectionNum => groupedTasks[sectionNum] !== undefined)
    .sort((a, b) => a - b);

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
        
        // Sort tasks within section by taskNumber
        const sortedSectionTasks = [...sectionTasks].sort((a, b) => a.taskNumber - b.taskNumber);
        
        return (
          <div key={sectionNum} className="space-y-3">
            {/* Section Heading */}
            <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg sticky top-[72px] z-[5] shadow-md">
              <h2 className="text-sm">
                {sectionNum}. {section}
              </h2>
            </div>

            {/* Tasks in this section */}
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
          </div>
        );
      })}
    </div>
  );
}