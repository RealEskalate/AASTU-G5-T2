"use client";
import ContestsList from '@/app/components/contests-list';
import RatingsList from '@/app/components/ratings-list';
import { ChevronDown } from 'lucide-react';

export default function ContestsPage() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contests</h1>
        <p className="text-gray-600">Ratings & contests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="flex gap-4 mb-6">
            <div className="relative w-full">
              <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-gray-500 bg-white">
                <span>Groups</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="relative w-full">
              <button className="w-full flex items-center justify-between border border-gray-300 rounded-md px-4 py-2 text-gray-500 bg-white">
                <span>Countries</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>

          <ContestsList />
        </div>

        <div className="lg:col-span-1">
          <RatingsList />
        </div>
      </div>
    </div>
  );
}