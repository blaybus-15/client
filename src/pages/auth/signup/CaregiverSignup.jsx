import React, { useState } from 'react';
import SocialAuthPage from './SocialAuthPage';

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
        {step === 1 && <SocialAuthPage formData={formData} handleNext={handleNext} />}
    </div>
    )
}

export default CaregiverSignup
