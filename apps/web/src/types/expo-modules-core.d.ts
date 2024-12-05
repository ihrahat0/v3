declare module 'expo-modules-core' {
  export class EventEmitter {
    addListener(): void;
    removeListeners(): void;
  }
  
  export const NativeModulesProxy: Record<string, unknown>;
} 