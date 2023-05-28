import { Menu } from "@mantine/core";
import { FC } from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface CustomMenuProps {
  button: React.ReactNode;
  options: Array<any>;
}

const CustomMenu: FC<CustomMenuProps> = ({ button, options }) => {
  const navigate = useNavigate();
  return (
    <>
      <Menu shadow="md" width={200}>
        <Menu.Target>{button}</Menu.Target>

        <Menu.Dropdown>
          {options &&
            options.map(({ icon, id, text, color, link }, i) => (
              <Menu.Item
                icon={icon}
                key={id}
                color={color ? `red` : "gray"}
                onClick={() => {
                  if (text === "Log Out") {
                    navigate(link);
                  }
                  if (text === "Create Account") {
                    navigate(link);
                  }
                  if (text === "Recycle Bin") {
                    navigate(link);
                  }
                  if (text === "Settings") {
                    navigate(link);
                  }
                }}
              >
                {text}
              </Menu.Item>
            ))}
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default CustomMenu;
