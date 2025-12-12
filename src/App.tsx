import { useState } from 'react';
import { TrekTypeSelector } from './components/TrekTypeSelector';
import { TeamSelector } from './components/TeamSelector';
import { TaskList } from './components/TaskList';
import { TrekInfoCard } from './components/TrekInfoCard';

export type TrekType = 'treks' | 'expeditions' | 'climbs';
export type Team = 'ground-ops' | 'support' | 'trip-leader' | 'head-office';
export type TaskStatus = 'not-started' | 'in-progress' | 'completed';
export type Priority = 'high' | 'medium' | 'low';
export type InputType = 'text' | 'file' | 'link' | 'textarea';

export interface Task {
  id: string;
  title: string;
  description: string; // Instructions for the user
  status: TaskStatus;
  priority: Priority;
  daysBeforeTrek: number | null; // How many days before trek start this should be done, null for no deadline
  assignee?: string;
  trekType: TrekType;
  team: Team;
  inputType: InputType; // Type of input field needed
  inputValue?: string; // Value entered by user
  section: string; // Section/category name
  sectionNumber: number; // Section number (1, 2, 3...)
  taskNumber: number; // Task number within section (1, 2, 3...)
}

export interface TrekInfo {
  name: string;
  startDate: Date;
  firstBookingDate: Date;
}

