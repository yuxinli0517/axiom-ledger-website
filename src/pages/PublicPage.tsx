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
      newErrors.email = 'Email address is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData.organizationReferral.trim()) {
      newErrors.organizationReferral = 'Referral code is required';
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
      setTimeout(() => {
        onLogin();
      }, 800);
    } catch (error) {
      console.error('Submission error:', error);
      setIsSubmitting(false);
    }
  };

  const getInputStyle = (field: keyof FormData): React.CSSProperties => {
    const hasError = !!errors[field];
    const isFocused = focusedField === field;
    
    return {
      width: '100%',
      height: '44px',
      padding: '0 12px',
      fontSize: '16px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: 400,
      border: hasError 
        ? '2px solid #c53030' 
        : isFocused 
          ? '2px solid #8b7355' 
          : '1px solid #c9c9c9',
      borderRadius: '6px',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      boxSizing: 'border-box' as const,
      backgroundColor: '#ffffff',
      color: '#1a1a1a',
      boxShadow: isFocused ? '0 0 0 2px rgba(139, 115, 85, 0.1)' : 'none',
    };
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '4px',
    fontSize: '13px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 500,
    color: '#333333',
  };

  const errorStyle: React.CSSProperties = {
    color: '#c53030',
    fontSize: '12px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    marginTop: '2px',
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
      }}
    >
      {/* Header */}
      <header
        className="header"
        style={{
          padding: '12px 16px 8px',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: '10px',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 400,
            letterSpacing: '2px',
            color: '#1a1a1a',
          }}
        >
          RESONANCE SYNC
        </div>
      </header>

      {/* Main Content */}
      <main
        className="main-content"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'row',
          padding: '0 16px',
          gap: '32px',
          maxWidth: '1200px',
          margin: '0 auto',
          width: '100%',
          boxSizing: 'border-box',
          overflow: 'hidden',
          alignItems: 'center',
        }}
      >
        {/* Left: Content */}
        <div
          className="content-section"
          style={{
            flex: '1 1 55%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Main Title */}
          <h1
            className="main-title"
            style={{
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              fontSize: 'clamp(24px, 3vw, 40px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a1a',
              lineHeight: 1.15,
              marginBottom: '8px',
              letterSpacing: '-0.3px',
            }}
          >
            Institutional Solutions for Capital Formation
          </h1>

          {/* Subtitle */}
          <p
            className="subtitle-text"
            style={{
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              fontWeight: 400,
              color: '#1a1a1a',
              marginBottom: '16px',
              letterSpacing: '0.2px',
            }}
          >
            Capital Readiness for Global Markets.
          </p>

          {/* Description */}
          <div
            className="description-section"
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(13px, 1vw, 15px)',
              lineHeight: 1.6,
              color: '#444444',
              maxWidth: '480px',
            }}
          >
            <p style={{ marginBottom: '8px' }}>
              We provide elite, institutional-grade solutions to drive your business forward,
              from strategic asset valuation to comprehensive compliance frameworks.
            </p>
            <p className="description-p2">
              Whether you're looking to optimize your capital structure, prepare for
              institutional investors, or ensure cross-border deal readiness, our solutions
              align with the highest industry standards.
            </p>
          </div>

          {/* Our Promise */}
          <div
            className="promise-section"
            style={{
              marginTop: '20px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              className="promise-label"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '2px',
                color: '#666666',
                marginBottom: '8px',
              }}
            >
              OUR PROMISE
            </span>
            <div
              className="promise-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '4px 20px',
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: 'clamp(11px, 0.9vw, 13px)',
                color: '#333333',
                lineHeight: 1.4,
              }}
            >
              <span>Institutional-grade asset valuation</span>
              <span>Investor-ready financial structuring</span>
              <span>Full compliance and deal readiness</span>
              <span>Secure, encrypted data environments</span>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div
          className="form-section"
          style={{
            flex: '0 0 auto',
            width: 'clamp(280px, 30vw, 360px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            className="form-container"
            style={{
              backgroundColor: '#f8f8f7',
              borderRadius: '10px',
              padding: '20px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
              border: '1px solid #e8e8e6',
            }}
          >
            <h2
              className="form-title"
              style={{
                fontFamily: '"Times New Roman", Times, Georgia, serif',
                fontSize: 'clamp(18px, 2vw, 24px)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#1a1a1a',
                marginBottom: '4px',
              }}
            >
              Client Access
            </h2>
            <p
              className="form-subtitle"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '13px',
                color: '#666666',
                marginBottom: '14px',
              }}
            >
              Enter your details to access our services.
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="email" style={labelStyle}>
                  Email <span style={{ color: '#c53030' }}>*</span>
                </label>
                <input
                  id="email"
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
                {errors.email && <div style={errorStyle}>{errors.email}</div>}
              </div>

              {/* Business Name */}
              <div style={{ marginBottom: '12px' }}>
                <label htmlFor="businessName" style={labelStyle}>
                  Business Name <span style={{ color: '#c53030' }}>*</span>
                </label>
                <input
                  id="businessName"
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
                {errors.businessName && <div style={errorStyle}>{errors.businessName}</div>}
              </div>

              {/* Referral Code */}
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="referral" style={labelStyle}>
                  Referral Code <span style={{ color: '#c53030' }}>*</span>
                </label>
                <input
                  id="referral"
                  type="text"
                  value={formData.organizationReferral}
                  onChange={(e) => handleInputChange('organizationReferral', e.target.value)}
                  onFocus={() => setFocusedField('organizationReferral')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter code"
                  style={getInputStyle('organizationReferral')}
                  autoComplete="off"
                  disabled={isSubmitting}
                />
                {errors.organizationReferral && <div style={errorStyle}>{errors.organizationReferral}</div>}
                <p
                  style={{
                    fontSize: '11px',
                    color: '#666666',
                    marginTop: '4px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  Valid referral code required for access.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '44px',
                  fontSize: '12px',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  color: '#ffffff',
                  backgroundColor: submitSuccess ? '#2d6a4f' : '#8b7355',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isSubmitting && !submitSuccess ? 0.85 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !submitSuccess) {
                    e.currentTarget.style.backgroundColor = '#6d5a44';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && !submitSuccess) {
                    e.currentTarget.style.backgroundColor = '#8b7355';
                  }
                }}
              >
                {isSubmitting && !submitSuccess ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}>
                      <circle cx="12" cy="12" r="10" strokeOpacity="0.3"></circle>
                      <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="1"></path>
                    </svg>
                    VERIFYING...
                  </>
                ) : submitSuccess ? (
                  <>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    ACCESS GRANTED
                  </>
                ) : (
                  'SUBMIT'
                )}
              </button>

              <p
                style={{
                  marginTop: '10px',
                  fontSize: '11px',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  color: '#666666',
                  textAlign: 'center',
                }}
              >
                By submitting, you agree to our{' '}
                <a href="#" style={{ color: '#8b7355', textDecoration: 'underline' }}>Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="footer"
        style={{
          padding: '8px 16px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '4px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '9px',
          color: '#888888',
          flexShrink: 0,
          borderTop: '1px solid #eeeeee',
        }}
      >
        <span>Resonance Sync Ltd | A Delaware Corporation</span>
        <span style={{ maxWidth: '280px', textAlign: 'right', lineHeight: 1.4 }}>
          We do not provide investment advice, brokerage services, or escrow of funds.
        </span>
      </footer>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body, #root {
            overflow: hidden !important;
            height: 100%;
            background-color: #ffffff !important;
            -webkit-font-smoothing: antialiased;
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          input::placeholder {
            color: #999999;
          }
          
          input:disabled {
            background-color: #f5f5f5;
            cursor: not-allowed;
          }

          /* ========== MOBILE - JPM Private Bank Standard ========== */
          @media (max-width: 900px) {
            .main-content {
              flex-direction: column !important;
              padding: 0 24px !important;
              gap: 16px !important;
              justify-content: center !important;
              align-items: center !important;
            }
            
            .content-section {
              flex: 0 0 auto !important;
              text-align: center;
              justify-content: center !important;
              width: 100% !important;
            }
            
            /* 主标题 - 更强的视觉层级 */
            .main-title {
              font-size: 26px !important;
              line-height: 1.2 !important;
              margin-bottom: 8px !important;
              letter-spacing: -0.5px !important;
              color: #0d0d0d !important;
            }
            
            /* 副标题 - 优雅的衬线体 */
            .subtitle-text {
              font-size: 15px !important;
              margin-bottom: 16px !important;
              color: #1a1a1a !important;
              letter-spacing: 0.3px !important;
            }
            
            /* 描述文字 - 舒适的阅读体验 */
            .description-section {
              font-size: 14px !important;
              line-height: 1.65 !important;
              max-width: 100% !important;
              color: #3d3d3d !important;
              letter-spacing: 0.1px !important;
            }
            
            .description-section p {
              margin-bottom: 0 !important;
            }
            
            .description-p2 {
              display: none !important;
            }
            
            /* OUR PROMISE - 更有存在感 */
            .promise-section {
              margin-top: 20px !important;
              padding-top: 16px !important;
              border-top: 1px solid #e5e5e5 !important;
            }
            
            .promise-label {
              font-size: 10px !important;
              font-weight: 600 !important;
              margin-bottom: 12px !important;
              color: #8b7355 !important;
              letter-spacing: 2.5px !important;
            }
            
            .promise-grid {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
              font-size: 13px !important;
              line-height: 1.5 !important;
              color: #2d2d2d !important;
            }
            
            /* 表单区域 - 私行级精致感 */
            .form-section {
              width: 100% !important;
              max-width: 100% !important;
              flex: 0 0 auto !important;
            }
            
            .form-container {
              padding: 20px !important;
              border-radius: 6px !important;
              background: linear-gradient(180deg, #fafafa 0%, #f5f5f4 100%) !important;
              border: 1px solid #e0e0de !important;
              box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0, 0, 0, 0.04) !important;
            }
            
            .form-title {
              font-size: 20px !important;
              margin-bottom: 6px !important;
              color: #0d0d0d !important;
            }
            
            .form-subtitle {
              font-size: 13px !important;
              margin-bottom: 16px !important;
              color: #555555 !important;
              letter-spacing: 0.1px !important;
            }
            
            .form-container input {
              height: 48px !important;
              font-size: 16px !important;
              padding: 0 14px !important;
              border-radius: 4px !important;
              border: 1px solid #c0c0c0 !important;
              background: #ffffff !important;
            }
            
            .form-container input:focus {
              border: 2px solid #8b7355 !important;
              box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1) !important;
            }
            
            .form-container label {
              font-size: 13px !important;
              font-weight: 500 !important;
              margin-bottom: 6px !important;
              color: #2d2d2d !important;
              letter-spacing: 0.2px !important;
            }
            
            .form-container form > div {
              margin-bottom: 14px !important;
            }
            
            .form-container form > div:last-of-type {
              margin-bottom: 18px !important;
            }
            
            .form-container form > div:last-of-type p {
              font-size: 11px !important;
              margin-top: 6px !important;
              color: #777777 !important;
            }
            
            .form-container button {
              height: 48px !important;
              font-size: 13px !important;
              font-weight: 500 !important;
              border-radius: 4px !important;
              letter-spacing: 1.5px !important;
              box-shadow: 0 2px 8px rgba(139, 115, 85, 0.25) !important;
            }
            
            .form-container form > p:last-child {
              margin-top: 14px !important;
              font-size: 11px !important;
              color: #777777 !important;
            }
            
            .header {
              padding: 14px 24px !important;
            }
            
            .header div {
              font-size: 11px !important;
              font-weight: 500 !important;
              letter-spacing: 2.5px !important;
              color: #0d0d0d !important;
            }
            
            .footer {
              padding: 12px 24px !important;
              font-size: 10px !important;
              color: #888888 !important;
              border-top: 1px solid #e8e8e8 !important;
            }
          }

          /* 400x704 精确适配 */
          @media (max-width: 420px) and (max-height: 720px) {
            .header {
              padding: 10px 20px !important;
            }
            
            .main-content {
              padding: 0 20px !important;
              gap: 12px !important;
              justify-content: center !important;
            }
            
            .main-title {
              font-size: 23px !important;
              margin-bottom: 6px !important;
            }
            
            .subtitle-text {
              font-size: 14px !important;
              margin-bottom: 12px !important;
            }
            
            .description-section {
              font-size: 13px !important;
              line-height: 1.55 !important;
            }
            
            .promise-section {
              margin-top: 14px !important;
              padding-top: 12px !important;
            }
            
            .promise-label {
              font-size: 9px !important;
              margin-bottom: 10px !important;
            }
            
            .promise-grid {
              font-size: 12px !important;
              gap: 6px !important;
            }
            
            .form-container {
              padding: 16px !important;
            }
            
            .form-title {
              font-size: 18px !important;
              margin-bottom: 4px !important;
            }
            
            .form-subtitle {
              font-size: 12px !important;
              margin-bottom: 14px !important;
            }
            
            .form-container input {
              height: 46px !important;
            }
            
            .form-container label {
              font-size: 12px !important;
              margin-bottom: 5px !important;
            }
            
            .form-container form > div {
              margin-bottom: 12px !important;
            }
            
            .form-container form > div:last-of-type {
              margin-bottom: 16px !important;
            }
            
            .form-container form > div:last-of-type p {
              font-size: 10px !important;
              margin-top: 5px !important;
            }
            
            .form-container button {
              height: 46px !important;
              font-size: 12px !important;
            }
            
            .form-container form > p:last-child {
              margin-top: 12px !important;
              font-size: 10px !important;
            }
            
            .footer {
              padding: 10px 20px !important;
              font-size: 9px !important;
            }
          }

          /* 极小屏幕 */
          @media (max-width: 380px) {
            .header {
              padding: 8px 16px !important;
            }
            
            .main-content {
              padding: 0 16px !important;
              gap: 10px !important;
              justify-content: center !important;
            }
            
            .main-title {
              font-size: 20px !important;
              margin-bottom: 4px !important;
            }
            
            .subtitle-text {
              font-size: 13px !important;
              margin-bottom: 10px !important;
            }
            
            .description-section {
              font-size: 12px !important;
              line-height: 1.5 !important;
            }
            
            .promise-section {
              margin-top: 10px !important;
              padding-top: 10px !important;
            }
            
            .promise-label {
              font-size: 8px !important;
              margin-bottom: 8px !important;
            }
            
            .promise-grid {
              font-size: 11px !important;
              gap: 4px !important;
            }
            
            .form-container {
              padding: 14px !important;
            }
            
            .form-title {
              font-size: 16px !important;
            }
            
            .form-subtitle {
              font-size: 11px !important;
              margin-bottom: 12px !important;
            }
            
            .form-container input {
              height: 44px !important;
            }
            
            .form-container label {
              font-size: 11px !important;
            }
            
            .form-container form > div {
              margin-bottom: 10px !important;
            }
            
            .form-container form > div:last-of-type {
              margin-bottom: 14px !important;
            }
            
            .form-container button {
              height: 44px !important;
              font-size: 11px !important;
            }
            
            .form-container form > p:last-child {
              margin-top: 10px !important;
              font-size: 9px !important;
            }
            
            .footer {
              flex-direction: column !important;
              text-align: center !important;
              gap: 4px !important;
              padding: 8px 16px !important;
              font-size: 8px !important;
            }
            
            .footer span:last-child {
              max-width: 100% !important;
              text-align: center !important;
            }
          }

          /* 横屏 */
          @media (max-height: 500px) and (orientation: landscape) {
            .main-content {
              flex-direction: row !important;
              gap: 32px !important;
              align-items: center !important;
              justify-content: center !important;
            }
            
            .content-section {
              text-align: left !important;
              justify-content: center !important;
              flex: 1 1 55% !important;
            }
            
            .description-p2 {
              display: block !important;
            }
            
            .promise-section {
              border-top: none !important;
              padding-top: 0 !important;
            }
            
            .promise-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
            
            .form-section {
              width: 340px !important;
              flex: 0 0 auto !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PublicPage;