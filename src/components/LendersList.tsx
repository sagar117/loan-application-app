import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loanApi } from '../services/api';
import { Lender } from '../types';
import '../App.css';

const LendersList: React.FC = () => {
  const navigate = useNavigate();
  const [lenders, setLenders] = useState<Lender[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLenders = async () => {
      try {
        const data = await loanApi.getLenders();
        setLenders(data);
      } catch (err) {
        setError('Failed to load lenders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchLenders();
  }, []);

  if (loading) {
    return (
      <div className="form-container" style={{ textAlign: 'center' }}>
        <p>Loading lenders...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div className="form-header" style={{ color: 'white', marginBottom: '40px' }}>
          <h1>🏦 Available Lenders</h1>
          <p>Step 6 of 7: Choose your preferred lender</p>
        </div>

        {error && (
          <div style={{
            backgroundColor: '#f8d7da',
            color: '#721c24',
            padding: '15px',
            borderRadius: '6px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {lenders.length === 0 ? (
          <div className="form-container" style={{ textAlign: 'center' }}>
            <p>No lenders available at the moment. Please try again later.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {lenders.map(lender => (
              <div
                key={lender.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '20px',
                  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-5px)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                }}
              >
                <div style={{ marginBottom: '15px' }}>
                  {lender.logo && (
                    <img
                      src={lender.logo}
                      alt={lender.name}
                      style={{ width: '60px', height: '60px', borderRadius: '8px' }}
                    />
                  )}
                  <h3 style={{ color: '#333', margin: '10px 0 0 0', fontSize: '18px' }}>{lender.name}</h3>
                </div>

                <div style={{ flex: 1, marginBottom: '20px' }}>
                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#999', fontSize: '13px' }}>Interest Rate</span>
                    <p style={{ color: '#667eea', fontSize: '18px', fontWeight: '600', margin: '5px 0 0 0' }}>
                      {lender.interestRate}% p.a.
                    </p>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <span style={{ color: '#999', fontSize: '13px' }}>Max Loan Amount</span>
                    <p style={{ color: '#333', fontSize: '16px', fontWeight: '600', margin: '5px 0 0 0' }}>
                      ₹{(lender.maxLoanAmount / 100000).toFixed(1)}L
                    </p>
                  </div>

                  <div>
                    <span style={{ color: '#999', fontSize: '13px' }}>Processing Fee</span>
                    <p style={{ color: '#333', fontSize: '16px', fontWeight: '600', margin: '5px 0 0 0' }}>
                      {lender.processingFee}%
                    </p>
                  </div>
                </div>

                <button
                  className="btn btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => navigate(`/lender/${lender.id}`)}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <button
            className="btn btn-secondary"
            onClick={() => navigate(-1)}
            style={{ padding: '12px 30px', color: 'white', borderColor: 'white' }}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default LendersList;
