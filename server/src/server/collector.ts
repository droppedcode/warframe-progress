import axios from 'axios';
import * as cheerio from 'cheerio';
import { ServerContext } from './server.context';
import { ItemType } from '../data/ItemType';
import { IUserItem } from '../data/userItem';

export class Collector {

  constructor(private context: ServerContext) { }

  private async get(url: string) {
    try {
      let response = await axios.get(url);
      return cheerio.load(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  async collect() {
    await this.weapon();
    await this.zaw();
    await this.warframe();
    await this.archwing();
    await this.sentinel();
    await this.companions();
    await this.relic();
    await this.version();
    console.log('Collector finished.');
  }

  private getType(value: string): ItemType {
    switch (value.trim().toLowerCase()) {
      case 'primary':
        return ItemType.Primary;
      case 'secondary':
        return ItemType.Secondary;
      case 'melee':
        return ItemType.Melee;
      case 'warframe':
        return ItemType.Warframe;
      case 'archwing':
        return ItemType.Archwing;
      case 'aw primary':
        return ItemType.ArchGun;
      case 'aw melee':
        return ItemType.ArchMelee;
      case 'sentinel':
        return ItemType.SentinelWeapon;
      case 'companion':
        return ItemType.Companion;
      case 'amp':
        return ItemType.Amp;
      case 'strike':
        return ItemType.ZawStrike;
      case 'grip':
        return ItemType.ZawGrip;
      case 'link':
        return ItemType.ZawLink;
      default:
        return undefined;
    }
  }

  private async weapon() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Weapon_Comparison');
    let mainTypes = $('.mw-content-text > .tabbertab-borderless > .tabber > .tabbertab');

    mainTypes.each((index, mainType) => {
      let type = this.getType($(mainType).attr('title'));
      let subTypes = $(mainType).find('table');

      subTypes.each((index2, subType) => {
        if (index2 === 0) {
          let last;
          $(subType).find('tbody tr').each((index3, row) => {
            $(row).find('td').each((index4, cell) => {
              if (index4 === 0) {
                let text = $(cell).text();
                let index = text.indexOf(' (');

                if (index > -1) {
                  text = text.substr(0, index);
                }

                text = text.replace(/\//g, ' ').replace(/  /g, ' ').trim();

                if (last != text) {
                  last = text;
                  if (!this.context.getItem(text, type)) {
                    this.context.addItem(text, type, null, null, null, 2, 0);
                  }
                }
              }
            });
          });
        }
      });
    });
  }

  private async zaw() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Zaw');
    let mainTypes = $('table.navbox tr');

    mainTypes.each((index, mainType) => {
      if (index === 0) return;
      if ($(mainType).find('tr').first().text().replace(/\//g, ' ').replace(/  /g, ' ').trim() != 'Zaw Components') return;

      let typeText = $(mainType).find('td').first().text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
      let type = this.getType(typeText);
      $(mainType).find('a').each((index2, a) => {
        let text = $(a).text().trim();
        if (!this.context.getItem(text, type)) {
          this.context.addItem(text, type, null, null, null, 2, 0);
        }
      });

    });
  }

  private async warframe() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Warframes');
    let frames = $('div.tabbertab[title="All"] tbody tr');

    frames.each((index, frame) => {
      if (index === 0) return;

      let text = $(frame).find('td').first().text().replace(/\//g, ' ').replace(/  /g, ' ').trim();

      if (!this.context.getItem(text, ItemType.Warframe)) {
        let id = this.context.addItem(text, ItemType.Warframe, null, null, null, 2, 0);

        if (text.indexOf('Prime') === -1) {
          this.context.addItem(text + ' Blueprint', ItemType.Warframe, id, null, null, 1, 0);
          this.context.addItem(text + ' Chassis Blueprint', ItemType.Warframe, id, null, null, 1, 0);
          this.context.addItem(text + ' Neuroptics Blueprint', ItemType.Warframe, id, null, null, 1, 0);
          this.context.addItem(text + ' Systems Blueprint', ItemType.Warframe, id, null, null, 1, 0);
        } else {
          this.context.addItem(text + ' Blueprint', ItemType.Warframe, id, null, null, 1, 0);
          this.context.addItem(text + ' Chassis Blueprint', ItemType.Warframe, id, null, null, 1, 0);
          this.context.addItem(text + ' Neuroptics Blueprint', ItemType.Warframe, id, null, null, 1, 0);
          this.context.addItem(text + ' Systems Blueprint', ItemType.Warframe, id, null, null, 1, 0);
        }
      }

    });
  }

  private async archwing() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Archwing');
    let items = $('.navbox').first().find('a');

    items.each((index, item) => {
      let text = $(item).attr('title').replace(/\//g, ' ').replace(/  /g, ' ').trim();

      if (!this.context.getItem(text, ItemType.Archwing)) {
        let id = this.context.addItem(text, ItemType.Archwing, null, null, null, 2, 0);

        this.context.addItem(text + ' Blueprint', ItemType.Archwing, id, null, null, 1, 0);
        this.context.addItem(text + ' Harness', ItemType.Archwing, id, null, null, 1, 0);
        this.context.addItem(text + ' Systems', ItemType.Archwing, id, null, null, 1, 0);
        this.context.addItem(text + ' Wings', ItemType.Archwing, id, null, null, 1, 0);
      }

    });
  }

  private async sentinel() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Sentinels');
    let items = $('table.sortable').first().find('tbody tr');

    items.each((index, item) => {
      if (index == 0) return;

      let text = $(item).find('td').first().find('a').attr('title').replace(/\//g, ' ').replace(/  /g, ' ').trim();

      if (!this.context.getItem(text, ItemType.Sentinel)) {
        let id = this.context.addItem(text, ItemType.Sentinel, null, null, null, 2, 0);

        if ((/prime/i).test(text)) {
          this.context.addItem(text + ' Blueprint', ItemType.Sentinel, id, null, null, 1, 0);
          this.context.addItem(text + ' Carapace', ItemType.Sentinel, id, null, null, 1, 0);
          this.context.addItem(text + ' Cerebrum', ItemType.Sentinel, id, null, null, 1, 0);
          this.context.addItem(text + ' Systems', ItemType.Sentinel, id, null, null, 1, 0);
        }
      }

    });
  }

  private async companions() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Companions');
    let items = $('.navbox tr');

    items.each((index, item) => {
      if (index == 4 || index == 6) {
        $(item).find('a').each((index2, item2) => {
          let text = $(item2).attr('title').replace(/\//g, ' ').replace(/  /g, ' ').trim();

          if (!this.context.getItem(text, ItemType.Companion)) {
            this.context.addItem(text, ItemType.Companion, null, null, null, 2, 0);
          }

        });
      }

    });
  }

  private async relic() {
    let $ = await this.get('http://warframe.wikia.com/wiki/Relic');
    let items = $('[title="By rewards (simple table)"] table tbody tr');

    let rows = <{ name: string, owner: string, location: string }[]><any>items.map((index, item) => {
      let values = $(item).find('td').get();

      if (values.length === 0) return;

      let itemName = $(values[0]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
      let itemPart = $(values[1]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
      let relicTier = $(values[2]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
      let relicName = $(values[3]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
      let rarity = $(values[4]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();
      let vaulted = $(values[5]).text().replace(/\//g, ' ').replace(/  /g, ' ').trim();

      let itemFullName = itemName + ' ' + itemPart;
      let location = relicTier + ' ' + relicName + ' ' + rarity;
      if (vaulted.toLowerCase() == 'yes') {
        location += ' (V)';
      }

      return {
        name: itemFullName,
        owner: itemName,
        location: location
      };
    }).get();

    rows = rows.sort((a, b) => a.name.localeCompare(b.name));

    let prevItem = rows[0];

    for (let i = 1; i < rows.length; ++i) {
      let item = rows[i];
      //New item commit the locations
      if (prevItem.name != item.name) {
        this.setLocation(prevItem);
      } else {
        item.location = prevItem.location + '\n' + item.location;
      }

      prevItem = item;
    }

    //Commit the last item
    this.setLocation(prevItem);
  }

  private setLocation(item: { name: string, owner: string, location: string }) {
    let dbItem = this.context.getItemByName(item.name);
    if (dbItem) {
      //We have the item
      this.context.setLocation(dbItem.id, item.location);
    } else {
      //We don't have the item
      let ownerItem = this.context.getItemByName(item.owner);

      if (ownerItem) {
        this.context.addItem(item.name, ownerItem.type, ownerItem.id, null, item.location, 1, 0);
      } else {
        console.warn('Missing item: ' + item.owner);
      }
    }
  }

  private async version() {
    let items = this.context.getItems();
    let currentItems = items.filter(f => f.ownerItemId === null && f.version < 1);
    items = items.filter(f => f.ownerItemId !== null);

    if (items.length > 0) {
      await this.versionUpdate(currentItems, items);
    }
  }

  private async versionUpdate(currentItems: IUserItem[], items: IUserItem[]) {
    for (let item of currentItems) {
      let $ = await this.get('http://warframe.wikia.com/wiki/' + item.name.replace(/ /g, '_'));
      let rows = $('.foundrytable > tbody > tr');

      let research = rows.find('a[title="Research"]');
      if (research.length > 0) {
        this.context.setDescription(item.id, research.first().text());
      } else if ((/prime/i).test(item.name)) {
        let components = rows.last().find('table tr').map((i, m) => {
          return $(m).find('td')[0].childNodes.find(f => f.type === 'text').nodeValue.replace(/  /g, ' ').trim();
        }).get();
        rows.slice(1, 2).find('td').each((i, m) => {
          let component = $(m).find('a').attr('title');
          if (components.indexOf(component) > -1) {
            let count = parseInt(m.childNodes[m.childNodes.length - 1].nodeValue.trim()) || 1;

            let subItem = items.find(f => f.name === item.name + ' ' + component || f.name === item.name + ' ' + component + ' Blueprint' || f.name + ' Blueprint' === item.name + ' ' + component);

            if (subItem) {
              this.context.setMaxProgress(subItem.id, count);
            } else {
              console.log('Missing part: ' + item.name + ' ' + component);
            }
          }
        });
      }

      this.context.setItemVersion(item.id, 1);
    }
  }

}