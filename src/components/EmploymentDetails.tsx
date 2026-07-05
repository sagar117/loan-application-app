import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

interface EmploymentDetailsProps {
  onNext: (data: { employmentType: string; monthlyIncome: number }) => void;
}

const EmploymentDetails: React.FC<EmploymentDetailsProps> = ({ onNext }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    employmentType: '',
    monthlyIncome: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const employmentTypes = [
    { value: 'salaried', label: '💼 Salaried' },
    { value: 'self-employed', label: '🏢 Self-Employed' },
    { value: 'business', label: '📊 Business Owner' },
    { value: 'student', label: '🎓 Student' },
    { value: 'company', label: '🏭 Company Employee' },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.employmentType) {
      newErrors.employmentType = 'Please select employment type';
    }
    if (!formData.monthlyIncome) {
      newErrors.monthlyIncome = 'Monthly income is required';
    } else if (parseInt(formData.monthlyIncome) < 10000) {
      newErrors.monthlyIncome = 'Monthly income should be at least ₹10,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onNext({
        employmentType: formData.employmentType,
        monthlyIncome: parseInt(formData.monthlyIncome),
      });
      navigate('/loan-details');
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h1>💰 Employment & Income</h1>
        <p>Step 3 of 7: Tell us about your income</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="employmentType">Employment Type</label>
          <select
            id="employmentType"
            name="employmentType"
            value={formData.employmentType}
            onChange={handleChange}
          >
            <option value="">Select employment type</option>
            {employmentTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          {errors.employmentType && <div className="error-message">{errors.employmentType}</div>}
        </div>

        <div className="form-group">
          <label htmlFor="monthlyIncome">Monthly Income (₹)</label>
          <input
            id="monthlyIncome"
            type="number"
            name="monthlyIncome"
            placeholder="Enter monthly income"
            value={formData.monthlyIncome}
            onChange={handleChange}
            min="10000"
            step="1000"
          />
          {errors.monthlyIncome && <div className="error-message">{errors.monthlyIncome}</div>}
        </div>

        <div style={{ backgroundColor: '#f0f4ff', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
          <p style={{ color: '#667eea', fontSize: '13px', margin: 0 }}>
            💡 Tip: Higher income may help you get better loan terms from our lenders.
          </p>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
          <button type="submit" className="btn btn-primary">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmploymentDetails;
