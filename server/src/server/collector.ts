import { ServerContext } from './server.context';
import { IUserItem } from '../data/userItem';
import * as path from 'path';
import fs = require('fs');
import * as Hash from 'node-object-hash';
import { cloneDeep } from 'lodash';

const util = require('util');
const exec = util.promisify(require('child_process').exec);

export class Collector {
  private items: any[];
  private itemsHash: string;

  public clientItems: any[];
  public clientItemsHash: string;

  public relics: {};

  constructor(private context: ServerContext) {}

  private async updateWarframeItems() {
    let wfpath = path.resolve(__dirname, 'warframe-items');
    if (fs.existsSync(wfpath)) {
      let { stdout, stderr } = await exec(
        'cd "' + wfpath + '" & git pull & cd "' + wfpath + '"\\..'
      );
    } else {
      let { stdout, stderr } = await exec(
        'cd "' +
          wfpath +
          '"\\.. & git clone --single-branch -b development https://github.com/WFCD/warframe-items.git'
      );
    }
  }

  async collect() {
    await this.updateWarframeItems();

    this.items = JSON.parse(
      fs
        .readFileSync(
          path.resolve(__dirname, 'warframe-items', 'data', 'json', 'All.json')
        )
        .toString()
    );
    this.itemsHash = Hash().hash(this.items);

    this.relics = {};
    this.items
      .filter(f => f.category === 'Relics')
      .forEach(r => {
        //Fix source error
        if (r.rarity === 'Uncommon' && r.chance === 0.1) {
          r.rarity = 'Rare';
        }
        this.relics[r.name] = r.drops && r.drops.length > 0;
      });

    this.clientItems = cloneDeep(this.items);
    this.clientItems.forEach(item => this.filterClientItem(item));

    this.clientItemsHash = Hash().hash(this.clientItems);

    console.log('Collector finished.');
  }

  private clientItemKeys: string[] = [
    'uniqueName',
    'name',
    'type',
    'components',
    'imageName',
    'category',
    'wikiaUrl'
  ];

  private filterClientItem(item) {
    for (let key in item) {
      if (this.clientItemKeys.indexOf(key) !== -1) {
        if (key === 'components') {
          let components = item[key];
          let componentIds = {};
          for (let i = components.length - 1; i >= 0; i--) {
            let component = components[i];
            //If there is already the same component in the item increase the itemCount and remove the duplicate
            if (componentIds[component.uniqueName]) {
              componentIds[component.uniqueName].itemCount++;
              components.splice(i, 1);
            } else {
              componentIds[component.uniqueName] = component;
              this.updateComponent(components[i]);
              this.filterComponent(components[i]);
            }
          }
        }
      } else {
        delete item[key];
      }
    }
  }

  updateComponent(component) {
    if (component.drops) {
      let relicDrops = component.drops.filter(f => f.type === 'Relics');
      let relicNames: string[] = [];
      for (let k = 0; k < relicDrops.length; k++) {
        let r = relicDrops[k];

        // The ratity information based on the actual drop chance, not the gameplay rarity
        // We modify the rarity here to show the gameplay rarity
        if (r.rarity === 'Uncommon' && r.chance === 0.1) {
          r.rarity = 'Rare';
        }

        let name = r.location;
        let isVaulted = !this.relics[name];
        name = name.substr(0, name.lastIndexOf(' ')) + ' ' + r.rarity;
        if (isVaulted) {
          name += ' (V)';
        }
        if (relicNames.indexOf(name) === -1) {
          relicNames.push(name);
        }
      }
      if (relicNames.length > 0) {
        component.location = relicNames.join(', ');
      }
    }
  }

  private componentItemKeys: string[] = [
    'uniqueName',
    'name',
    'itemCount',
    'imageName',
    'location'
  ];

  private filterComponent(item) {
    for (let key in item) {
      if (this.componentItemKeys.indexOf(key) === -1) {
        delete item[key];
      }
    }
  }
}
