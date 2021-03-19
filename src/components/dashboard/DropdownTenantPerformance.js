import { Menu, message, Select} from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import Select from 'react-select';
import { useState } from 'react';
import PerformanceGraph from './PerformanceGraph';
import {PerformanceAll, Performance, dropdownTenant} from './TenantData';

import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

export default function DropdownTenantPerformance({dropdownTenant}) {
  
  /*
  const {error, loading, data} = useQuery(GET_TENANTS);
  const performanceAll = [];
  for (let i = 0; i < data.getAllTenants.length; i ++){
    performanceAll.push(data.getAllTenants.performance);
  }
  
  console.log(performanceAll)
  */
 
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
            content= {!selectedValue? PerformanceAll: Performance} //
            type={!selectedValue? 'all' : null}
            >
          </PerformanceGraph>
          
        </div>
        </>
    )
  }

  const GET_TENANTS = gql`
  query{
    getAllTenants{
      name
      institution
      performance{
        month
        key
        score
      }
    }
  }
  ` 