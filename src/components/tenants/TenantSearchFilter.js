import { Input, AutoComplete, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import Select from 'react-select';
import { useState, useHistory } from 'react';

export default function TenantSearchFilter({tenants}) {

  // const history = useHistory();

  const tenantss = [];

  const tenants2 = [...tenants]

  function sortByInstitution(property){
    return function(a,b){
      if(a[property] > b[property]){
        return 1;
      }
      else if(a[property] < b[property]){
        return -1;
      }
      return 0;
    }
  }

    tenants2.sort(sortByInstitution("institution"))

    console.log("sorted tenant data",tenants2)

  for (let i = 0; i<tenants2.length; i++){ //i< number of institution
    //need to check whether tenantss has object with instituion == tenansts2[i].institution
    let foundSameInstitution = false;
    for (let j = 0; j < tenantss.length; j ++){
      console.log("tenantss",tenantss[j].label)
      console.log("tenants2",tenants2[i])
      if (tenantss[j].label === tenants2[i].institution){
        foundSameInstitution = true;
        tenantss[j].options.push({value: tenants2[i].name});
      }
    }
    if(!foundSameInstitution){
      tenantss.push( {label: tenants2[i].institution, options: [{value: tenants2[i].name}]})
    };
  }

  // const tenants1 = tenants2.filter(t => t.institution === "cgh")
  console.log("tenantss", tenantss)
  // console.log(tenants1);
  /*  
  
  */
  const options = [
    {
      label: 'Institution CGH',
      options: [
        { value: 'Starbucks'}, 
        {value:'Guardian'}],
    },
    {
      label: 'Institution SGH',
      options: [{ value: 'FairPrice'}, 
      {value:'KakiMakan'}],
    },
    {
      label: 'Institution TEST',
      options: [{value:'TestTenant'}],
    },
  ];
    console.log("options",options)

    const { Option } = AutoComplete;

    const [selectedValue, setSelectedValue] = useState();

    const handleChange = (a) => {
      console.log(`selected ${a}`);
      setSelectedValue(a);
    }

    function onSearch(e) {
      // history.push(`${routes.REPORT}/${reportId}`)
      console.log('search:', e.target.value);
    }

    //(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    
    function handleFilter(inputValue,option) {
      let optionString = "";
      {option.value && (optionString = option.value)};
      return (optionString.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
    }
  
    return(
      <>
          <AutoComplete
              className="w-full"
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={500}
              options={tenantss}
              onSearch = {onSearch}
              onChange = {handleChange}
              filterOption={handleFilter}
            >
              <Input size="large" placeholder="Search Tenant" enterButton={false} onPressEnter={onSearch} style={{ borderRadius: '0.375rem' }} />
          </AutoComplete>
        </>
    )
        }