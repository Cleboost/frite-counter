import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'fr.cleboost.frite',
  appName: 'frite counter',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
