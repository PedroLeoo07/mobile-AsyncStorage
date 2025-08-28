module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo']
    // Nenhum plugin adicional necessário para expo-router a partir do SDK 50+.
  };
};
