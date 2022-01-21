import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';
import { ActionMeta, OnChangeValue } from 'react-select';
import { useState } from 'react';
export const ReactSelect = () => {
  const createOption = (label) => ({
    label,
    value: label.toLowerCase().replace(/\W/g, ''),
  });
  const defaultOptions = [
    createOption('One'),
    createOption('Two'),
    createOption('Create a Project'),
  ];
  const [dropdown, setDropdown] = useState({
    isLoading: false,
    options: defaultOptions,
    value: undefined,
  });
  const handleChange = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log(newValue);
    if (newValue === 'createaproject') {
      console.log('sa');
    }
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setDropdown((prev) => ({ ...prev, value: newValue }));
  };
  const handleCreate = (inputValue) => {
    setDropdown((prev) => ({ ...prev, isLoading: true }));
    console.group('Option created');
    console.log('Wait a moment...');
    const newOption = createOption(inputValue);
    console.log(newOption);
    console.groupEnd();
    setDropdown((prev) => ({
      ...prev,
      isLoading: false,
      options: [...prev.options, newOption],
      value: newOption,
    }));
  };

  const customStyles = {
    container: (base, state) => ({
      ...base,
      width: '100%',
      textAlign: 'start',
    }),
    control: (base, state) => ({
      ...base,
      backgroundColor: '#002b46;',
      // match with the menu
      borderRadius: '5px',
      // Overwrittes the different states of border
      borderColor: null,
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
    }),
    menu: (base) => ({
      ...base,
      // override border radius to match the box
      borderRadius: 0,
      // kill the gap
      marginTop: 0,
    }),
    option: (base) => ({
      ...base,
      color: 'white',
      backgroundColor: '#1c5274',
      '&:hover': {
        // Overwrittes the different states of border
        backgroundColor: '#266f9d',
      },
      '&:active': {
        // Overwrittes the different states of border
        backgroundColor: 'red',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: 'white',
    }),
    menuList: (base) => ({
      ...base,
      backgroundColor: '#1c5274',
    }),
    placeholder: (base) => ({
      ...base,
      color: 'white',
    }),
  };
  const { isLoading, options, value } = dropdown;
  return (
    <CreatableSelect
      className="dropdown"
      styles={customStyles}
      isClearable
      isDisabled={isLoading}
      isLoading={isLoading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
    />
  );
};
