import { Menu, message, Select} from 'antd';
import { DownOutlined } from '@ant-design/icons';
// import Select from 'react-select';
import { useState } from 'react';
import PerformanceGraph from './PerformanceGraph';
import {PerformanceAll, Performance} from './TenantData';
import { useQuery, useLazyQuery} from '@apollo/client';
import { FETCH_ALL_TENANTS_PERFORMANCE, FETCH_ALL_TENANT_PERFORMANCE } from '../../graphql/queries';
import { SectionTitle } from '../layout/PageLayout';

export default function DropdownTenantPerformance({getAllTenantsPerformance}) {

    const performanceAll = [];

    const dropdownTenant = [{
      label : "All Tenants",
      value : 0
    }];

    // if(getAllTenantsPerformance){
    //   for(let i = 0; i < getAllTenantsPerformance.length; i++){
    //     if (getAllTenantsPerformance[i].performance.length > 0){
    //       for(let j = 0; j < getAllTenantsPerformance[i].performance.length; j++){ 
    //         console.log("perindex",getAllTenantsPerformance[i].performance[j])
    //         performanceAll.push(getAllTenantsPerformance[i].performance[j])
    //         console.log("performanceAlladd",performanceAll)
    //         performanceAll[j].key = getAllTenantsPerformance[i].name
    //         console.log("performanceAllwkey",performanceAll)
    //       }
    //     }   
    //   }
    // }

    if(getAllTenantsPerformance){
      for(let i = 0; i < getAllTenantsPerformance.length; i++){
        dropdownTenant.push({label: getAllTenantsPerformance[i].name, value: i+1 });
        if (getAllTenantsPerformance[i].performance.length > 0){
          for(let j = 0; j < getAllTenantsPerformance[i].performance.length; j++){ 
            const eachPerformance = {...getAllTenantsPerformance[i].performance[j]};
            eachPerformance.key = getAllTenantsPerformance[i].name
            performanceAll.push(eachPerformance)
          } 
        }   
      }
    }
    console.log("dropdown",dropdownTenant)

    console.log("performanceAll", performanceAll)

    const { Option } = Select;

    const [selectedValue, setSelectedValue] = useState(0);

    const [selectedTenant, setSelectedTenant] = useState(performanceAll);

    // const [getSelectedTenant, { loading, error, data } ] = useLazyQuery(FETCH_ALL_TENANT_PERFORMANCE);

    const handleChange = (e) => {
      console.log('selected',e);
      setSelectedValue(dropdownTenant[e].value);
      performance = [];
      for(let i = 0; i < performanceAll.length ; i++){
        if(dropdownTenant[e].label == performanceAll[i].key){
          performance.push({month: performanceAll[i].month, score: performanceAll[i].score})
        }
      }
      console.log("performance",performance)
    }

    function onSearch(val) {
      console.log('search:', val);
    }

    return(
      <>
        <div className='mb-6 flex justify-between '>
          <h2 className="font-medium text-lg uppercase tracking-wide pb-2">Performance</h2>
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
          
        </div>

        <PerformanceGraph
          content= {!selectedValue? performanceAll: performance}
          type={!selectedValue? 'all' : null}
          >
        </PerformanceGraph>

        {/* <PerformanceGraph
          content= {!selectedValue? PerformanceAll: Performance}
          type={!selectedValue? 'all' : null}
          >
        </PerformanceGraph> */}
    </>
)}