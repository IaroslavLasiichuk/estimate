import React, { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import templates from '../data/templates';

export default function Test() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [customFields, setCustomFields] = useState([]);

  const handleTemplateChange = (template) => {
    setSelectedTemplate({ ...template });
  };

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setSelectedTemplate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCustomFieldChange = (index, value) => {
    setCustomFields((prev) => {
      const updatedFields = [...prev];
      updatedFields[index] = value;
      return updatedFields;
    });
  };

  const addCustomField = () => {
    setCustomFields((prev) => [...prev, '']);
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
          {selectedTemplate.service === 'Car Lockout' && (
            <div>
              <p>
                Make:{' '}
                <input
                  type="text"
                  value={selectedTemplate.make || ''}
                  onChange={(e) => handleInputChange(e, 'make')}
                />
              </p>
              <p>
                Model:{' '}
                <input
                  type="text"
                  value={selectedTemplate.model || ''}
                  onChange={(e) => handleInputChange(e, 'model')}
                />
              </p>
            </div>
          )}

          {/* Custom Fields */}
          <h3>Custom Fields</h3>
          <button
            onClick={addCustomField}
            className="mt-2 mb-4 px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Custom Field
          </button>
          {customFields.map((field, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                value={field}
                onChange={(e) => handleCustomFieldChange(index, e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 w-full"
                placeholder={`Field ${index + 1}`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
