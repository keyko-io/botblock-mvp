import { MetaData } from "@nevermined-io/sdk";

const metadata: Partial<MetaData> = {
  main: {
    name: "TEST asset",
    type: "other",
    dateCreated: new Date() as unknown as string,
    datePublished: new Date() as unknown as string,
    author: "Met Office",
    license: "CC-BY",
    files: [],
  },
  additionalInformation: {
    description: "Weather information of UK including temperature and humidity",
    copyrightHolder: "Met Office",
    workExample: "423432fsd,51.509865,-0.118092,2011-01-01T10:55:11+00:00,7.2,68",
    links: [
      {
        name: "Sample of Asset Data",
        type: "sample",
        url: "https://foo.com/sample.csv",
      },
      {
        name: "Data Format Definition",
        type: "format",
        url: "https://foo.com/sample.csv",
      },
    ],
    inLanguage: "en",
    categories: ["Economy", "Data Science"],
    tags: ["weather", "uk", "2011", "temperature", "humidity"],
  },
};
const generateMetadata = (name: string, nonce: string | number = Math.random()): Partial<MetaData> => ({
  ...metadata,
  main: {
    ...metadata.main,
    name,
    ...({ nonce } as any),
  },
  additionalInformation: {
    ...metadata.additionalInformation,
  },
});

export const getMetadata = (nonce: string | number = Math.random(), name: string): MetaData =>
  generateMetadata(name, nonce) as MetaData;
