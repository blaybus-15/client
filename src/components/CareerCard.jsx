import React from 'react';
import { LuPencil } from 'react-icons/lu';
import { IoClose } from 'react-icons/io5';

const CareerCard = ({ career, onEdit, onDelete }) => {
  const calculateDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();

    const years = end.getFullYear() - start.getFullYear();
    const months = end.getMonth() - start.getMonth();

    let totalMonths = years * 12 + months;
    if (end.getDate() < start.getDate()) {
      totalMonths--;
    }

    const finalYears = Math.floor(totalMonths / 12);
    const finalMonths = totalMonths % 12;

    let duration = '';
    if (finalYears > 0) {
      duration += `${finalYears}년 `;
    }
    if (finalMonths > 0) {
      duration += `${finalMonths}개월`;
    }

    return `(${duration})`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className="w-full p-4 mb-4 bg-white rounded-lg">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="body-semi-bold-18 text-dark">
              {career.workplace}
            </div>
            {career.isCurrentlyEmployed && (
              <span className="px-4 py-1.5 text-sm font-semibold text-sky-400 bg-sky-100 border border-sky-400 rounded">
                재직중
              </span>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-8">
              <span className="font-semibold text-gray-1">근무 기간</span>
              <div className="flex flex-col">
                <span className="text-gray-1">
                  {formatDate(career.startDate)} ~{' '}
                  {career.isCurrentlyEmployed
                    ? '재직중'
                    : formatDate(career.endDate)}
                </span>
                <span className="text-[#FF5050] body-regular-16">
                  {calculateDuration(career.startDate, career.endDate)}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-8">
              <span className="font-semibold text-gray-1">담당 업무</span>
              <span className="text-gray-1">{career.duties}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-2 ml-4">
          <button
            onClick={() => onEdit(career)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <LuPencil size={20} />
          </button>
          <button
            onClick={() => onDelete(career)}
            className="p-1 text-gray-400 hover:text-gray-600"
          >
            <IoClose size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerCard;
