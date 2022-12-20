import { StepIndex } from '../../enum/step';
import CreateStoreCard from '../CreateStoreCard';

interface Props {
  setStepIndex: (stepIndex: StepIndex) => void;
}

const options = [
  {
    id: '1',
    title: "I'm just starting",
  },
  {
    id: '2',
    title: "I'm already selling online or in person",
  },
];

export default function GetStartStep({ setStepIndex }: Props) {
  const handleSkip = () => {
    setStepIndex(StepIndex.StoreTemplate);
  };
  const handleNext = () => {
    setStepIndex(StepIndex.StoreTemplate);
  };
  return (
    <CreateStoreCard
      className=" w-[46rem]"
      title="Let's get started. Which of these best describes you?"
      description="We'll help you get set up based on your business needs."
    >
      <div className="mt-4">
        <div className="flex items-center gap-4">
          {options.map((option) => (
            <label
              key={option.id}
              htmlFor={option.id}
              className="flex min-h-[4rem] w-1/2 cursor-pointer items-center gap-4 rounded border p-4 text-sm font-medium text-gray-700 hover:border-slate-400"
            >
              <input
                id={option.id}
                name="notification-method"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className=" whitespace-nowrap">{option.title}</p>
            </label>
          ))}
        </div>
      </div>
      <div className="mt-14 mb-2  flex justify-end">
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
