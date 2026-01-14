import { useState } from 'react';
import { SeatMap } from './components/SeatMap';
import { InputPanel } from './components/InputPanel';
import { mockVendorResponse, config } from './mockData';
import type { VendorResponse } from './types';

function App() {
  const [vendorData, setVendorData] = useState<VendorResponse>(mockVendorResponse);

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
      <InputPanel onGenerate={setVendorData} />
      <div style={{ flex: 1, overflow: 'auto', background: '#1a1a1a' }}>
        <SeatMap vendorData={vendorData} config={config} />
      </div>
    </div>
  );
}

export default App;
