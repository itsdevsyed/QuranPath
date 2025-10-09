module.exports = function (api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: ['react-native-paper/babel'], // ✅ Move this outside "env" to apply in all environments
    };
  };
