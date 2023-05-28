'use client';

import { Select, Input } from '@mantine/core';
import { FC } from 'react';
import { IconType } from 'react-icons';
import { createStyles, getStylesRef, rem } from '@mantine/core';

interface PlainSelectProps {
  id: string;
  placeholder: string;
  value: string | null;
  data: Array<string>;
  onChange: (val: string) => void;
  error: boolean | undefined | string;
  errorMessage: string | undefined;
  disable?: boolean;
  onBlur: () => void;
  Icon: IconType;
  className?: string;
}

const useStyles = createStyles((theme) => ({
  itemsWrapper: {
    background: '#06C149',
  },
}));

const PlainSelect: FC<PlainSelectProps> = ({
  data,
  value,
  onChange,
  id,
  placeholder,
  error,
  errorMessage,
  disable,
  onBlur,
  Icon,
  ...rest
}) => {
  const { classes } = useStyles();
  return (
    <Input.Wrapper id={id} error={errorMessage}>
      <Select
        searchable
        {...rest}
        id={id}
        value={value}
        className={`mt-4`}
        placeholder={placeholder}
        icon={<Icon />}
        onChange={onChange}
        size="xl"
        radius="xl"
        data={data}
        error={error}
        disabled={disable}
        onBlur={onBlur}
      />
    </Input.Wrapper>
  );
};

export default PlainSelect;
