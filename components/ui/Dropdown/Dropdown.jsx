import { memo } from "react";

import { SearchSelect, SearchSelectItem } from "@tremor/react";

const Dropdown = memo(({ value, onValueChange, data }) => {
  const handleValueChange = (newValue) => {
    onValueChange(data[newValue - 1]);
  };

  return (
    <div className="max-w-sm mx-auto space-y-6">
      <SearchSelect value={value} onValueChange={handleValueChange} placeholder="Search Subject">
        {data.map((label, index) => (
          <SearchSelectItem key={index} value={index + 1}>
            {label}
          </SearchSelectItem>
        ))}
      </SearchSelect>
    </div>
  );
});

export default Dropdown;
