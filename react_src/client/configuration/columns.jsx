colHeaders = [
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

typeofworks = [
    'anyagrendelés', 
    'gyártmányterv'
]

workdescriptions = [
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

orders =[
    'PT',
    'DZS',
    'SZSZ',
    'HT',
    'IL',
    'PSZ'
];

responsibledecisionmatrix= [
    {
        typeofwork: 'a',
        workdescription: 'b',
        responsible: 'NA'
    },
    {
        typeofwork: 'anyagrendelés',
        workdescription: '*',
        responsible: 'NA'
    },
    {
        typeofwork: 'gyártmányterv',
        workdescription: [
            'acelé bekötő',
            'acél lemezek'
        ],
        responsible: 'NA'
    },
    {
        typeofwork: 'gyártmányterv',
        workdescription: [
            'alu bekötő',
            'alu lemezek'
        ],
        responsible: 'HB'
    },
    {
        typeofwork: 'gyártmányterv',
        workdescription: [
            'Pfosten','Riegel',
            'Klemm, Deck'
            ,'Gyártmány'
        ],
        responsible: 'BK'
    },
    {
        typeofwork: 'gyártmányterv',
        workdescription: 'üvegrendelés',
        responsible: [
            'MZ',
            'SZZ',
            'KA',
            'IL',
            'PSZ'
        ]
    }
];

columns = [
    {
        data: 'id',
        type: 'text'
    },
    {
        data: 'projectnr',
        type: 'text'
    },
    {
        data: 'projectname',
        type: 'text'
    },
    {
        data: 'ordernr',
        type: 'text'
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
        type: 'dropdown',
        source: orders
    },
    {
        data: 'orderdate',
        type: 'text',
        dateFormat: 'YYYY/DD/MM'
    },
    {
        data: 'confirmeddate',
        type: 'text',
        dateFormat: 'YYYY/DD/MM'
    },
    {
        data: 'deliverydate',
        type: 'text',
        dateFormat: 'YYYY/DD/MM'
    },
    {
        data: 'handoverdate',
        type: 'text',
        dateFormat: 'YYYY/DD/MM'
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
