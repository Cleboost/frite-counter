import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.cleboost.frite',
  appName: 'Friteuse Manager',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
