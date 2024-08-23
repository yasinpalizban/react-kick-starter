import React, {useEffect, useState} from 'react';

export default function BasicListHooks() {
    const [modalRef, setModalRef] = useState(false);
    const [deleteId, setDeleteId] = useState(0);
    const [deleteIndex, setDeleteIndex] = useState(0);
    const [deleteItem, setDeleteItem] = useState('');
    const [permissionName, setPermissionName] = useState('');
    const [pageSize, setPageSize] = useState(10);
     useEffect(()=>{
         getPermission();
     });
    const getPermission=()=>{
        const explodeLink = window.location.pathname.replace('/admin/', '').replace('dashboard/', '').split('/').filter(item => item != '');
        const permission = explodeLink[0].replaceAll('-', '').toLowerCase();
        setPermissionName(permission);
    }
    const setPage = (page: number) => {
        setPageSize(page);
    }
    const setData = (data: { modalRef?: boolean, deleteId?: number, deleteIndex?: number, deleteItem?: string }) => {
        setModalRef(data.modalRef!);
        setDeleteId(data.deleteId!);
        setDeleteItem(data.deleteItem!);
        setDeleteIndex(data.deleteIndex!);
    }
    return {
        data: {
            permissionName,
            modalRef: modalRef,
            deleteId,
            deleteIndex: deleteIndex,
            deleteItem: deleteItem,
            pageSize
        },
        setData,
        setPage,
    };
}






