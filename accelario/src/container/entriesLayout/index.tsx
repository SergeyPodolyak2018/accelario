import React, { useEffect, CSSProperties} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectStatus,getDataAsync,selectCount} from "../../features/entries/entriesSlice";
import { Entries } from '../../features/entries/Entries';
import styles from './EntriesLayout.module.scss';
import ScaleLoader from "react-spinners/ScaleLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export function EntriesLayout() {
    const status = useAppSelector(selectStatus);
    const count = useAppSelector(selectCount);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if(count === 0 && status === 'idle'){
            dispatch(getDataAsync());
        }
    });

  return (
    <div>
        {status==='loading'
            ?
            <div className={styles.spinner}>
                <ScaleLoader
                    cssOverride={override}
                    height={45}
                    width={5}
                    color={"#123abc"}
                    loading={status==='loading'}
                    speedMultiplier={1.1}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
            :
            <div className={styles.row}>
                <Entries/>
            </div>
        }

    </div>
  );
}
