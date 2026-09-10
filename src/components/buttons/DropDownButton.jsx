'use client'

import './dropdown.css';
import { CircleArrowDown, CircleArrowUp } from 'lucide-react';
import { useState } from 'react';
import { LightboxModal } from '../lightbox/LightboxModal.jsx';

export const DropdownButton = ({ children, options }) => {
  const [open, setOpen] = useState(false);
  const isArray = Array.isArray(options);
  const isString = typeof options === 'string';
  const isLink =
    isString && (options.startsWith('http') || options.startsWith('www'));
  const isInstagram = isString && options.startsWith('@');

  const handleToggle = () => {
    setOpen(!open);
  };

  const renderContent = () => {
    if (isArray) {
      return (
        <ul>
          {options.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    } else if (isInstagram) {
      return (
        <p>
          <a
            href={`https://instagram.com/${options.slice(1)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {options}
          </a>
        </p>
      );
    } else if (isLink) {
      return (
        <p>
          <a
            href={
              options.startsWith('http') ? options : `https://${options}`
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            {options}
          </a>
        </p>
      );
    } else {
      return <p>{options}</p>;
    }
  };

  return (
    <>
      <div className="dropdown-wrapper">
        <button className="dropdown-button" onClick={handleToggle}>
          {children}
          {open ? <CircleArrowUp /> : <CircleArrowDown />}
        </button>
      </div>

      <LightboxModal
        isOpen={open}
        onClose={handleToggle}
        title={children}
      >
        {renderContent()}
      </LightboxModal>
    </>
  );
};
