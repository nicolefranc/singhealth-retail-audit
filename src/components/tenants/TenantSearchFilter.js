import { Input, AutoComplete, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import Select from 'react-select';
import { useState } from 'react';

export default function TenantSearchFilter({tenants}) {

  const tenantss = [];

  const tenants2 = [...tenants]
  // const tenants2= [
  //   {
  //     id: "604e6bf39e962017541a3dc6",
  //     name: "cghStarbucks",
  //     institution: "cgh"
  //   },
  //   {
  //     id: "604e6c599e962017541a3dc7",
  //     name: "sghGuardian",
  //     institution: "sgh"
  //   },
  //   {
  //     id: "604e6c599e962017541a3dc7",
  //     name: "thsYes",
  //     institution: "ths"
  //   },
  //   {
  //     id: "604e6c599e962017541a3dc7",
  //     name: "cghYes",
  //     institution: "cgh"
  //   }
  // ]

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
    const foundSameInstitution = false;
    for (let j = 0; j < tenantss.length; j ++){
      console.log(tenantss.institution)
      console.log(tenantss.name)
      if (tenantss[j].institution === tenants2[i].institution){
        foundSameInstitution = true;
        tenantss[i].options.push({value: tenants2[i].name});
      }
    }
    if(!foundSameInstitution){
      tenantss.push( {label: tenants2[i].institution, options: [{value: tenants2[i].name}]})
    };
    // for (let y = 0; y<tenants2.length;y++){
    //   if (tenants2[y].institution === tenantss[i].label){
    //     try {
    //       tenantss[i].options.push({value: tenants2[y].name}) 
    //     } catch(err){
    //       console.log(err);
    //     }
    //     console.log("hi");
    //   }
    // }
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

    function onSearch(val) {
      console.log('search:', val);
    }

    //(inputValue, option) => option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    
    function handleFilter(inputValue,option) {
      let optionString = "";
      {option.value && (optionString = option.value)};
      return (optionString.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1);
    }
  
    return(
      <>
          {/* <Select 
            className='mb-12'  
            showSearch
            onSearch ={onSearch}
            defaultValue= {options[0].label}
            onChange={handleChange} 
            style={{ width: 200 }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            >
            {options.map(tenant => (
            <Option key={tenant.value}>{tenant.label}</Option>
            ))}
          </Select>       */}
          <AutoComplete
              className="w-full"
              dropdownClassName="certain-category-search-dropdown"
              dropdownMatchSelectWidth={500}
              options={tenantss}
              onSearch = {onSearch}
              onChange = {handleChange}
              filterOption={handleFilter}
            >
              {/* {options.map(institution => {
                institution.options.map(tenant => (
                  <>
                    <Option> <span>{institution.label}</span></Option>
                    <Option key={tenant.value}>{tenant.value}</Option>
                    </>
                ))
              })} */}
              <Input.Search size="large" placeholder="input here" enterButton="Search" onSearch={onSearch}/>
          </AutoComplete>
        </>
    )
        }