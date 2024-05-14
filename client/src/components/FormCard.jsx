/*import React, { useState } from 'react';

function FormCard({ title, inputs }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {inputs.map((input, index) => (
        <div key={index} className="mb-4">
          <label htmlFor={input.id} className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          <input
            id={input.id}
            type={input.type}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            placeholder={input.placeholder}
          />
        </div>
      ))}
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(0);

  const forms = [
    {
      title: 'Form 1',
      inputs: [
        { id: 'input1', label: 'Input 1', type: 'text', placeholder: 'Enter Input 1' },
        { id: 'input2', label: 'Input 2', type: 'text', placeholder: 'Enter Input 2' },
      ],
    },
    {
      title: 'Form 2',
      inputs: [
        { id: 'input3', label: 'Input 3', type: 'text', placeholder: 'Enter Input 3' },
        { id: 'input4', label: 'Input 4', type: 'text', placeholder: 'Enter Input 4' },
      ],
    },
    {
      title: 'Form 3',
      inputs: [
        { id: 'input5', label: 'Input 5', type: 'text', placeholder: 'Enter Input 5' },
        { id: 'input6', label: 'Input 6', type: 'text', placeholder: 'Enter Input 6' },
      ],
    },
  ];

  const handleNext = () => {
    if (step < forms.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto">
        <FormCard title={forms[step].title} inputs={forms[step].inputs} />
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrev}
            className={`bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ${
              step === 0 ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
              step === forms.length - 1 ? 'pointer-events-none opacity-50' : ''
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default MultiStepForm;*/

import React, { useState } from 'react';

function FormCard({ title, inputs, onNext, onPrev }) {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {inputs.map((input, index) => (
        <div key={index} className="mb-4">
          <label htmlFor={input.id} className="block text-sm font-medium text-gray-700">
            {input.label}
          </label>
          <input
            id={input.id}
            type={input.type}
            className="mt-1 p-2 block w-full shadow-sm border border-gray-300 rounded-md"
            placeholder={input.placeholder}
          />
        </div>
      ))}
      <div className="flex justify-between">
        <button onClick={onPrev} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
          Previous
        </button>
        <button onClick={onNext} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center">
          Next
        </button>
      </div>
    </div>
  );
}

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const forms = [
    {
      title: 'Form 1',
      inputs: [
        { id: 'input1', label: 'Input 1', type: 'text', placeholder: 'Enter Input 1' },
        { id: 'input2', label: 'Input 2', type: 'text', placeholder: 'Enter Input 2' },
      ],
    },
    {
      title: 'Form 2',
      inputs: [
        { id: 'input3', label: 'Input 3', type: 'text', placeholder: 'Enter Input 3' },
        { id: 'input4', label: 'Input 4', type: 'text', placeholder: 'Enter Input 4' },
      ],
    },
    {
      title: 'Form 3',
      inputs: [
        { id: 'input5', label: 'Input 5', type: 'text', placeholder: 'Enter Input 5' },
        { id: 'input6', label: 'Input 6', type: 'text', placeholder: 'Enter Input 6' },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="grid grid-cols-3 gap-4">
        {forms.map((form, index) => (
          <FormCard
            key={index}
            title={form.title}
            inputs={form.inputs}
            onNext={handleNext}
            onPrev={handlePrev}
            style={{ display: index === step - 1 ? 'block' : 'none' }}
          />
        ))}
      </div>
    </div>
  );
}

export default MultiStepForm;
