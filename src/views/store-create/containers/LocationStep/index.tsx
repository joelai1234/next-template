import type { BodyCreateStorefrontDTO } from '@tokenbricks/sfas-backend-typescript-axios-client';
import { BodyCreateStorefrontDTOTypeEnum } from '@tokenbricks/sfas-backend-typescript-axios-client';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { v1StorefrontsApi } from '@/apis/coreBackend/defHttp';

import { StepIndex } from '../../enum/step';
import { useStoreFormStore } from '../../store/storeForm';
import CountrySelect from '../CountrySelect';
import CreateStoreCard from '../CreateStoreCard';

interface Props {
  setStepIndex: (stepIndex: StepIndex) => void;
}

export default function LocationStep({ setStepIndex }: Props) {
  const { storeName, setStoreId } = useStoreFormStore();

  const mutation = useMutation((body: BodyCreateStorefrontDTO) => {
    return v1StorefrontsApi.createStorefront(body);
  });

  const handleBack = () => {
    setStepIndex(StepIndex.StoreName);
  };
  const handleSkip = () => {};
  const handleNext = () => {
    setStepIndex(StepIndex.BuildingStore);
    const uuid = uuidv4();
    setStoreId(uuid);
    mutation.mutate({
      id: uuid,
      name: storeName ?? uuid,
      type: BodyCreateStorefrontDTOTypeEnum.erc20,
    });
  };

  return (
    <CreateStoreCard
      className="w-[35rem]"
      title="Where will your business be located?"
      description="We'll use your location to set up your default shipping rates, recommended apps, and more."
    >
      <div className="mt-4">
        <label className="block font-medium text-gray-700">
          Country/Region
        </label>
        <div className="mt-1">
          <CountrySelect />
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
          className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 disabled:bg-slate-400"
          onClick={handleNext}
        >
          <div className="flex">
            <span>Create</span>
          </div>
        </button>
      </div>
    </CreateStoreCard>
  );
}
