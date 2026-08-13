import React from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Checking campus account...' }) => {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="retro-card p-6 max-w-sm w-full bg-[#F7F3EF] space-y-4">
        <div className="w-10 h-10 mx-auto bg-[#1A1A1A] text-[#F7F3EF] font-mono font-bold flex items-center justify-center border-2 border-[#1A1A1A] shadow-[3px_3px_0_#C9B59C] animate-pulse">
          SM
        </div>
        <p className="font-mono text-sm font-bold text-[#1A1A1A] tracking-wide">
          {message}
        </p>
        <div className="w-full bg-[#D9CFC7] h-2 border border-[#1A1A1A] overflow-hidden">
          <div className="bg-[#1A1A1A] h-full w-2/3 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const ListingCardSkeleton: React.FC = () => {
  return (
    <div className="retro-card animate-pulse flex flex-col justify-between h-full bg-[#F7F3EF]">
      <div>
        <div className="aspect-[4/3] bg-[#D9CFC7] border-b-2 border-[#1A1A1A]" />
        <div className="p-4 space-y-3">
          <div className="h-5 bg-[#D9CFC7] border border-[#1A1A1A] w-3/4" />
          <div className="h-3 bg-[#D9CFC7] w-full" />
          <div className="h-3 bg-[#D9CFC7] w-2/3" />
          <div className="pt-2 flex justify-between">
            <div className="h-6 bg-[#D9CFC7] w-1/3" />
            <div className="h-4 bg-[#D9CFC7] w-1/4" />
          </div>
        </div>
      </div>
      <div className="p-4 pt-1 border-t border-[#D9CFC7] flex justify-between">
        <div className="h-4 bg-[#D9CFC7] w-1/2" />
        <div className="h-6 bg-[#D9CFC7] w-1/4" />
      </div>
    </div>
  );
};
