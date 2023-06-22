import { useLocalStorage, type RemovableRef } from '@vueuse/core';

export class LocalStorageManager {
  readonly PREFIX: string;
  private map: Record<string, RemovableRef<any>>;
  public use: typeof useLocalStorage = (key: string, ...args: any[]): RemovableRef<any> => {
    // @ts-ignore
    const stored = useLocalStorage(key, ...args);
    this.map[key] = stored;
    return stored
  }

  constructor(PREFIX: string) {
    this.PREFIX = PREFIX;
    this.map = {};
  }

  public toJSON(): Record<string, any> {
    const json: Record<string, any> = {};
    for (const entry of Object.entries(this.map)) {
      const [key, value] = entry;
      json[key] = value.value; // dereferenced RemovalRef
    }
    return json;
  }

  public update_from_JSON(raw: Record<string, any>) {
    for (let entry in Object.entries(raw)) {
      const [key, value] = entry;
      this.map[key].value = value;
    }
  }
}
