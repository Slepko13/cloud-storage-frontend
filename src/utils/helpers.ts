const extColor = {
  pdf: "purple",
  xls: "green",
  doc: "blue",
  txt: "blue",
  png: "orange",
  jpg: "orange",
  jpeg: "orange",
  zip: "red",
} as const;

export type Extension = keyof typeof extColor;
export type Color = typeof extColor[Extension];

export const getColorByExtension = (ext: Extension): Color => {
  return extColor[ext];
};

export const getExtensionFromFileName = (filename: string) => {
  return filename.split(".").pop() as Extension;
};

export  const isImage = (ext: string) => ['jpg', 'jpeg', 'png', 'gif'].includes(ext);

