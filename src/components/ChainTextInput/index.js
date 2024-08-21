import React, { useState, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { IoMdTrash } from 'react-icons/io';
import TextInput from '../TextInput';

const ChainTextInput = ({
  label,
  items,
  onTitleChange,
  onLinkChange,
  onRemove,
  onAdd,
}) => {
  return (
    <>
      {label && (
        <label className="text-[#333333] text-sm font-normal">{label}</label>
      )}
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-3">
          <div className="flex space-x-3 grow">
            <TextInput
              placeholder="Masukan Judul"
              onChange={(e) => onTitleChange(index, e.target.value)}
              value={item.title}
            />
            <TextInput
              className="grow"
              placeholder="Masukan Link"
              onChange={(e) => onLinkChange(index, e.target.value)}
              value={item.link}
            />
          </div>
          {items.length > 1 && (
            <IoMdTrash
              className="text-[#333333] cursor-pointer"
              onClick={() => onRemove(index)}
            />
          )}
        </div>
      ))}
      {items.length < 10 && (
        <div className="flex justify-center gap-2">
          <FaPlusCircle
            className="text-[#333333] cursor-pointer animate-bounce"
            onClick={onAdd}
          />
        </div>
      )}
    </>
  );
};

export default ChainTextInput;
