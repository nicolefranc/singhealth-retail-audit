import { useMutation, useQuery } from "@apollo/client";
import { Button, message, Select, Spin } from "antd";
import { gql } from "apollo-client-preset";
import { useEffect, useMemo, useState } from "react";
import { tokenValidator } from "../../utils/tokenValidator";

export default function CrossInstitution() {
    const user = tokenValidator(localStorage.getItem('jwt'));
    const [disabled, setDisabled] = useState(true);
    const [selected, setSelected] = useState(null);
    const [auditorId, setAuditorId] = useState(null);
    const { loading, error, data } = useQuery(FETCH_ALL_AUDITORS);
    const [addInstitution] = useMutation(ADD_INSTITUTION)

    function onChange(value) {
        console.log(`selected ${value}`);
        setDisabled(false);
        setSelected(value);
    }
    
    function onBlur() {
        console.log('blur');
    }
    
    function onFocus() {
        console.log('focus');
    }
    
    function onSearch(val) {
        console.log('search:', val);
    }

    const onAuditorChange = (value) => {
        console.log(`Auditor Id selected - ${value}`);
        setAuditorId(value);
    }

    const submit = () => {
        addInstitution({ variables: {
            "addInstitutionInst": selected,
            "addInstitutionId": auditorId
        }}).then(
            onfulfilled => {
                console.log(onfulfilled);
                message.success('Successfully added auditor to institution.');
                setDisabled(true);
                setSelected(null);
                setAuditorId(null);
            },
            onrejected => {
                console.log(onrejected);
                message.error('Failed to add auditor to institution.');
            }
        )
    }
    
    const auditors = () => {
        if (data && data.getAllAuditors) {
            return data.getAllAuditors.filter(auditor => !auditor.institutions.includes(selected));
        }

        return null;
    }

    if (loading) return <Spin />
    else if (error) return <div>{JSON.stringify(error)}</div>
    console.log('all auditors');
    console.log(data.getAllAuditors);

    return (
        <>
            <h1 className="font-medium text-lg">Add an auditor to your institution</h1>

            <div className="flex flex-col">
                <h2 className="mt-4 mb-1 uppercase text-sm text-gray-400 font-medium">Institution</h2>
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select institution"
                    optionFilterProp="children"
                    onChange={onChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    loading={loading}
                >
                    { user.institutions.map(institution => {
                        
                        return <Select.Option value={institution}>{institution}</Select.Option>
                    }
                    )}
                </Select>

                <h2 className="mt-4 mb-1 uppercase text-sm text-gray-400 font-medium">Auditor</h2>
                <Select
                    disabled={disabled}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Select an auditor"
                    optionFilterProp="children"
                    onChange={onAuditorChange}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    loading={loading}
                >
                    { (!loading && !error) && auditors().map(auditor =>{
                        
                        return <Select.Option value={auditor.id}>{auditor.name}</Select.Option>
                    }
                    )}
                </Select>
            </div>
            <Button className="mt-4" type="primary" disabled={disabled} onClick={submit}>Add</Button>
        </>
    )
}

const FETCH_ALL_AUDITORS = gql`
    query fetchAllAuditors {
        getAllAuditors {
            id
            name
            institutions
        }
    }
`

const ADD_INSTITUTION = gql`
    mutation AddInstitutionMutation($addInstitutionInst: String!, $addInstitutionId: String!) {
        addInstitution(inst: $addInstitutionInst, id: $addInstitutionId) {
            id
            role
            institutions
            name
        }
    }
`