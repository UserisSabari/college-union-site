import { useParams } from 'react-router-dom';

export const Archive = () => {
  const { year } = useParams<{ year?: string }>();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-navy">
        {year ? `Union Archive: ${year}` : 'College Union Archive'}
      </h1>
      <p className="text-textSecondary max-w-xl font-body">
        {year 
          ? `View historical office bearers, events, and records for the academic year ${year}.`
          : 'Access the permanent repository of past student unions of GEC Palakkad.'}
      </p>
      <div className="mt-8 text-sm text-textSecondary bg-surface border border-border px-4 py-2 rounded-card">
        Coming Soon
      </div>
    </div>
  );
};

export default Archive;
