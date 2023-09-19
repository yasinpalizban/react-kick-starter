


export interface IStateCommon {
    modalRef?: boolean;
    deleteId?: number;
    deleteIndex?: number;
    deleteItem?: string;
    title?: string;

    initSearchFiled?: {

        _data: [{
            _filed: string,
            _sign: string,
            _value: string,
        }
        ],
    }
}