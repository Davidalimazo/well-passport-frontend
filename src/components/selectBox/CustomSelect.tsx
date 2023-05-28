import { FC, useState } from "react";
import { IconBaseProps, IconType } from "react-icons/lib";
import Select from "react-select";

interface CustomSelectProps {
  value?: any;
  onChange: (value: any) => void;
  data: any[];
  PlaceholderIcon?: IconType;
  placeholder: string;
}

const CustomSelect: FC<CustomSelectProps> = ({
  value,
  onChange,
  data,
  placeholder,
  PlaceholderIcon,
}) => {
  const [error, setError] = useState(false);
  return (
    <div className="z-50">
      <Select
        onBlur={(e) => {
          if (!e.target.value) {
            setError(true);
          } else {
            setError(true);
          }
        }}
        placeholder={
          PlaceholderIcon ? (
            <div className="flex flex-row items-center gap-7">
              <PlaceholderIcon size={20} />{" "}
              <span className="text-xl text-[#9E9E9E]">{placeholder}</span>
            </div>
          ) : (
            placeholder
          )
        }
        isClearable
        options={data}
        value={value}
        onChange={(value) => onChange(value)}
        formatOptionLabel={(option: any) => (
          <div
            className="
      flex flex-row items-center gap-3"
          >
            <div>{option.icon}</div>
            <div>{option.value}</div>
          </div>
        )}
        classNames={{
          control: () => `p-2 rounded-full`,
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 30,
          colors: {
            ...theme.colors,
            primary: "#06C149",
            primary25: "#E6F9ED",
          },
        })}
      />
    </div>
  );
};

export default CustomSelect;
