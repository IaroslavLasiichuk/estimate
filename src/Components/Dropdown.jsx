import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const templates = [
  {
    id: 1,
    service: 'Car Lockout',
    make: '',
    model: '',
    color: '',
    licensePlate: '',
    services: {
      emergencyLockout: 129.00,
      serviceFee: 59.00,
      travelExpenses: 7.60,
      otherCharges: 0.00,
    },
    subtotal: 195.60,
    tax: 15.60,
    total: 211.20,
  },
  {
    id: 2,
    service: 'House Lockout',
    fullName: '',
    email: '',
    street: '',
    city: '',
    ZIP: '',
    services: {
      emergencyLockout: 129.00,
      serviceFee: 59.00,
      travelExpenses: 7.60,
      otherCharges: 0.00,
    },
    subtotal: 195.60,
    tax: 15.60,
    total: 211.20,
  },
  {
    id: 3,
    service: 'Rekey',
    fullName: '',
    email: '',
    street: '',
    city: '',
    ZIP: '',
    services: {
      rekey: 95.00,
      serviceFee: 59.00,
      travelExpenses: 7.60,
      otherCharges: 0.00,
    },
    subtotal: 154.00,
    tax: 15.60,
    total: 211.20,
  },
];

const Dropdown = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copiedText, setCopiedText] = useState('');

  const handleTemplateChange = (e) => {
    const template = templates.find(t => t.id === parseInt(e.target.value));
    setSelectedTemplate({ ...template });
  };

  const handleInputChange = (e, field) => {
    const value = parseFloat(e.target.value);
    setSelectedTemplate((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [field]: isNaN(value) ? 0 : value,
      },
    }));
  };

  const calculateTotals = () => {
    const { emergencyLockout, serviceFee, travelExpenses, otherCharges } = selectedTemplate.services;
    const subtotal = emergencyLockout + serviceFee + travelExpenses + otherCharges;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    setSelectedTemplate((prev) => ({
      ...prev,
      subtotal,
      tax,
      total,
    }));
  };

  const copyToClipboard = () => {
    let textToCopy = `Service: ${selectedTemplate.service}\n`;

    // Conditional text for Car Lockout
    if (selectedTemplate.service === 'Car Lockout') {
      textToCopy += `
      Make: ${selectedTemplate.make}
      Model: ${selectedTemplate.model}
      Color: ${selectedTemplate.color}
      License Plate: ${selectedTemplate.licensePlate}
      `;
    }

    // Conditional text for House Lockout
    if (selectedTemplate.service === 'House Lockout') {
      textToCopy += `
      Full Nme: ${selectedTemplate.fullName}
      Email: ${selectedTemplate.email}
      Street: ${selectedTemplate.street}
      City: ${selectedTemplate.city}
      ZIP: ${selectedTemplate.ZIP}
      `;
    }

    textToCopy += `
      Description of Services:
      • Emergency Lockout: $${selectedTemplate.services.emergencyLockout.toFixed(2)}
      • Service Fee: $${selectedTemplate.services.serviceFee.toFixed(2)}
      • Travel Expenses: $${selectedTemplate.services.travelExpenses.toFixed(2)}
      • Other Charges: $${selectedTemplate.services.otherCharges.toFixed(2)}
      
      Subtotal: $${selectedTemplate.subtotal.toFixed(2)}
      Tax (8%): $${selectedTemplate.tax.toFixed(2)}
      Total Amount (Including Tax): $${selectedTemplate.total.toFixed(2)}
    `;
    navigator.clipboard.writeText(textToCopy);
    setCopiedText('Copied to clipboard!');
  };

  return (
    <div>
      <h1>Services</h1>
      
      <label>Select Template: </label>
      <select  onChange={handleTemplateChange}>
        <option value="">-- Select a Template --</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>
            {template.service}
            
          </option>
          
        ))}
        
      </select>

      {selectedTemplate && (
        <div>
          <h2>{selectedTemplate.service}</h2>

          {/* Conditionally Render Form for Car Lockout */}
          {selectedTemplate.service === 'Car Lockout' && (
            <div>
              <p>Make: <input type="text" value={selectedTemplate.make} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, make: e.target.value })} /></p>
              <p>Model: <input type="text" value={selectedTemplate.model} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, model: e.target.value })} /></p>
              <p>Color: <input type="text" value={selectedTemplate.color} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, color: e.target.value })} /></p>
              <p>License Plate: <input type="text" value={selectedTemplate.licensePlate} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, licensePlate: e.target.value })} /></p>
            </div>
          )}

          {/* Conditionally Render Form for House Lockout */}
          {selectedTemplate.service === 'House Lockout' && (
            <div>
              <p>Full Name: <input type="text" value={selectedTemplate.fullName} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, fullName: e.target.value })} /></p>
              <p>Email: <input type="email" value={selectedTemplate.email} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, email: e.target.value })} /></p>
              <p>Street: <input type="text" value={selectedTemplate.street} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, street: e.target.value })} /></p>
              <p>City: <input type="text" value={selectedTemplate.city} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, city: e.target.value })} /></p>
              <p>ZIP: <input type="text" value={selectedTemplate.ZIP} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, ZIP: e.target.value })} /></p>
            </div>
          )}
           {selectedTemplate.service === 'Rekey' && (
            <div>
              <p>Full Name: <input type="text" value={selectedTemplate.fullName} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, fullName: e.target.value })} /></p>
              <p>Email: <input type="email" value={selectedTemplate.email} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, email: e.target.value })} /></p>
              <p>Street: <input type="text" value={selectedTemplate.street} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, street: e.target.value })} /></p>
              <p>City: <input type="text" value={selectedTemplate.city} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, city: e.target.value })} /></p>
              <p>ZIP: <input type="text" value={selectedTemplate.ZIP} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, ZIP: e.target.value })} /></p>
            </div>
          )}

          <h3>Description of Services</h3>
          <p>Labor: $<input type="number" value={selectedTemplate.services.emergencyLockout} onChange={(e) => handleInputChange(e, 'emergencyLockout')} /></p>
          <p>Service Fee: $<input type="number" value={selectedTemplate.services.serviceFee} onChange={(e) => handleInputChange(e, 'serviceFee')} /></p>
          <p>Travel Expenses: $<input type="number" value={selectedTemplate.services.travelExpenses} onChange={(e) => handleInputChange(e, 'travelExpenses')} /></p>
          <p>Other Charges: $<input type="number" value={selectedTemplate.services.otherCharges} onChange={(e) => handleInputChange(e, 'otherCharges')} /></p>

          <h3>Totals</h3>
          <p>Subtotal: ${selectedTemplate.subtotal.toFixed(2)}</p>
          <p>Tax (8%): ${selectedTemplate.tax.toFixed(2)}</p>
          <p>Total Amount (Including Tax): ${selectedTemplate.total.toFixed(2)}</p>
          
          <button onClick={calculateTotals}>Recalculate Total</button>
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
          {copiedText && <p>{copiedText}</p>}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
