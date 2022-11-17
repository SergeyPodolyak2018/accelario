import React from 'react';
import  Table  from '../../components/table'

import { useAppSelector } from '../../app/hooks';
import {
    selectData,
} from './entriesSlice';
import styles from './Entries.module.scss';


const coluns=[
    {
        id:"api",
        Header: "API",
        accessor: "API"
    },
    {
        id:"description",
        Header: "Description",
        accessor: "Description"
    },
    {
        id:"auth",
        Header: "Auth",
        accessor: "Auth"
    },
    {
        id:"cors",
        Header: "Cors",
        accessor: "Cors"
    },
    {
        id:"link",
        Header: "Link",
        accessor: "Link"
    },
    {
        id:"category",
        Header: "Category",
        accessor: "Category"
    }
]

export function Entries() {
  const entries = useAppSelector(selectData);

  return (
    <div>
      <div className={styles.row}>
          <Table
            columns={coluns}
            data={entries}
          />
      </div>

    </div>
  );
}
