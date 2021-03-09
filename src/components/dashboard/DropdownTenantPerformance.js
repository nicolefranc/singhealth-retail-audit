import { Menu, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import Select from 'react-select';
import { useState } from 'react';
import PerformanceGraph from './PerformanceGraph';
import {PerformanceAll, Performance, dropdownTenant} from './TenantData';

export default function DropdownTenantPerformance({dropdownTenant}) {

    const [selectedValue, setSelectedValue] = useState(0);

    const handleChange = e => {
      setSelectedValue(e.value);
    }

    return(
      <>
        <div className='mb-6'>
          <Select
            className = 'mb-16'
            value={dropdownTenant.find(x => x.value === selectedValue)}
            options={dropdownTenant}
            onChange={handleChange} 
            >  
          </Select>

          <PerformanceGraph
            content= {!selectedValue? PerformanceAll: Performance}
            type={!selectedValue? 'all' : null}
            >
          </PerformanceGraph>
          
        </div>
        </>
    )
}