function App() {
  const [selectedTrekType, setSelectedTrekType] = useState<TrekType>('treks');
  const [selectedTeam, setSelectedTeam] = useState<Team>('ground-ops');
  
  // Sample trek info - in production, this would come from your booking system
  const [trekInfo] = useState<TrekInfo>({
    name: 'Hampta Pass Trek',
    startDate: new Date('2025-06-15'),
    firstBookingDate: new Date('2025-03-01')
  });

  // Sample tasks - in production, these would be templates from your database
  const [tasks, setTasks] = useState<Task[]>([
    // 1. Informational fields
    {
      id: 'info-1',
      title: 'Dates of the trek',
      description: 'Enter trek dates',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Informational fields',
      sectionNumber: 1,
      taskNumber: 1
    },
    {
      id: 'info-2',
      title: 'Name of the Base serving the Trek',
      description: 'Enter base name',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Informational fields',
      sectionNumber: 1,
      taskNumber: 2
    },
    {
      id: 'info-3',
      title: 'Date of departure from Base',
      description: 'Enter departure date',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Informational fields',
      sectionNumber: 1,
      taskNumber: 3
    },
    // 2. Permits
    {
      id: '2',
      title: 'Obtain trekking permit',
      description: 'Upload pdf of permit',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 4,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Permits',
      sectionNumber: 2,
      taskNumber: 1
    },
    // 3. Support Vehicle Details
    {
      id: 'sv-1',
      title: 'Support Vehicle Nos (multiple, max 2/ tabular)',
      description: 'Enter vehicle numbers',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Support Vehicle Details',
      sectionNumber: 3,
      taskNumber: 1
    },
    {
      id: 'sv-2',
      title: 'Support Vehicle Provider Ph No',
      description: 'Enter provider phone number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Support Vehicle Details',
      sectionNumber: 3,
      taskNumber: 2
    },
    {
      id: 'sv-3',
      title: 'Support Vehicle Driver Ph No',
      description: 'Enter driver phone number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Support Vehicle Details',
      sectionNumber: 3,
      taskNumber: 3
    },
    {
      id: 'sv-4',
      title: 'Support Vehicle Make',
      description: 'Enter vehicle make',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Support Vehicle Details',
      sectionNumber: 3,
      taskNumber: 4
    },
    {
      id: 'sv-5',
      title: 'Support Vehicle Reg No',
      description: 'Enter registration number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Support Vehicle Details',
      sectionNumber: 3,
      taskNumber: 5
    },
    // 4. Client Transport Details
    {
      id: 'ct-1',
      title: 'Client Transport Nos (multiple, max 6 / tabular)',
      description: 'Enter client transport numbers',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Client Transport Details',
      sectionNumber: 4,
      taskNumber: 1
    },
    {
      id: 'ct-2',
      title: 'Client Transport Type (Innova/ TT/ Bus)',
      description: 'Enter transport type',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Client Transport Details',
      sectionNumber: 4,
      taskNumber: 2
    },
    {
      id: 'ct-3',
      title: 'Client Vehicle Provider Ph No',
      description: 'Enter provider phone number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Client Transport Details',
      sectionNumber: 4,
      taskNumber: 3
    },
    {
      id: 'ct-4',
      title: 'Client Vehicle Driver Ph No',
      description: 'Enter driver phone number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Client Transport Details',
      sectionNumber: 4,
      taskNumber: 4
    },
    {
      id: 'ct-5',
      title: 'Client Vehicle Make',
      description: 'Enter vehicle make',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Client Transport Details',
      sectionNumber: 4,
      taskNumber: 5
    },
    {
      id: 'ct-6',
      title: 'Support Vehicle Reg No',
      description: 'Enter registration number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 5,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Client Transport Details',
      sectionNumber: 4,
      taskNumber: 6
    },
    // 5. Staff Details
    {
      id: '6',
      title: 'Guide Name & Ph No',
      description: 'Enter name on the table above & Lock Cell',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 15,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Staff Details',
      sectionNumber: 5,
      taskNumber: 1
    },
    {
      id: '5',
      title: 'Cook Name & Ph No',
      description: 'Enter name on the table above & Lock Cell',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 15,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Staff Details',
      sectionNumber: 5,
      taskNumber: 2
    },
    {
      id: '7',
      title: 'Kitchen Helper Name & Ph No',
      description: 'Enter names on the table above & Lock Cells',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 10,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Staff Details',
      sectionNumber: 5,
      taskNumber: 3
    },
    {
      id: 'staff-1',
      title: 'Sherpa Name & Ph No',
      description: 'Enter name and phone number',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 10,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Staff Details',
      sectionNumber: 5,
      taskNumber: 4
    },
    {
      id: 'staff-2',
      title: 'Support Staff Names (multiple) with Ph Nos',
      description: 'Enter all support staff names and phone numbers',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 10,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'textarea',
      section: 'Staff Details',
      sectionNumber: 5,
      taskNumber: 5
    },
    {
      id: 'staff-3',
      title: 'Personal Porter',
      description: 'Enter personal porter details',
      status: 'not-started',
      priority: 'low',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Staff Details',
      sectionNumber: 5,
      taskNumber: 6
    },
    // 6. Equipment & Menu
    {
      id: 'equip-1',
      title: 'Equipment List',
      description: 'Upload equipment list',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Equipment & Menu',
      sectionNumber: 6,
      taskNumber: 1
    },
    {
      id: 'equip-2',
      title: 'Menu',
      description: 'Upload menu details',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Equipment & Menu',
      sectionNumber: 6,
      taskNumber: 2
    },
    {
      id: 'equip-3',
      title: 'Kitchen Utensils/ Equipment List',
      description: 'Upload kitchen equipment list',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Equipment & Menu',
      sectionNumber: 6,
      taskNumber: 3
    },
    // 7. Porter/Mule Details
    {
      id: '8',
      title: 'Name & No of vendor providing Porters/ Mules',
      description: 'Enter Porter Vendor Name & Contact',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 15,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Porter/Mule Details',
      sectionNumber: 7,
      taskNumber: 1
    },
    {
      id: '9',
      title: 'No of Porters/ Mules booked',
      description: 'Enter no. of porters',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Porter/Mule Details',
      sectionNumber: 7,
      taskNumber: 2
    },
    {
      id: 'porter-1',
      title: 'Per day rate of Porters/ Mules',
      description: 'Enter per day rate',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Porter/Mule Details',
      sectionNumber: 7,
      taskNumber: 3
    },
    {
      id: 'porter-2',
      title: 'No of extra days need to pay for',
      description: 'Enter number of extra days',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 7,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Porter/Mule Details',
      sectionNumber: 7,
      taskNumber: 4
    },
    // 8. Shopping
    {
      id: 'shop-1',
      title: 'Shopping of ration for Porter/ Mule',
      description: 'Upload photo of list',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 2,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Shopping',
      sectionNumber: 8,
      taskNumber: 1
    },
    {
      id: '18',
      title: 'Shopping of dry ration, veg, non veg, fuel etc',
      description: 'Upload photo of list',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 2,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Shopping',
      sectionNumber: 8,
      taskNumber: 2
    },
    {
      id: 'shop-2',
      title: 'Shopping of vegetables',
      description: 'Upload photo of list',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 2,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Shopping',
      sectionNumber: 8,
      taskNumber: 3
    },
    {
      id: 'shop-3',
      title: 'Shopping of perishables (bread/ eggs/ chicken/ paneer/ curd)',
      description: 'Upload photo of list',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Shopping',
      sectionNumber: 8,
      taskNumber: 4
    },
    // 9. Packing & Final Prep
    {
      id: '17',
      title: 'Packing of all equipment & food supplies in the store',
      description: 'Share detailed packing list',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 2,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Packing & Final Prep',
      sectionNumber: 9,
      taskNumber: 1
    },
    {
      id: 'prep-1',
      title: 'Re-confirm final porter nos/ horses after packing',
      description: 'Enter final confirmed numbers',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Packing & Final Prep',
      sectionNumber: 9,
      taskNumber: 2
    },
    {
      id: '19',
      title: 'Briefing of guide & staff about the trip specs / handing cash, WM merchandise (caps, certificates, flags etc)',
      description: 'Brief TLs on route, difficulty, pax etc.',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Packing & Final Prep',
      sectionNumber: 9,
      taskNumber: 3
    },
    {
      id: '20',
      title: 'Weather forecast & emergency plan along with the print outs',
      description: 'Upload screenshot',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Packing & Final Prep',
      sectionNumber: 9,
      taskNumber: 4
    },
    {
      id: 'prep-2',
      title: 'Any second supply planned',
      description: 'Enter second supply details if any',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Packing & Final Prep',
      sectionNumber: 9,
      taskNumber: 5
    },
    // 10. Return Arrangements
    {
      id: 'return-1',
      title: 'Porters/ Mules for return',
      description: 'Confirm porter/mule arrangements for return',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Return Arrangements',
      sectionNumber: 10,
      taskNumber: 1
    },
    {
      id: 'return-2',
      title: 'Support vehicle for return',
      description: 'Confirm support vehicle for return',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Return Arrangements',
      sectionNumber: 10,
      taskNumber: 2
    },
    {
      id: 'return-3',
      title: 'Client vehicles for return',
      description: 'Confirm client vehicles for return',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: 1,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Return Arrangements',
      sectionNumber: 10,
      taskNumber: 3
    },
    // 11. Post Trek Arrangements
    {
      id: 'post-0',
      title: 'Post Trek arrangements',
      description: 'Post trek tasks',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 1
    },
    {
      id: 'post-camp-1',
      title: 'All Camping equipment washed/ maintenance done',
      description: 'Confirm camping equipment maintenance',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 2
    },
    {
      id: 'post-4',
      title: 'All Camping equipment deposited',
      description: 'Verify all camping equipment returned',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 3
    },
    {
      id: 'post-camp-2',
      title: 'Any loss/ damage',
      description: 'Report any loss or damage to camping equipment',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'textarea',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 4
    },
    {
      id: 'post-kit-1',
      title: 'All kitchen equipment washed/ maintenance done',
      description: 'Confirm kitchen equipment maintenance',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 5
    },
    {
      id: 'post-kit-2',
      title: 'All Kitchen equipment deposited',
      description: 'Verify all kitchen equipment returned',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 6
    },
    {
      id: 'post-kit-3',
      title: 'Any loss/ damage',
      description: 'Report any loss or damage to kitchen equipment',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'textarea',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 7
    },
    {
      id: 'post-debrief',
      title: 'Staff & trip leader de-brief (360 feedback)',
      description: 'Conduct debrief session',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'textarea',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 8
    },
    {
      id: 'post-reports',
      title: 'Submission of trip reports & bills etc',
      description: 'Upload trip reports and bills',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 9
    },
    {
      id: 'post-media',
      title: 'Submission of trip photos/ videos',
      description: 'Upload trip photos and videos',
      status: 'not-started',
      priority: 'medium',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 10
    },
    {
      id: 'post-accounts',
      title: 'Trip Accounts Submission',
      description: 'Submit trip accounts',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'file',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 11
    },
    {
      id: 'post-wages',
      title: 'Store - Store no of days for wages/ incentive',
      description: 'Enter number of days for wages calculation',
      status: 'not-started',
      priority: 'high',
      daysBeforeTrek: null,
      trekType: 'treks',
      team: 'ground-ops',
      inputType: 'text',
      section: 'Post Trek Arrangements',
      sectionNumber: 11,
      taskNumber: 12
    }
  ]);

  // Filter tasks based on selected trek type and team
  const filteredTasks = tasks.filter(
    task => task.trekType === selectedTrekType && task.team === selectedTeam
  );

  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  const updateTaskInput = (taskId: string, inputValue: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, inputValue } : task
    ));
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header */}
      <div className="bg-emerald-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <h1 className="text-center">Trek Task Manager</h1>
        <p className="text-center text-emerald-100 text-sm mt-1">Pre-Trek Operations Checklist</p>
      </div>

      <div className="p-4 space-y-4">
        {/* Trek Info */}
        <TrekInfoCard trekInfo={trekInfo} />

        {/* Selectors */}
        <div className="space-y-3">
          <TrekTypeSelector 
            selected={selectedTrekType} 
            onChange={setSelectedTrekType} 
          />
          <TeamSelector 
            selected={selectedTeam} 
            onChange={setSelectedTeam} 
          />
        </div>

        {/* Task List */}
        <TaskList 
          tasks={filteredTasks} 
          trekStartDate={trekInfo.startDate}
          onUpdateStatus={updateTaskStatus}
          onUpdateInput={updateTaskInput}
        />
      </div>
    </div>
  );
}

export default App;