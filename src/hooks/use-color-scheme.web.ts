import { useColorScheme as useRNColorScheme } from 'react-native';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  // Determine hydration status without calling setState inside an effect
  // This avoids triggering an extra render during initial mount on the client.
  const hasHydrated = typeof window !== 'undefined';

  const colorScheme = useRNColorScheme();

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
