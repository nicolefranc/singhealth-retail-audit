import { Input, AutoComplete, Select} from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import Select from 'react-select';
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import gql from 'graphql-tag';
import { useQuery, useLazyQuery} from '@apollo/client';

export default function TenantSearchFilter({tenants}) {

  let history = useHistory()

  var tenantName = "";

  const options = [];

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

    console.log("sorted tenant2 data",tenants2)

  for (let i = 0; i<tenants2.length; i++){ //i< number of institution
    //need to check whether options has object with instituion == tenansts2[i].institution
    let foundSameInstitution = false;
    for (let j = 0; j < options.length; j ++){
      // console.log("options",options[j].label)
      // console.log("tenants2",tenants2[i])
      if (options[j].label === tenants2[i].institution){
        foundSameInstitution = true;
        options[j].options.push({value: tenants2[i].name});
      }
    }
    if(!foundSameInstitution){
      options.push( {label: tenants2[i].institution, options: [{value: tenants2[i].name}]})
    };
  }

  // const tenants1 = tenants2.filter(t => t.institution === "cgh")
  console.log("options", options)
  // console.log(tenants1);

  const { Option } = AutoComplete;

  const [changeValue, setChangeValue] = useState("");

  const [selectedValue, setSelectedValue] = useState("");

  // const { loading, error, data }= useQuery(GET_TENANT_BY_NAME, {variables: {name :tenantName}});
  // if(loading) console.log("loading",loading)
  // if(error) console.log("error",error)
  // const { getTenantByName } = data ? data : [];
  // if(getTenantByName) console.log("getTenantByName",getTenantByName);

  const [searchValue, setSearchValue] = useState("");
  const [getSearch, { loading, error, data } ] = useLazyQuery(GET_TENANT_BY_NAME);


  const handleChange = (a) => {
    console.log(`selected ${a}`);
    setChangeValue(a);
    tenantName = a;
    console.log("tenantNameChange", changeValue)
  }

  const handleSelect = (a) => {
    setSelectedValue(a);
    setSearchValue(a);
    console.log("selectedSearch", selectedValue)
  }

  function onSearch(val) {
    // tenantName = val;
    setSearchValue(val)
    console.log("searchValue",searchValue)
    getSearch({
      variables: {name :searchValue}
    })
    console.log('searchData:', data);
    const { getTenantByName } = data ? data : [] ;

    if (getTenantByName){
    console.log("getTenantByname" ,getTenantByName)
    history.push(`TenantDetail/${getTenantByName.id}`)
    };
    
  }
  
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
            options={options}
            onChange = {handleChange}
            onSelect = {handleSelect}
            filterOption={handleFilter}
          >
            <Input.Search size="large" placeholder="Search Tenant" enterButton="Search" onSearch={onSearch}/>
        </AutoComplete>
      </>
  )
}

const GET_TENANT_BY_NAME = gql`
  query getTenantByName($name: String!) {
    getTenantByName(name: $name) {
      id
      name
    }
  }
`;
