import type { THapticFeedback } from 'ui/src/utils/haptics/HapticFeedback'

// Define our own enums to replace expo-haptics
export enum ImpactFeedbackStyle {
  Light = 'light',
  Medium = 'medium',
  Heavy = 'heavy',
}

export enum NotificationFeedbackType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

// Every haptic feedback is a no-op on web.
export const HapticFeedback: THapticFeedback = {
  impact: async (): Promise<void> => Promise.resolve(),
  light: async (): Promise<void> => Promise.resolve(),
  medium: async (): Promise<void> => Promise.resolve(),
  heavy: async (): Promise<void> => Promise.resolve(),
  success: async (): Promise<void> => Promise.resolve(),
  warning: async (): Promise<void> => Promise.resolve(),
  error: async (): Promise<void> => Promise.resolve(),
  selection: async (): Promise<void> => Promise.resolve(),
} as const
