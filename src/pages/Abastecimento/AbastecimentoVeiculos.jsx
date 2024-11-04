import React, { useContext, useEffect, useState } from 'react'
import { currency, decimalFormatter } from '../../Helper/NumberFormatter'
import { format } from 'date-fns';
import { ptBR as br } from 'date-fns/locale';
import { FilterContext } from '../../Context/FilterVault';
import styles from './Abastecimento.module.css';


import Modal from 'react-modal';
import Table from '../../Components/Table/Table';
import TableContentLoader from '../../Helper/Skeleton/TableContentLoader';


const customStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // cor de fundo do overlay
        transition: 'opacity 0.3s ease', // adicionar transição de opacidade
    },
    content: {
        margin: 'auto'
    },

};



function AbastecimentoVeiculos() {

    const [modalIsOpen, setIsOpen] = useState(false);
    const [veiculos, setVeiculos] = useState(null);

    const dadosFiltro = useContext(FilterContext);
    const { filterFetchs, fetchData, url } = dadosFiltro;

    const [rowsModal, setRowsModal] = useState(null);
    const [columnsModal, setColumnsModal] = useState(null);


    const [columns, setColumns] = useState(null);


    // Primeira renderizacao para setar o modal 
    useEffect(() => {
        Modal.setAppElement('#modalGrid');
    }, []);


    // Fetch inicial
    useEffect(() => {

        const columns = [
            {
                field: 'placa',
                headerName: 'Placa',
                width: 150,
                renderCell: ({ row }) => (
                    <div className={styles.containerPlaca}>
                        <span className={styles.placa}>
                            {row.placa}
                        </span>
                    </div>
                ),
            },
            { field: 'filial', headerName: 'Filial', width: 150 },
            {
                field: 'km_percorrido', headerName: 'Distância', type: 'number', renderCell: ({ row }) => (
                    <div>
                        <span>
                            {`${decimalFormatter.format(+row.km_percorrido)} km`}
                        </span>
                    </div>
                ),
            },
            {
                field: 'volume', headerName: 'Volume', type: 'number', renderCell: ({ row }) => (
                    <div >
                        <span>
                            {`${decimalFormatter.format(+row.volume)} L`}
                        </span>
                    </div>
                ),
            },
            {
                field: 'media', headerName: 'Km/l', type: 'number', renderCell: ({ row }) => (
                    <div >
                        <span>
                            {` ${decimalFormatter.format(+row.media)} km/l`}
                        </span>
                    </div>
                ),
            },
            { field: 'tipo', headerName: 'Tipo', },
            { field: 'descricao_categoria', headerName: 'Categoria', width: 150 },
            { field: 'departamento', headerName: 'Departamento', width: 150 },
            { field: 'media_mensal', headerName: 'Média Mensal', width: 400 },
        ];

        if (url)
            (async () => {

                try {
                    const json = await fetchData('veiculos', filterFetchs);


                    if (json) {
                        setVeiculos(json);
                        setColumns(columns)
                    }



                } catch (error) {
                    console.log(error);
                }
            })()
    }, [dadosFiltro])

    async function fetchPlacaInfo(placa, filial) {

        if (placa && filial) {
            try {


                const json = await fetchData('detalheVeiculo', { ...dadosFiltro, placa, filial });

                if ('detalhado' in json && 'resumido' in json) {
                    setColumnsModal(columnsDetalhes);
                    setRowsModal(json.detalhado);
                }


            } catch (error) {
                console.log(error);
            }

        }


    }

    function openModal({ row }) {

        const { placa, filial } = row;

        fetchPlacaInfo(placa, filial);
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    const columnsDetalhes = [
        {
            field: 'placa',
            headerName: 'Placa',
            width: 150,
            renderCell: ({ row }) => (
                <div className={styles.containerPlaca}>
                    <span className={styles.placa} >
                        {row.placa}
                    </span>
                </div>
            ),
        },
        {
            field: 'volume', headerName: 'Volume', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span>
                        {`${decimalFormatter.format(+row.volume)} L`}
                    </span>
                </div>
            ),
        },
        {
            field: 'descricao_categoria', headerName: 'Categoria', type: 'text'
        },
        { field: 'tipo', headerName: 'Tipo' },
        {
            field: 'km_abastecimento', headerName: 'Km Abastecimento', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span>
                        {`${decimalFormatter.format(+row.km_abastecimento)} km`}
                    </span>
                </div>
            ),
        }, {
            field: 'km_anterior', headerName: 'Km Anterior', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span>
                        {`${decimalFormatter.format(+row.km_anterior)} km`}
                    </span>
                </div>
            ),
        },
        {
            field: 'km_percorrido', headerName: 'Distância', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span>
                        {`${decimalFormatter.format(+row.km_percorrido)} km`}
                    </span>
                </div>
            ),
        },
        {
            field: 'valor_total', headerName: 'Valor Total', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span  >
                        {currency.format(+row.valor_total)}
                    </span>
                </div>
            ),
        },
        {
            field: 'valor_litro', headerName: 'R$ Litro', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span  >
                        {currency.format(+row.valor_litro)}
                    </span>
                </div>
            ),
        },
        {
            field: 'descricao_combustivel', headerName: 'Combustível', type: 'text',
        },
        {
            field: 'media', headerName: 'Media', type: 'number', renderCell: ({ row }) => (
                <div >
                    <span>
                        {`${decimalFormatter.format(row.media)} km/l`}
                    </span>
                </div>
            ),
        },
        {
            field: 'descricao_bomba', headerName: 'Bomba', width: 150
        },
        { field: 'tratado', headerName: 'Tratado' },
        {
            field: 'data', headerName: 'Data', renderCell: ({ row }) => (
                <div >
                    <span>
                        {format(row.data, 'dd/MM/yyyy HH:mm:ss', { locale: br })}
                    </span>
                </div>
            ),
        },
    ];




    return (
        <section className='animeLeft'>

            <div className={styles.containerGrid} style={{ height: '75vh' }} >
                {veiculos && columns ?
                    <Table
                        rows={veiculos}
                        columns={columns}
                        onRowClick={openModal}
                    />

                    : <TableContentLoader />}
            </div>

            <div id='modalGrid' >
                {modalIsOpen && (


                    <Modal
                        isOpen={modalIsOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        contentLabel="Lista de Abastecimentos"
                    >

                        {rowsModal ?
                            <div style={{ height: '90%', width: '100%' }}>
                                <Table
                                    rows={rowsModal}
                                    columns={columnsModal}
                                />
                                <div className="closeButton">
                                    <button onClick={closeModal}>Fechar</button>
                                </div>
                            </div>
                            : <TableContentLoader />}
                    </Modal>
                )}
            </div>
        </section>
    )
}

export default AbastecimentoVeiculos;


