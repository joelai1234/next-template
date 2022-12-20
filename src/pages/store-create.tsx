import { useState } from 'react';

import GetStartStep from '@/views/store-create/containers/GetStartStep';
import LocationStep from '@/views/store-create/containers/LocationStep';
import StoreNameStep from '@/views/store-create/containers/StoreNameStep';
import StoreTemplateStep from '@/views/store-create/containers/StoreTemplateStep';
import { StepIndex } from '@/views/store-create/enum/step';

export default function StoreCreate() {
  const [stepIndex, setStepIndex] = useState(StepIndex.GetStart);

  let stepView;
  switch (stepIndex) {
    case StepIndex.GetStart:
      stepView = <GetStartStep setStepIndex={setStepIndex} />;
      break;
    case StepIndex.StoreTemplate:
      stepView = <StoreTemplateStep setStepIndex={setStepIndex} />;
      break;
    case StepIndex.StoreName:
      stepView = <StoreNameStep setStepIndex={setStepIndex} />;
      break;
    case StepIndex.Location:
      stepView = <LocationStep setStepIndex={setStepIndex} />;
      break;
    default:
      throw Error('Error: StepIndex type');
  }

  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{
        backgroundImage: 'linear-gradient(to right, #9796f0, #fbc7d4);',
      }}
    >
      {stepView}
    </div>
  );
}
