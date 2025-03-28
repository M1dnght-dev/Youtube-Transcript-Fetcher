const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        // Allow the installer to request admin privileges
        requestedExecutionLevel: 'requireAdministrator'
      },
      // Optionally, restrict to Windows only:
      // platforms: ['win32']
    },
    {
      name: '@electron-forge/maker-wix',
      config: {
        // Wix maker configuration for MSI packaging; add options as needed
      },
      platforms: ['win32']
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {},
      platforms: ['darwin']
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
      platforms: ['linux']
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'zyztem',
          name: 'youtube-transcript-fetcher'
        },
        prerelease: true
      }
    }
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
