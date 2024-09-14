import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import templates from '../data/templates'




export default function Test() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [copiedText, setCopiedText] = useState('');
  
    const handleTemplateChange = (e) => {
      const template = templates.find(t => t.id === parseInt(e.target.value));
      setSelectedTemplate({ ...template });
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
    <div>
    <h1>Services</h1>
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {selectedTemplate ? selectedTemplate.service : 'Select a Template'}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>
      <MenuItems className="absolute z-10 mt-2 w-56 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="py-1">
          {templates.map((template) => (
            <MenuItem key={template.id}>
              {({ active }) => (
                <button
                  onClick={() => handleTemplateChange(template)}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } block px-4 py-2 text-sm`}
                >
                  {template.service}
                </button>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>

    {selectedTemplate && (
      <div>
        <h2>{selectedTemplate.service}</h2>
        {/* Conditionally Render Form based on service */}
        {selectedTemplate.service === 'Car Lockout' && (
          <div>
            <p>Make: <input type="text" value={selectedTemplate.make} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, make: e.target.value })} /></p>
            <p>Model: <input type="text" value={selectedTemplate.model} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, model: e.target.value })} /></p>
            <p>Color: <input type="text" value={selectedTemplate.color} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, color: e.target.value })} /></p>
            <p>License Plate: <input type="text" value={selectedTemplate.licensePlate} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, licensePlate: e.target.value })} /></p>
          </div>
        )}

        {selectedTemplate.service === 'House Lockout' && (
          <div>
            <p>Full Name: <input type="text" value={selectedTemplate.fullName} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, fullName: e.target.value })} /></p>
            <p>Email: <input type="email" value={selectedTemplate.email} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, email: e.target.value })} /></p>
            <p>Street: <input type="text" value={selectedTemplate.street} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, street: e.target.value })} /></p>
            <p>City: <input type="text" value={selectedTemplate.city} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, city: e.target.value })} /></p>
            <p>ZIP: <input type="text" value={selectedTemplate.ZIP} onChange={(e) => setSelectedTemplate({ ...selectedTemplate, ZIP: e.target.value })} /></p>
          </div>
        )}
        
        {/* Similarly for other templates */}
      </div>
    )}
  </div>
  )
}
