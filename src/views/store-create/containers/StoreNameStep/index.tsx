import { useState } from 'react';

import { StepIndex } from '../../enum/step';
import { useStoreFormStore } from '../../store/storeForm';
import CreateStoreCard from '../CreateStoreCard';

interface Props {
  setStepIndex: (stepIndex: StepIndex) => void;
}

export default function StoreNameStep({ setStepIndex }: Props) {
  const { storeName, setStoreName } = useStoreFormStore();
  const [inputStoreName, setInputStoreName] = useState(storeName);

  const handleBack = () => {
    setStepIndex(StepIndex.StoreTemplate);
  };
  const handleSkip = () => {
    setStepIndex(StepIndex.Location);
    setStoreName('');
  };
  const handleNext = () => {
    setStepIndex(StepIndex.Location);
    setStoreName(inputStoreName);
  };
  return (
    <CreateStoreCard
      title="What would you like to name your store?"
      description="You can skip this for now if you're still working on it."
    >
      <div className="mt-4">
        <label className="block font-medium text-gray-700">Store name</label>
        <div className="mt-1">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            value={inputStoreName}
            onChange={(e) => {
              setInputStoreName(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="mt-14 mb-2  flex justify-end">
        <button
          type="button"
          className="mr-auto rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={handleBack}
        >
          Back
        </button>
        <button
          type="button"
          className="mr-2 rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200"
          onClick={handleSkip}
        >
          Skip
        </button>
        <button
          type="button"
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300"
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </CreateStoreCard>
  );
}
