import React, { FC } from 'react'
import Select, { SingleValue } from 'react-select';
import { IMySelect, ValueSelect } from './select.interface';
import cn from 'classnames'
import { useTypedSelector } from '../../../hooks/useTypedSelector';


const MySelect:FC<IMySelect> = ({value, setValue, options}) => {
  const {colorTheme} = useTypedSelector(state => state.theme)

  const handleChange = (e: SingleValue<ValueSelect>) => {
    setValue({value: e?.value || '', label: e?.label || ''})
  }

  return (
    <Select
    className='select-container'
    classNamePrefix={cn({
      'custom-select-black-space': colorTheme === 'black' || colorTheme === 'space',
      'custom-select-classic': colorTheme === 'classic',
    })}
    isSearchable={false}
    name="sort"
    value={value.value === '' && value.label === '' ? null : value}
    onChange={handleChange}
    placeholder='Пользователи'
    options={options}
  />
  )
}

export default MySelect