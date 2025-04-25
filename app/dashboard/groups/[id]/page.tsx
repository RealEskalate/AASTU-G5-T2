// app/groups/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { fetchGroupById } from '@/redux/slices/groupsSlice';
import { RootState } from '@/redux/store';
import RadarChart from '@/app/components/Users/radar-chart';

export default function GroupDetailsPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('Students');
  const [activeTopTab, setActiveTopTab] = useState('Heads');
  const dispatch = useDispatch();
  const router = useRouter();
  const { selectedGroup, loading, error } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    dispatch(fetchGroupById(params.id) as any);
  }, [dispatch, params.id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) {
    if (
      error === 'No access token found. Please log in.' ||
      error === 'No refresh token available. Please log in.' ||
      error === 'Unauthorized: Unable to refresh access token.'
    ) {
      return (
        <div className="p-8 text-red-500">
          {error}
          <button
            className="ml-2 text-blue-500 underline"
            onClick={() => router.push('/login')}
          >
            Log In
          </button>
        </div>
      );
    }
    return <div className="p-8 text-red-500">{error}</div>;
  }
  if (!selectedGroup) return <div className="p-8">Group not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedGroup.name}</h1>
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/groups" className="hover:text-gray-700">
          Groups
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>{selectedGroup.code}</span>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
            <div className=" rounded-md p-4 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-500"></div>
              <h3 className="text-gray-500 mb-1">Time Spent</h3>
              <p className="text-3xl font-bold">
                {typeof selectedGroup.timeSpent === 'number'
                  ? selectedGroup.timeSpent.toLocaleString()


                  : 'N/A'}
              </p>
            </div>
            <div className=" rounded-md p-4 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-500"></div>
              <h3 className="text-gray-500 mb-1">Solved Problems</h3>
              <p className="text-3xl font-bold">{selectedGroup.problemsSolved || 0}</p>
            </div>
            <div className=" rounded-md p-4 relative">
              <div className="absolute top-0 bottom-0 left-0 w-1 bg-green-500"></div>
              <h3 className="text-gray-500 mb-1">Avg. Rating</h3>
              <p className="text-3xl font-bold">
                {typeof selectedGroup.avgRating === 'number'
                  ? selectedGroup.avgRating.toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
          <div className="border-b mb-8">
            <div className="flex">
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTopTab === 'Heads' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTopTab('Heads')}
              >
                Heads
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium ${
                  activeTopTab === 'Titles' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'
                }`}
                onClick={() => setActiveTopTab('Titles')}
              >
                Titles
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2">
          <RadarChart />
        </div>
      </div>
      <div className="border-b mb-6">
        <div className="flex">
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'Students' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('Students')}
          >
            Students
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium ${
              activeTab === 'Statistics' ? 'border-b-2 border-green-500 text-green-600' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab('Statistics')}
          >
            Statistics
          </button>
        </div>
      </div>
      {activeTab === 'Students' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium text-right">Problems</th>
                <th className="pb-3 font-medium text-right">Time Spent</th>
                <th className="pb-3 font-medium text-right">Rating</th>
                <th className="pb-3 font-medium text-right">Last Seen</th>
              </tr>
            </thead>
            <tbody>
              {selectedGroup.students && selectedGroup.students.length > 0 ? (
                selectedGroup.students.map((student: any) => (
                  <tr key={student.id} className="border-b hover:bg-gray-50">
                    <td className="py-4">{student.name}</td>
                    <td className="py-4 text-right">{student.solved}</td>
                    <td className="py-4 text-right">{student.timeSpent}</td>
                    <td className="py-4 text-right">{student.rating}</td>
                    <td className="py-4 text-right">{student.lastSeen || 'N/A'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    No rows
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === 'Statistics' && (
        <div className="py-8 text-center text-gray-500">Statistics content will be displayed here</div>
      )}
    </div>
  );
}