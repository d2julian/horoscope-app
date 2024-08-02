module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"], // Ajusta la raíz según la estructura de tu proyecto
          alias: {
            "@": "./src", // El alias '@' mapea a la carpeta 'src'
          },
        },
      ],
    ],
  };
};
