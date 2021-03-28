import { Menu, message, Select} from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import Select from 'react-select';
import { useState } from 'react';
import PerformanceGraph from './PerformanceGraph';
import {PerformanceAll, Performance} from './TenantData';

export default function DropdownTenantPerformance({dropdownTenant}) {

    const { Option } = Select;

    const [selectedValue, setSelectedValue] = useState(0);

    const handleChange = e => {
      setSelectedValue(dropdownTenant[e].value);
    }

    function onSearch(val) {
      console.log('search:', val);
    }

    return(
      <>
        <div className='mb-6'>

          <Select 
            className='mb-12'  
            showSearch
            onSearch ={onSearch}
            defaultValue= {dropdownTenant[0].label}
            onChange={handleChange} 
            style={{ width: 200 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
            {dropdownTenant.map(tenant => (
            <Option key={tenant.value}>{tenant.label}</Option>
            ))}
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