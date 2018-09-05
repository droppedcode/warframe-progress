import { ServerContext } from "./server.context";
import { IUserItem } from "../data/userItem";
import * as path from "path";
import fs = require("fs");
import * as Hash from "node-object-hash";
import { cloneDeep } from "lodash";

const util = require("util");
const exec = util.promisify(require("child_process").exec);

export class Collector {
  private items: any[];
  private itemsHash: string;

  public clientItems: any[];
  public clientItemsHash: string;

  constructor(private context: ServerContext) {}

  private async updateWarframeItems() {
    const { stdout, stderr } = await exec("npm update warframe-items");
  }

  async collect() {
    await this.updateWarframeItems();

    this.items = JSON.parse(
      fs
        .readFileSync(
          path.resolve(__dirname, "warframe-items", "data", "json", "All.json")
        )
        .toString()
    );
    this.itemsHash = Hash().hash(this.items);

    this.clientItems = cloneDeep(
      this.items/*.filter(f => {
        switch (f.category) {
          case "Mods":
          case "Primary":
          case "Secondary":
          case "Melee":
          case "Warframes":
          case "Archwing":
          case "Pets":
          case "Sentinels":
          case "Skins":
          case "Resources":
          case "Relics":
            return true;
          case "Fish":
          case "Gear":
          case "Glyphs":
          case "Sigils":
          case "Misc":
          case "Quests":
          default:
            return false;
        }
      })*/
    );

    this.clientItems.forEach(item => this.filterClientItem(item));

    this.clientItemsHash = Hash().hash(this.clientItems);

    console.log("Collector finished.");
  }

  private clientItemKeys: string[] = [
    "uniqueName",
    "name",
    "type",
    "components",
    "imageName",
    "category",
    "wikiaUrl"
  ];

  private filterClientItem(item) {
    for (let key in item) {
      if (this.clientItemKeys.indexOf(key) !== -1) {
        if (key === "components") {
          for (let i = 0; i < item[key].length; i++) {
            this.filterComponent(item[key][i]);
          }
        }
      } else {
        delete item[key];
      }
    }
  }

  private componentItemKeys: string[] = [
    "uniqueName",
    "name",
    "itemCount",
    "imageName",
    "drops"
  ];

  private filterComponent(item) {
    for (let key in item) {
      if (this.componentItemKeys.indexOf(key) === -1) {
        delete item[key];
      }
    }
  }
}
