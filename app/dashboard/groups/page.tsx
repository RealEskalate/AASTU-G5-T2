// app/groups/page.tsx
'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { fetchAllGroups } from '@/redux/slices/groupsSlice';
import { RootState } from '@/redux/store';

interface GroupCardProps {
  id: string;
  name: string;
  code: string;
  members: number;
  timeSpent: number | null | undefined;
  avgRating: number | null | undefined;
}

const GroupCard = ({ id, name, code, members, timeSpent, avgRating }: GroupCardProps) => {
  // Log problematic data for debugging
  if (timeSpent === undefined || timeSpent === null) {
    console.warn(`Invalid timeSpent for group ${id}:`, timeSpent);
  }
  if (avgRating === undefined || avgRating === null) {
    console.warn(`Invalid avgRating for group ${id}:`, avgRating);
  }

  return (
    <Link href={`/dashboard/groups/${id}`}>
      <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow duration-200">
        <div className="mb-16">
          <h2 className="text-lg font-medium text-gray-800 mb-1">{name}</h2>
          <p className="text-sm text-gray-500">
            {code} • {members} Members
          </p>
        </div>
        <div className="flex">
          <div className="flex-1 border-r border-gray-200 pr-4">
            <p className="text-xs text-gray-500 mb-1">Time Spent</p>
            <p className="text-base font-medium">
              {typeof timeSpent === 'number' ? timeSpent.toLocaleString() : 'N/A'}
            </p>
          </div>
          <div className="flex-1 pl-4">
            <p className="text-xs text-gray-500 mb-1">Avg. Rating</p>
            <p className="text-base font-medium">
              {typeof avgRating === 'number' ? avgRating.toLocaleString() : 'N/A'}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default function GroupsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { groups, loading, error } = useSelector((state: RootState) => state.groups);

  useEffect(() => {
    dispatch(fetchAllGroups() as any);
  }, [dispatch]);

  // Log groups for debugging
  useEffect(() => {
    console.log('Groups data:', groups);
  }, [groups]);

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

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Groups</h1>
        <div className="flex gap-4 mb-6">
          <Link href="#" className="text-sm text-gray-500 hover:text-gray-800">
            All
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            id={group.id}
            name={group.name}
            code={group.code}
            members={group.members}
            timeSpent={group.timeSpent}
            avgRating={group.avgRating}
          />
        ))}
      </div>
    </div>
  );
}