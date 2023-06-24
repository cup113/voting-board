import { useLocalStorage, type RemovableRef, type UseStorageOptions } from '@vueuse/core';

export type StorageManagerUseOptions<T> = UseStorageOptions<T> & {
  /** @default false */
  managerParseJson?: boolean
};

interface StoredItem<T> {
  ref: RemovableRef<T>,
  managerParseJson: boolean,
}

export class LocalStorageManager {
  readonly PREFIX: string;
  private map: Record<string, StoredItem<any>>;

  constructor(PREFIX: string) {
    this.PREFIX = PREFIX;
    this.map = {};
  }

  public toJSON(): Record<string, any> {
    const json: Record<string, any> = {};
    for (const entry of Object.entries(this.map)) {
      const [key, value] = entry;
      if (this.map[key].managerParseJson) {
        json[key] = JSON.parse(localStorage.getItem(this.PREFIX + key) as string);
      } else {
        json[key] = value.ref.value; // dereference RemovableRef
      }
    }
    return json;
  }

  public update_from_JSON(raw: Record<string, any>) {
    for (let entry in Object.entries(raw)) {
      const [key, value] = entry;
      if (this.map[key].managerParseJson) {
        localStorage.setItem(this.PREFIX + value, value as string);
      }
      else {
        this.map[key].ref.value = value;
      }
    }
  }

  public use<T>(
    key: string, initialValue: T, options?: StorageManagerUseOptions<T>
  ): RemovableRef<T> {
    const ref = useLocalStorage(this.PREFIX + key, initialValue, options);
    this.map[key] = { ref, managerParseJson: options?.managerParseJson ?? false };
    return ref;
  }
}
