// src/pages/PublicPage.tsx
import React, { useState } from 'react';

interface PublicPageProps {
  onLogin: () => void;
}

interface FormData {
  email: string;
  organizationReferral: string;
  businessName: string;
}

interface FormErrors {
  email?: string;
  organizationReferral?: string;
  businessName?: string;
}

const PublicPage: React.FC<PublicPageProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    organizationReferral: '',
    businessName: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email';
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Required';
    }
    if (!formData.organizationReferral.trim()) {
      newErrors.organizationReferral = 'Required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
      setTimeout(() => onLogin(), 800);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (field: keyof FormData): React.CSSProperties => {
    const hasError = !!errors[field];
    const isFocused = focusedField === field;
    return {
      width: '100%',
      height: '42px',
      padding: '0 12px',
      fontSize: '16px',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      border: hasError ? '2px solid #c53030' : isFocused ? '2px solid #8b7355' : '1px solid #ccc',
      borderRadius: '4px',
      outline: 'none',
      backgroundColor: '#fff',
      color: '#1a1a1a',
      boxSizing: 'border-box' as const,
    };
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#fff',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <header style={{ padding: '16px 20px', flexShrink: 0 }}>
        <span style={{ fontSize: '11px', letterSpacing: '2px', color: '#1a1a1a', fontWeight: 400 }}>
          RESONANCE SYNC
        </span>
      </header>

      {/* Main */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0 40px',
        gap: '60px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
      }}>
        {/* Content */}
        <div className="content-section" style={{ flex: 1 }}>
          <h1 style={{
            fontFamily: 'Georgia, serif',
            fontSize: '38px',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#1a1a1a',
            lineHeight: 1.15,
            marginBottom: '12px',
          }}>
            Institutional Solutions for Capital Formation
          </h1>
          <p style={{
            fontFamily: 'Georgia, serif',
            fontSize: '18px',
            color: '#1a1a1a',
            marginBottom: '24px',
          }}>
            Capital Readiness for Global Markets.
          </p>
          <div className="desc-section" style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#444',
            maxWidth: '500px',
          }}>
            <p style={{ marginBottom: '12px' }}>
              We provide elite, institutional-grade solutions to drive your business forward,
              from strategic asset valuation to comprehensive compliance frameworks.
            </p>
            <p>
              Whether you're looking to optimize your capital structure, prepare for
              institutional investors, or ensure cross-border deal readiness, our solutions
              align with the highest industry standards.
            </p>
          </div>
          <div className="promise-section" style={{ marginTop: '28px' }}>
            <div style={{ fontSize: '10px', letterSpacing: '2px', color: '#888', marginBottom: '12px' }}>
              OUR PROMISE
            </div>
            <div className="promise-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '6px 30px',
              fontSize: '12px',
              color: '#333',
            }}>
              <span>Institutional-grade asset valuation</span>
              <span>Investor-ready financial structuring</span>
              <span>Full compliance and deal readiness</span>
              <span>Secure, encrypted data environments</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="form-section" style={{ width: '340px', flexShrink: 0 }}>
          <div style={{
            backgroundColor: '#f9f9f8',
            borderRadius: '8px',
            padding: '24px',
            border: '1px solid #e8e8e6',
          }}>
            <h2 style={{
              fontFamily: 'Georgia, serif',
              fontSize: '22px',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a1a',
              marginBottom: '6px',
            }}>
              Client Access
            </h2>
            <p style={{ fontSize: '13px', color: '#666', marginBottom: '18px' }}>
              Enter your details to access our services.
            </p>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#333', marginBottom: '6px' }}>
                  Email <span style={{ color: '#c53030' }}>*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your@email.com"
                  style={getInputStyle('email')}
                  autoComplete="email"
                  disabled={isSubmitting}
                />
                {errors.email && <div style={{ color: '#c53030', fontSize: '12px', marginTop: '4px' }}>{errors.email}</div>}
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#333', marginBottom: '6px' }}>
                  Business Name <span style={{ color: '#c53030' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  onFocus={() => setFocusedField('businessName')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Company name"
                  style={getInputStyle('businessName')}
                  autoComplete="organization"
                  disabled={isSubmitting}
                />
                {errors.businessName && <div style={{ color: '#c53030', fontSize: '12px', marginTop: '4px' }}>{errors.businessName}</div>}
              </div>
              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#333', marginBottom: '6px' }}>
                  Referral Code <span style={{ color: '#c53030' }}>*</span>
                </label>
                <input
                  type="text"
                  value={formData.organizationReferral}
                  onChange={(e) => handleInputChange('organizationReferral', e.target.value)}
                  onFocus={() => setFocusedField('organizationReferral')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter code"
                  style={getInputStyle('organizationReferral')}
                  disabled={isSubmitting}
                />
                {errors.organizationReferral && <div style={{ color: '#c53030', fontSize: '12px', marginTop: '4px' }}>{errors.organizationReferral}</div>}
                <p style={{ fontSize: '11px', color: '#888', marginTop: '6px' }}>
                  Valid referral code required for access.
                </p>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '44px',
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  color: '#fff',
                  backgroundColor: submitSuccess ? '#2d6a4f' : '#8b7355',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                {isSubmitting && !submitSuccess ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><circle cx="12" cy="12" r="10" strokeOpacity="0.3"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>VERIFYING...</>
                ) : submitSuccess ? (
                  <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>ACCESS GRANTED</>
                ) : 'SUBMIT'}
              </button>
              <p style={{ marginTop: '12px', fontSize: '11px', color: '#888', textAlign: 'center' }}>
                By submitting, you agree to our <a href="#" style={{ color: '#8b7355' }}>Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '10px',
        color: '#999',
        borderTop: '1px solid #eee',
        flexShrink: 0,
      }}>
        <span>Resonance Sync Ltd | A Delaware Corporation</span>
        <span>We do not provide investment advice, brokerage services, or escrow of funds.</span>
      </footer>

      <style>{`
        *{margin:0;padding:0;box-sizing:border-box}
        html,body{overflow:hidden;height:100%;background:#fff}
        input::placeholder{color:#aaa}
        @keyframes spin{to{transform:rotate(360deg)}}
        
        @media(max-width:900px){
          main{
            flex-direction:column!important;
            padding:0 20px!important;
            gap:0!important;
            justify-content:center!important;
          }
          .content-section{
            text-align:center;
            margin-bottom:16px;
          }
          .content-section h1{
            font-size:22px!important;
            margin-bottom:6px!important;
          }
          .content-section>p{
            font-size:14px!important;
            margin-bottom:12px!important;
          }
          .desc-section{
            font-size:12px!important;
            line-height:1.5!important;
          }
          .desc-section p:last-child{display:none}
          .promise-section{margin-top:12px!important}
          .promise-section>div:first-child{font-size:8px!important;margin-bottom:6px!important}
          .promise-grid{
            grid-template-columns:1fr!important;
            gap:2px!important;
            font-size:11px!important;
          }
          .form-section{
            width:100%!important;
            max-width:100%!important;
          }
          .form-section>div{
            padding:14px 16px!important;
          }
          .form-section h2{font-size:18px!important;margin-bottom:4px!important}
          .form-section h2+p{font-size:11px!important;margin-bottom:12px!important}
          .form-section input{height:40px!important}
          .form-section label{font-size:12px!important;margin-bottom:4px!important}
          .form-section form>div{margin-bottom:10px!important}
          .form-section form>div:last-of-type{margin-bottom:12px!important}
          .form-section button{height:42px!important;font-size:12px!important}
          .form-section form>p:last-child{margin-top:10px!important;font-size:10px!important}
          footer{padding:10px 20px!important;font-size:9px!important}
          header{padding:12px 20px!important}
        }
        
        @media(max-width:400px){
          main{padding:0 16px!important}
          .content-section{margin-bottom:12px!important}
          .content-section h1{font-size:20px!important}
          .content-section>p{font-size:13px!important;margin-bottom:8px!important}
          .desc-section{font-size:11px!important}
          .promise-grid{font-size:10px!important}
          .form-section>div{padding:12px 14px!important}
          .form-section input{height:38px!important}
          .form-section button{height:40px!important}
          header{padding:10px 16px!important}
          footer{
            flex-direction:column!important;
            text-align:center!important;
            gap:4px!important;
            padding:8px 16px!important;
            font-size:8px!important;
          }
        }
      `}</style>
    </div>
  );
};

export default PublicPage;