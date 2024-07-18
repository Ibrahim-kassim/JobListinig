import React, { useState } from 'react';
import { RiCloseLine } from "react-icons/ri";

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
      setInput('');
    }
  };

  const addTag = (tag) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1">Skills:</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <span key={index} className="bg-blue-100 text-blue-800 text-sm font-semibold px-2 py-1 rounded-full flex items-center">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="ml-1 focus:outline-none">
              <RiCloseLine className="h-4 w-4 text-blue-600" />
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        className="border border-gray-300 rounded px-3 py-2 w-full"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder="Type a skill and press Enter"
      />
    </div>
  );
};

export default TagInput;