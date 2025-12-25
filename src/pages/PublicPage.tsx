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
      padding: '0 14px',
      fontSize: '16px',
      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
      fontWeight: 400,
      border: 'none',
      borderRadius: '4px',
      outline: 'none',
      transition: 'all 0.2s ease',
      boxSizing: 'border-box' as const,
      backgroundColor: hasError ? '#FFFFFF' : isFocused ? '#FFFFFF' : '#F5F5F4',
      color: '#1a1a1a',
      boxShadow: hasError 
        ? '0 0 0 2px #c53030' 
        : isFocused 
          ? '0 0 0 2px #8b7355, 0 0 0 4px rgba(139, 115, 85, 0.1)' 
          : 'none',
    };
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '5px',
    fontSize: '12px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeight: 500,
    color: '#333333',
    letterSpacing: '0.2px',
  };

  const errorStyle: React.CSSProperties = {
    color: '#c53030',
    fontSize: '11px',
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    marginTop: '3px',
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
        backgroundColor: '#FAFAF9',
      }}
    >
      {/* Google Font */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap" rel="stylesheet" />

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
            fontWeight: 500,
            letterSpacing: '2.5px',
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
              fontFamily: '"Playfair Display", Georgia, serif',
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
              fontFamily: '"Playfair Display", Georgia, serif',
              fontSize: 'clamp(14px, 1.5vw, 18px)',
              fontWeight: 400,
              color: '#333333',
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
              lineHeight: 1.55,
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
              paddingTop: '12px',
              borderTop: '1px solid #e0e0e0',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <span
              className="promise-label"
              style={{
                fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '2.5px',
                color: '#8b7355',
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
                color: '#555555',
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
              background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAF9 100%)',
              borderRadius: '8px',
              padding: '20px',
              boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 4px rgba(0, 0, 0, 0.04)',
              border: '1px solid #e8e8e6',
            }}
          >
            <h2
              className="form-title"
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
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

              {/* Invitation Code */}
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="referral" style={labelStyle}>
                  Invitation Code <span style={{ color: '#c53030' }}>*</span>
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
                    fontSize: '10px',
                    color: '#777777',
                    marginTop: '4px',
                    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  }}
                >
                  Invitation-only access. A valid code is required.
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  height: '46px',
                  fontSize: '12px',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontWeight: 500,
                  letterSpacing: '2px',
                  color: '#ffffff',
                  backgroundColor: submitSuccess ? '#2d6a4f' : '#8b7355',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  opacity: isSubmitting && !submitSuccess ? 0.85 : 1,
                  boxShadow: '0 2px 8px rgba(139, 115, 85, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !submitSuccess) {
                    e.currentTarget.style.backgroundColor = '#7a654a';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 115, 85, 0.4), 0 2px 4px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && !submitSuccess) {
                    e.currentTarget.style.backgroundColor = '#8b7355';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(139, 115, 85, 0.3), 0 1px 2px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'translateY(0)';
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
                  'SECURE ACCESS'
                )}
              </button>

              <p
                style={{
                  marginTop: '10px',
                  fontSize: '10px',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  color: '#777777',
                  textAlign: 'center',
                }}
              >
                By submitting, you agree to our{' '}
                <a href="#" style={{ color: '#8b7355', textDecoration: 'none' }}>Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="footer"
        style={{
          padding: '10px 20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: '9px',
          color: '#888888',
          flexShrink: 0,
          borderTop: '1px solid #e5e5e5',
          backgroundColor: '#FAFAF9',
        }}
      >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#" style={{ color: '#8b7355', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#8b7355', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#8b7355', textDecoration: 'none' }}>Refund Policy</a>
        </div>
        <span style={{ fontSize: '8px', color: '#999', letterSpacing: '0.5px' }}>Encrypted in transit (TLS) · Privacy-first handling</span>
        <span style={{ color: '#888' }}>© 2025 Resonance Sync Ltd. All Rights Reserved.</span>
        <span style={{ color: '#999', lineHeight: 1.4 }}>
          We do not provide investment advice, brokerage services, or escrow of funds.
        </span>
      </footer>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          html, body, #root {
            overflow: hidden !important;
            height: 100%;
            background-color: #FAFAF9 !important;
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
            background-color: #EEEEEE;
            cursor: not-allowed;
          }

          /* ========== DESKTOP ONLY - Private Bank Premium ========== */
          @media (min-width: 901px) {
            .main-content {
              padding: 0 80px !important;
              gap: 72px !important;
              max-width: 1280px !important;
              margin: 0 auto !important;
            }

            .content-section {
              max-width: 600px !important;
            }

            .main-title {
              font-size: 44px !important;
              margin-bottom: 16px !important;
              line-height: 1.12 !important;
            }

            .subtitle-text {
              font-size: 18px !important;
              margin-bottom: 28px !important;
            }

            .description-section {
              font-size: 15px !important;
              line-height: 1.7 !important;
              max-width: 540px !important;
            }

            .description-section p {
              margin-bottom: 16px !important;
            }

            .promise-section {
              margin-top: 36px !important;
              padding-top: 24px !important;
            }

            .promise-label {
              font-size: 10px !important;
              margin-bottom: 14px !important;
              letter-spacing: 3px !important;
            }

            .promise-grid {
              gap: 8px 48px !important;
              font-size: 14px !important;
              line-height: 1.5 !important;
            }

            .form-section {
              width: 380px !important;
            }

            .form-container {
              padding: 28px !important;
            }

            .form-title {
              font-size: 26px !important;
              margin-bottom: 8px !important;
            }

            .form-subtitle {
              font-size: 14px !important;
              margin-bottom: 20px !important;
            }

            .form-container .form-group {
              margin-bottom: 16px !important;
            }

            .form-container .form-group:last-of-type {
              margin-bottom: 20px !important;
            }

            .form-container label {
              font-size: 13px !important;
              margin-bottom: 8px !important;
            }

            .form-container input {
              height: 50px !important;
              font-size: 16px !important;
              padding: 0 16px !important;
            }

            .field-hint {
              font-size: 12px !important;
              margin-top: 6px !important;
            }

            .submit-btn {
              height: 52px !important;
              font-size: 13px !important;
              letter-spacing: 2.5px !important;
            }

            .privacy-text {
              margin-top: 14px !important;
              font-size: 11px !important;
            }

            footer {
              padding: 16px 80px !important;
              gap: 6px !important;
              max-width: 1280px !important;
              margin: 0 auto !important;
            }

            .footer-links {
              gap: 24px !important;
              font-size: 11px !important;
            }

            .footer-trust {
              font-size: 9px !important;
            }

            .footer-company,
            .footer-legal {
              font-size: 10px !important;
            }
          }

          /* ========== MOBILE - JPM Private Bank Standard ========== */
          @media (max-width: 900px) {
            .main-content {
              flex-direction: column !important;
              padding: 0 20px !important;
              gap: 10px !important;
              justify-content: center !important;
              align-items: center !important;
            }
            
            .content-section {
              flex: 0 0 auto !important;
              text-align: left !important;
              justify-content: center !important;
              width: 100% !important;
            }
            
            .main-title {
              font-size: 22px !important;
              line-height: 1.18 !important;
              margin-bottom: 6px !important;
              letter-spacing: -0.3px !important;
              color: #1a1a1a !important;
              text-align: center !important;
            }
            
            .subtitle-text {
              font-size: 14px !important;
              margin-bottom: 10px !important;
              color: #333 !important;
              text-align: center !important;
            }
            
            .description-section {
              font-size: 13px !important;
              line-height: 1.5 !important;
              max-width: 100% !important;
              color: #444 !important;
              text-align: left !important;
            }
            
            .description-section p {
              margin-bottom: 0 !important;
            }
            
            .description-p2 {
              display: none !important;
            }
            
            /* OUR PROMISE - 两列布局 */
            .promise-section {
              margin-top: 12px !important;
              padding-top: 10px !important;
              border-top: 1px solid #e0e0e0 !important;
            }
            
            .promise-label {
              font-size: 8px !important;
              font-weight: 600 !important;
              margin-bottom: 8px !important;
              color: #8b7355 !important;
              letter-spacing: 2px !important;
              text-align: center !important;
            }
            
            .promise-grid {
              grid-template-columns: 1fr 1fr !important;
              gap: 4px 20px !important;
              font-size: 10px !important;
              line-height: 1.35 !important;
              color: #555 !important;
              text-align: left !important;
            }
            
            .promise-grid span:nth-child(odd) {
              text-align: left !important;
            }
            
            .promise-grid span:nth-child(even) {
              text-align: left !important;
            }
            
            /* 表单 */
            .form-section {
              width: 100% !important;
              max-width: 100% !important;
              flex: 0 0 auto !important;
            }
            
            .form-container {
              padding: 14px 16px !important;
              border-radius: 6px !important;
              background: linear-gradient(180deg, #FFFFFF 0%, #FAFAF9 100%) !important;
              border: 1px solid #e5e5e3 !important;
              box-shadow: 0 3px 16px rgba(0, 0, 0, 0.06) !important;
            }
            
            .form-title {
              font-size: 18px !important;
              margin-bottom: 4px !important;
              color: #1a1a1a !important;
              text-align: left !important;
            }
            
            .form-subtitle {
              font-size: 12px !important;
              margin-bottom: 12px !important;
              color: #666 !important;
              text-align: left !important;
            }
            
            .form-container input {
              height: 44px !important;
              font-size: 16px !important;
              padding: 0 12px !important;
              border-radius: 4px !important;
              border: none !important;
              background: #F5F5F4 !important;
            }
            
            .form-container input:focus {
              background: #FFFFFF !important;
              box-shadow: 0 0 0 2px #8b7355, 0 0 0 4px rgba(139, 115, 85, 0.1) !important;
            }
            
            .form-container label {
              font-size: 12px !important;
              font-weight: 500 !important;
              margin-bottom: 5px !important;
              color: #333 !important;
            }
            
            .form-container form > div {
              margin-bottom: 10px !important;
            }
            
            .form-container form > div:last-of-type {
              margin-bottom: 12px !important;
            }
            
            .form-container form > div:last-of-type p {
              font-size: 10px !important;
              margin-top: 4px !important;
              color: #777 !important;
            }
            
            .form-container button {
              height: 44px !important;
              font-size: 11px !important;
              font-weight: 500 !important;
              border-radius: 4px !important;
              letter-spacing: 2px !important;
              box-shadow: 0 2px 8px rgba(139, 115, 85, 0.3) !important;
            }
            
            .form-container form > p:last-child {
              margin-top: 10px !important;
              font-size: 10px !important;
              color: #777 !important;
            }
            
            .header {
              padding: 10px 20px !important;
            }
            
            .header div {
              font-size: 10px !important;
              font-weight: 500 !important;
              letter-spacing: 2px !important;
              color: #1a1a1a !important;
            }
            
            .footer {
              padding: 8px 20px !important;
              font-size: 9px !important;
              gap: 4px !important;
            }
            
            .footer > div:first-child {
              gap: 12px !important;
            }
          }

          /* 400x704 */
          @media (max-width: 420px) and (max-height: 720px) {
            .header {
              padding: 8px 20px !important;
            }
            
            .main-content {
              padding: 0 20px !important;
              gap: 8px !important;
            }
            
            .main-title {
              font-size: 20px !important;
              margin-bottom: 4px !important;
            }
            
            .subtitle-text {
              font-size: 13px !important;
              margin-bottom: 8px !important;
            }
            
            .description-section {
              font-size: 12px !important;
              line-height: 1.5 !important;
            }
            
            .promise-section {
              margin-top: 10px !important;
              padding-top: 8px !important;
            }
            
            .promise-label {
              font-size: 7px !important;
              margin-bottom: 6px !important;
            }
            
            .promise-grid {
              grid-template-columns: 1fr 1fr !important;
              font-size: 9px !important;
              gap: 3px 16px !important;
            }
            
            .form-container {
              padding: 12px 14px !important;
            }
            
            .form-title {
              font-size: 16px !important;
              margin-bottom: 2px !important;
            }
            
            .form-subtitle {
              font-size: 11px !important;
              margin-bottom: 10px !important;
            }
            
            .form-container input {
              height: 42px !important;
            }
            
            .form-container label {
              font-size: 11px !important;
              margin-bottom: 4px !important;
            }
            
            .form-container form > div {
              margin-bottom: 8px !important;
            }
            
            .form-container form > div:last-of-type {
              margin-bottom: 10px !important;
            }
            
            .form-container form > div:last-of-type p {
              font-size: 9px !important;
              margin-top: 3px !important;
            }
            
            .form-container button {
              height: 42px !important;
              font-size: 11px !important;
            }
            
            .form-container form > p:last-child {
              margin-top: 8px !important;
              font-size: 9px !important;
            }
            
            .footer {
              padding: 6px 16px !important;
              font-size: 8px !important;
              gap: 3px !important;
            }
            
            .footer > div:first-child {
              gap: 10px !important;
            }
          }

          /* 极小屏幕 */
          @media (max-width: 380px) {
            .header {
              padding: 6px 14px !important;
            }
            
            .main-content {
              padding: 0 14px !important;
              gap: 6px !important;
            }
            
            .main-title {
              font-size: 18px !important;
            }
            
            .subtitle-text {
              font-size: 12px !important;
              margin-bottom: 6px !important;
            }
            
            .description-section {
              font-size: 11px !important;
            }
            
            .promise-section {
              margin-top: 8px !important;
              padding-top: 6px !important;
            }
            
            .promise-grid {
              grid-template-columns: 1fr 1fr !important;
              font-size: 8px !important;
              gap: 2px 12px !important;
            }
            
            .form-container {
              padding: 10px 12px !important;
            }
            
            .form-title {
              font-size: 15px !important;
            }
            
            .form-subtitle {
              font-size: 10px !important;
              margin-bottom: 8px !important;
            }
            
            .form-container input {
              height: 40px !important;
            }
            
            .form-container label {
              font-size: 10px !important;
            }
            
            .form-container form > div {
              margin-bottom: 6px !important;
            }
            
            .form-container form > div:last-of-type {
              margin-bottom: 8px !important;
            }
            
            .form-container button {
              height: 40px !important;
              font-size: 10px !important;
            }
            
            .form-container form > p:last-child {
              margin-top: 6px !important;
              font-size: 8px !important;
            }
            
            .footer {
              gap: 3px !important;
              padding: 5px 14px !important;
              font-size: 7px !important;
            }
            
            .footer > div:first-child {
              gap: 8px !important;
            }
          }

          /* 横屏 */
          @media (max-height: 500px) and (orientation: landscape) {
            .main-content {
              flex-direction: row !important;
              gap: 24px !important;
              align-items: center !important;
            }
            
            .content-section {
              text-align: left !important;
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
              width: 320px !important;
              flex: 0 0 auto !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PublicPage;