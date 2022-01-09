import React, { useEffect, useState } from 'react';
import LoadButton from '../LoadButton';
import { useAppSelector, useAppDispatch } from '../../../data/reduxHooks';
import { selectItems, setOffset } from '../../../redux/contentSlice';
import { selectItemsStatus } from '../../../redux/statusSlice';

export default function CatalogLoadBtn() {
    const items = useAppSelector(selectItems);
    const itemsStatus = useAppSelector(selectItemsStatus);

    const dispatch = useAppDispatch();
    const [isDisabled, setDisabled] = useState(false);

    useEffect(() => {
        if (items.length < 6 || itemsStatus !== 'loaded') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [items, itemsStatus]);

    const onClick = () => dispatch(setOffset(6));

    return (
        <LoadButton
            disabled={isDisabled} onClick={onClick}
            className='mt-4'
        >
            Загрузить ещё
        </LoadButton>
    );
}
