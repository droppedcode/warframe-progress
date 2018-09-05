// http://warframe.wikia.com/wiki/Weapon_Comparison

(function () {
  let mainTypes = $('.mw-content-text > .tabbertab-borderless > .tabber > .tabbertab');

  let tables = [];

  mainTypes.each((index, mainType) => {
    console.log(mainType);
    let subTypes = $(mainType).find('table:first');

    let table = [$(mainType).attr('title')];

    subTypes.each((index2, subType) => {
      let last;
      $(subType).find('tbody tr').each((index3, row) => {
        $(row).find('td:first').each((index4, cell) => {
          let text = $(cell).text();
          let index = text.indexOf(' (');

          if (index > -1) {
            text = text.substr(0, index);
          }

          if (last != text) {
            last = text;
            table.push(text);
          }
        });
      });
    });

    tables.push(table);
  });

  let text = '';

  for (let i = 0; i < tables.length; ++i) {
    let table = tables[i];
    let type = 0;
    switch (table[0]) {
      case 'Primary':
        type = 1;
        break;
      case 'Secondary':
        type = 2;
        break;
      case 'Melee':
        type = 3;
        break;
      case 'Warframe':
        type = 4;
        break;
      case 'Archwing':
        type = 5;
        break;
      case 'AW Primary':
        type = 6;
        break;
      case 'AW Melee':
        type = 7;
        break;
      case 'Sentinel':
        type = 8;
        break;
      case 'Companion':
        type = 9;
        break;
      case 'Amp':
        type = 10;
        break;
    }
    for (let j = 1; j < table.length; ++j) {
      text += table[j] + '\t' + type + '\n';
    }
  }

  console.log(text);
})();