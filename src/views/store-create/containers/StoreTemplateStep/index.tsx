import { StepIndex } from '../../enum/step';
import CreateStoreCard from '../CreateStoreCard';

interface Props {
  setStepIndex: (stepIndex: StepIndex) => void;
}

const options = [
  {
    id: '1',
    title: 'An online store',
    description: 'Create a fully customizable website',
  },
  {
    id: '2',
    title: 'In person',
    description: 'Sell at retail stores, pop-ups, or other physical locations',
  },
  {
    id: '3',
    title: "I'm not sure",
    description: '',
  },
];

export default function StoreTemplateStep({ setStepIndex }: Props) {
  const handleBack = () => {
    setStepIndex(StepIndex.GetStart);
  };
  const handleSkip = () => {
    setStepIndex(StepIndex.StoreName);
  };
  const handleNext = () => {
    setStepIndex(StepIndex.StoreName);
  };
  return (
    <CreateStoreCard
      className="w-[60rem]"
      title="Where would you like to sell?"
      description="Pick as many as you like - you can always change these later. We'll make sure you're set up to sell in these places."
    >
      <div className="mt-4">
        <div className="grid grid-cols-2 items-center gap-4">
          {options.map((option) => (
            <label
              key={option.id}
              htmlFor={option.id}
              className="box-border flex min-h-[6rem] w-full cursor-pointer items-center gap-4 rounded border p-4 text-sm font-medium text-gray-700 hover:border-slate-400 "
            >
              <input
                id={option.id}
                name="notification-method"
                type="checkbox"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <div>
                <p className="font-medium text-gray-700">{option.title}</p>
                <p className="text-gray-500">{option.description}</p>
              </div>
            </label>
          ))}
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
