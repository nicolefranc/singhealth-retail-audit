import gql from 'graphql-tag';
import { useState } from "react";
import { useQuery } from '@apollo/client';
import { Spin,Empty } from "antd";
import {SwipeableList} from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import TenantListItem from "./TenantListItem";
import { tokenValidator } from '../../utils/tokenValidator';


export default function TenantCard({ tenants }) {

    const [checkboxVisibility, setCheckboxVisibility] = useState(null)

    let validatorResult = tokenValidator(localStorage.getItem("jwt"));
    const myInstitutions = validatorResult.institutions;
    const auditorId = validatorResult.id;
    console.log(auditorId);

    // TODO: add status as query variable when filter functionality is done
    // const { loading, error, data } = useQuery(FETCH_ALL_TENANTS);
    // const { getAllTenants } = data ? data : [];

    // if (loading) {
    //     return (
    //         <div className="flex w-full justify-center items-center">
    //                 <Spin tip="Loading..." size="large" />
    //         </div>
    //     );
    // }

    // else if (error) {
    //     return (
    //         <Empty
    //             image={Empty.PRESENTED_IMAGE_SIMPLE}
    //             description={
    //                 <span>No Tenants Found</span>
    //             }
    //         />
    //     );
    // }

    return (
        <div className="z-0">
            {
                // getAllTenants.map((tenant, index) => {
                tenants.map((tenant, index) => {
                    return <SwipeableList key={index}>
                        <TenantListItem content={tenant} checkboxVisible={checkboxVisibility} auditable={myInstitutions.includes(tenant.institution)}/>
                    </SwipeableList>
                }) 
            }
        </div>
    )
}

const FETCH_ALL_TENANTS = gql`
    query fetchAllTenants {
        getAllTenants {
            id
            name
            type
            institution
            email
        }
    }
`