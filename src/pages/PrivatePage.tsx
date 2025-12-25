// src/pages/PrivatePage.tsx

interface PrivatePageProps {
  onLogout: () => void;
}

const PrivatePage: React.FC<PrivatePageProps> = ({ onLogout }) => {
  const modules = [
    {
      num: 'I',
      title: 'Strategic Asset Valuation',
      desc: 'Independent valuations for intangible assets, complex portfolios, and physical reserves utilizing globally recognized modeling standards.',
    },
    {
      num: 'II',
      title: 'Financial Structuring',
      desc: 'Transforming operational data into Tier-1 institution-ready financial models with optimized capital frameworks.',
    },
    {
      num: 'III',
      title: 'Deal Readiness & Compliance',
      desc: 'Comprehensive compliance defense layer for cross-border transactions and SPV structure coordination.',
    },
    {
      num: 'IV',
      title: 'Execution Infrastructure',
      desc: 'Secure data rooms with encrypted audit trails and chain-of-custody management.',
    },
  ];

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
      }}
    >
      {/* Header */}
      <header
        style={{
          padding: 'clamp(16px, 3vw, 32px) clamp(24px, 5vw, 60px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            fontSize: 'clamp(11px, 1.2vw, 14px)',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontWeight: 400,
            letterSpacing: '2.5px',
            color: '#1a1a1a',
          }}
        >
          RESONANCE SYNC
        </div>
        <button
          onClick={onLogout}
          style={{
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: 'clamp(9px, 0.9vw, 11px)',
            letterSpacing: '1.5px',
            color: '#888',
            background: 'none',
            border: 'none',
            padding: '8px 0',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#1a1a1a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888';
          }}
        >
          LOGOUT
        </button>
      </header>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '0 clamp(24px, 5vw, 60px)',
          overflow: 'hidden',
          minHeight: 0,
        }}
      >
        {/* Page Title */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(24px, 3.5vw, 40px)',
            flexShrink: 0,
          }}
        >
          <h1
            style={{
              fontFamily: '"Times New Roman", Times, Georgia, serif',
              fontSize: 'clamp(20px, 3vw, 36px)',
              fontWeight: 400,
              fontStyle: 'italic',
              color: '#1a1a1a',
              lineHeight: 1.3,
              marginBottom: '8px',
              letterSpacing: '-0.3px',
            }}
          >
            Capital Formation Solutions
          </h1>
          <p
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(9px, 1vw, 12px)',
              letterSpacing: '2px',
              color: '#888',
            }}
          >
            FOR INSTITUTIONAL INVESTORS
          </p>
        </div>

        {/* Four Modules Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: 'clamp(16px, 2.5vw, 32px)',
            flex: 1,
            minHeight: 0,
            alignContent: 'start',
          }}
        >
          {modules.map((module, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 'clamp(16px, 2vw, 28px) clamp(16px, 2vw, 24px)',
                borderTop: '1px solid #e0e0e0',
                transition: 'border-color 0.3s ease',
                cursor: 'pointer',
                minHeight: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderTopColor = '#1a1a1a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderTopColor = '#e0e0e0';
              }}
            >
              {/* Module Number */}
              <span
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: 'clamp(9px, 0.9vw, 11px)',
                  letterSpacing: '2px',
                  color: '#bbb',
                  marginBottom: 'clamp(10px, 1.2vw, 16px)',
                }}
              >
                {module.num}
              </span>

              {/* Module Title */}
              <h2
                style={{
                  fontFamily: '"Times New Roman", Times, Georgia, serif',
                  fontSize: 'clamp(14px, 1.5vw, 20px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  color: '#1a1a1a',
                  lineHeight: 1.3,
                  marginBottom: 'clamp(12px, 1.5vw, 20px)',
                  letterSpacing: '-0.2px',
                }}
              >
                {module.title}
              </h2>

              {/* Module Description */}
              <p
                style={{
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                  fontSize: 'clamp(10px, 1vw, 12px)',
                  lineHeight: 1.75,
                  color: '#666',
                  letterSpacing: '0.2px',
                }}
              >
                {module.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Compliance Notice */}
        <div
          style={{
            textAlign: 'center',
            padding: 'clamp(16px, 2vw, 24px) 0',
            borderTop: '1px solid #f0f0f0',
            marginTop: 'clamp(16px, 2vw, 24px)',
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
              fontSize: 'clamp(8px, 0.8vw, 10px)',
              lineHeight: 1.8,
              color: '#aaa',
              letterSpacing: '0.3px',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            Important Notice: We do not provide investment advice, brokerage services, or fund escrow.
            Our services are strictly related to deal readiness, asset valuation, and compliance advisory.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: 'clamp(12px, 1.5vw, 20px) clamp(24px, 5vw, 60px)',
          fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          fontSize: 'clamp(8px, 0.8vw, 10px)',
          color: '#bbb',
          letterSpacing: '0.3px',
          textAlign: 'center',
          flexShrink: 0,
        }}
      >
        Resonance Sync Ltd | A Delaware Corporation
      </footer>
    </div>
  );
};

export default PrivatePage;