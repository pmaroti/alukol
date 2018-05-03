var typeofworks = [
    'anyagrendelés', 
    'gyártmányterv'
];

var workdescriptions = [
    'rendszeranyag',
    'gyártási segédanyag',
    'szerelési segédanyag',
    'acél bekötő',
    'acél lemezek',
    'alu bekötő',
    'alu lemezek',
    'Ablak, Ajtó',
    'Pfosten',
    'Riegel',
    'Klemm, Deck',
    'Gyártmány',
    'üvegrendelés'
];

var columns = [
    {
        data: 'Del',
        type: 'checkbox',
        __type: 'deleteCol'
    },
    {
        data: 'id',
        type: 'numeric',
        //readOnly: true,
        __type: 'generated'
    },
    {
        data: 'projectnr',
        type: 'text',
        readOnly: true,
        __type: 'fromlist',
        __list: 'projects'
    },
    {
        data: 'projectname',
        type: 'text',
        readOnly: true,
        __type: 'generated'
    },
    {
        data: 'ordernr',
        type: 'text',
        readOnly: true,
        __type: 'generated'
    },
    {
        data: 'secordernr',
        type: 'text'
    },
    {
        data: 'typeofwork',
        type: 'dropdown',
        source: typeofworks
    },
    {
        data: 'workdescription',
        type: 'dropdown',
        source: workdescriptions
    },
    {
        data: 'responsible',
        readOnly: true,
        type: 'text'
    },
    {
        data: 'plannr',
        type: 'text'
    },
    {
        data: 'structurename',
        type: 'text'
    },
    {
        data: 'orderer',
        readOnly: true,
        type: 'text'
    },
    {
        data: 'orderdate',
        type: 'text',
        readOnly: true,
        dateFormat: 'YYYY/DD/MM'
    },
    {
        data: 'confirmeddate',
        type: 'text',
        readOnly: true,
        dateFormat: 'YYYY/DD/MM'
    },
    {
        data: 'deliverydate',
        readOnly: true,
        type: 'text'
    },
    {
        data: 'handoverdate',
        readOnly: true,
        type: 'text'
    },
    {
        data: 'deliverynr',
        type: 'text'
    },
    {
        data: 'price',
        type: 'text'
    },
    {
        data: 'comment',
        type: 'text'
    }
];

var columnHeaders = [
    'Törlés',
    'Sorszám',
    'Projekt szám',
    'Projekt megnevezése',
    'Megrendelésszám +PDF',
    'Másodlagos megrendelésszám',
    'Munka neme',
    'Munka leírása',
    'Munka felelőse',
    'Terv szám',
    'Szerkezet megnevezése',
    'Megrendelő',
    'Megrendelés dátum',
    'Visszaigazolás dátuma/gyártás készrejelentés dátuma',
    'Kiszállítás dátuma',
    'Átadás-Átvétel dátuma',
    'Szállításhoz mellékelt szállítólevél száma + PDF',
    'Megrendelés ára Ft',
    'Megjegyzés'
];

export { columns, columnHeaders };
