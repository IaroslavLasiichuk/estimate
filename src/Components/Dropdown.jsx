import React, { useState } from 'react';
import icon from '../assets/il_logo.png';
import templates from '../data/templates';

const Dropdown = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [copiedText, setCopiedText] = useState('');

  const calculateTotals = () => {
    if (!selectedTemplate || !selectedTemplate.services) return;

    const { labor, serviceFee, travelExpenses, otherCharges, parts } = selectedTemplate.services;
    const subtotal =
      (parseFloat(labor) || 0) +
      (parseFloat(serviceFee) || 0) +
      (parseFloat(travelExpenses) || 0) +
      (parseFloat(parts) || 0) +
      (parseFloat(otherCharges) || 0);

    const tax = subtotal * 0.081;
    const total = subtotal + tax;

    setSelectedTemplate((prev) => ({
      ...prev,
      subtotal,
      tax,
      total,
    }));
  };

  const copyToClipboard = () => {
    if (!selectedTemplate) return;
  
    let textToCopy = `Service: ${selectedTemplate.service}\n\n`;
  
    if (selectedTemplate.service === 'Car Lockout') {
      textToCopy += `
      Make: ${selectedTemplate.make || ""}
      Model: ${selectedTemplate.model || ""}
      Color: ${selectedTemplate.color || ""}
      License Plate: ${selectedTemplate.licensePlate || ""}
      `;
    }
  
    if (selectedTemplate.service === 'House Lockout') {
      textToCopy += `
      Full Name: ${selectedTemplate.fullName || ""}
      Email: ${selectedTemplate.email || ""}
      Street: ${selectedTemplate.street || ""}
      City: ${selectedTemplate.city || ""}
      ZIP: ${selectedTemplate.ZIP || ""}
      `;
    }
  
    const services = selectedTemplate.services || {};
    textToCopy += `
      Description of Services:
      • Labor: $${(services.labor || 0).toFixed(2)}
      • Service Fee: $${(services.serviceFee || 0).toFixed(2)}
      • Travel Expenses: $${(services.travelExpenses || 0).toFixed(2)}
      • Parts: $${(services.parts || 0).toFixed(2)}
      • Other Charges: $${(services.otherCharges || 0).toFixed(2)}
      
      Subtotal: $${(selectedTemplate.subtotal || 0).toFixed(2)}
      Tax (8%): $${(selectedTemplate.tax || 0).toFixed(2)}
      Total Amount (Including Tax): $${(selectedTemplate.total || 0).toFixed(2)}
    `;
  
    navigator.clipboard.writeText(textToCopy.trim());
    setCopiedText('Copied to clipboard!');
  
    setTimeout(() => {
      setCopiedText('');
    }, 2000);
  };
  

  const handleTemplateChange = (e) => {
    const templateId = parseInt(e.target.value);
    const template = templates.find(t => t.id === templateId) || null;
    setSelectedTemplate(template);
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;

    setSelectedTemplate((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        [field]: value === "" ? "" : parseFloat(value),
      },
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-500">Services</h1>
<img className="w-12 mx-auto" src={icon} alt="Logo" />
      <label className="block mb-2 text-gray-700 font-medium">Select Template:</label>
      <select 
        onChange={handleTemplateChange} 
        className="w-full mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option className="text-gray-700" value="">-- Select a Template --</option>
        {templates.map(template => (
          <option key={template.id} value={template.id}>
            {template.service}
          </option>
        ))}
      </select>

      {selectedTemplate && (
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{selectedTemplate.service}</h2>

          {/* Conditionally Render Form for Car Lockout */}
          {selectedTemplate.service === 'Car Lockout' && (
            <div className="mb-4">
              <p className="mb-2">Make: 
                <input 
                  type="text" 
                  value={selectedTemplate.make || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, make: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">Model: 
                <input 
                  type="text" 
                  value={selectedTemplate.model || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, model: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">Color: 
                <input 
                  type="text" 
                  value={selectedTemplate.color || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, color: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">License Plate: 
                <input 
                  type="text" 
                  value={selectedTemplate.licensePlate || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, licensePlate: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
            </div>
          )}

          {/* Conditionally Render Form for House Lockout */}
          {selectedTemplate.service === 'House Lockout' && (
            <div className="mb-4">
              <p className="mb-2">Full Name: 
                <input 
                  type="text" 
                  value={selectedTemplate.fullName || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, fullName: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">Email: 
                <input 
                  type="email" 
                  value={selectedTemplate.email || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, email: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">Street: 
                <input 
                  type="text" 
                  value={selectedTemplate.street || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, street: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">City: 
                <input 
                  type="text" 
                  value={selectedTemplate.city || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, city: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
              <p className="mb-2">ZIP: 
                <input 
                  type="text" 
                  value={selectedTemplate.ZIP || ""} 
                  onChange={(e) => setSelectedTemplate({ ...selectedTemplate, ZIP: e.target.value })} 
                  className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
                />
              </p>
            </div>
          )}

          <h3 className="text-lg font-semibold text-gray-700 mb-2">Description of Services</h3>
          <p className="mb-2">Labor: 
            <input 
              type="number" 
              value={selectedTemplate.services.labor || ""} 
              onChange={(e) => handleInputChange(e, 'labor')} 
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </p>
          <p className="mb-2">Service Fee: 
            <input 
              type="number" 
              value={selectedTemplate.services.serviceFee || ""} 
              onChange={(e) => handleInputChange(e, 'serviceFee')} 
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </p>
          <p className="mb-2">Travel Expenses: 
            <input 
              type="number" 
              value={selectedTemplate.services.travelExpenses || ""} 
              onChange={(e) => handleInputChange(e, 'travelExpenses')} 
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </p>
          <p className="mb-2">Other Charges: 
            <input 
              type="number" 
              value={selectedTemplate.services.otherCharges || ""} 
              onChange={(e) => handleInputChange(e, 'otherCharges')} 
              className="w-full p-2 mt-1 border border-gray-300 rounded-lg"
            />
          </p>

          <h3 className="text-lg font-semibold text-gray-700 mt-4">Totals</h3>
          <p className="mt-2">Subtotal: ${selectedTemplate.subtotal?.toFixed(2) || "0.00"}</p>
          <p className="mt-2">Tax (8%): ${selectedTemplate.tax?.toFixed(2) || "0.00"}</p>
          <p className="mt-2">Total Amount (Including Tax): ${selectedTemplate.total?.toFixed(2) || "0.00"}</p>

          <div className="mt-4 flex space-x-2">
            <button 
              onClick={calculateTotals} 
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Recalculate Total
            </button>
            <button 
              onClick={copyToClipboard} 
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Copy to Clipboard
            </button>
          </div>
          {copiedText && <p className="mt-2 text-green-600">{copiedText}</p>}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
