import React, { useState } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Success from './Success';

const CaregiverSignup = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        type: "CAREGIVER",
        email: "",
        password: "",
        confirmPassword: "",
        name: "",
        gender: "",
    });

    const handleNext = (data) => {
        setFormData((prev) => ({ ...prev, ...data }));
        setStep((prev) => prev + 1);
    };

    return (
    <div>
        {step === 1 && <Step1 formData={formData} handleNext={handleNext} />}
        {step === 2 && <Step2 formData={formData} handleNext={handleNext} />}
        {step === 3 && <Step3 />}
        {step === 4 && <Success />}
    </div>
    )
}

export default CaregiverSignup
